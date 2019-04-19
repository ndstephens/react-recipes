const bcrypt = require('bcryptjs')
const { createToken } = require('./utils/createToken')

exports.resolvers = {
  Query: {
    //? GET ALL RECIPES
    recipes: async (root, args, { Recipe }) => {
      return Recipe.find().sort({ createdAt: 'desc' })
    },

    //? GET SPECIFIC RECIPE
    recipe: async (root, { _id }, { Recipe }) => {
      const recipe = await Recipe.findOne({ _id })
      if (!recipe) throw new Error('Recipe not found')

      return recipe
    },

    //? SEARCH RECIPES
    searchRecipes: async (root, { searchTerm }, { Recipe }) => {
      if (searchTerm) {
        const searchResults = await Recipe.find(
          {
            $text: { $search: searchTerm },
          },
          {
            score: { $meta: 'textScore' },
          }
        ).sort({
          score: { $meta: 'textScore' },
        })
        return searchResults
      }

      const recipes = await Recipe.find().sort({
        likes: 'desc',
        createdAt: 'desc',
      })
      return recipes
    },

    //? GET CURRENT USER
    currentUser: async (root, args, { User, currentUser }) => {
      if (!currentUser) return null

      const user = await User.findOne({
        username: currentUser.username,
      }).populate({
        path: 'favorites',
        model: 'Recipe',
      })
      if (!user) throw new Error('User not found')

      return user
    },

    //? GET CURRENT USER'S RECIPES
    getUserRecipes: async (root, { username }, { Recipe }) => {
      const userRecipes = await Recipe.find({ username }).sort({
        createdAt: 'desc',
      })

      return userRecipes
    },
  },

  Mutation: {
    //? CREATE NEW RECIPE
    addRecipe: async (
      root,
      { data: { name, description, category, instructions, username } },
      { Recipe }
    ) => {
      const newRecipe = await new Recipe({
        name,
        description,
        category,
        instructions,
        username,
      }).save()

      return newRecipe
    },

    //? DELETE RECIPE
    deleteUserRecipe: async (root, { _id }, { Recipe }) => {
      const recipe = await Recipe.findOneAndDelete({ _id })
      if (!recipe) throw new Error('Recipe not found')

      return recipe
    },

    //? LIKE A RECIPE
    likeRecipe: async (root, { _id, username, liked }, { Recipe, User }) => {
      const recipe = await Recipe.findOneAndUpdate(
        { _id },
        { $inc: { likes: liked ? 1 : -1 } },
        { new: true }
      )
      await User.findOneAndUpdate(
        { username },
        { [liked ? '$addToSet' : '$pull']: { favorites: _id } }
      )

      return recipe
    },

    //? SIGN UP NEW USER
    signUpUser: async (root, { username, email, password }, { User }) => {
      // Query for user based on username OR email
      const user = await User.findOne().or([{ username }, { email }])
      if (user) throw new Error('User already exists')

      const newUser = await new User({
        username,
        email,
        password,
      }).save()
      //* password is auto-hashed using a pre-save hook setup in the Mongoose User model

      return { token: createToken(newUser, process.env.JWT_SECRET, '1hr') }
    },

    //? SIGN IN USER
    signInUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username })
      if (!user) throw new Error('User not found')

      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) throw new Error('Invalid password')

      return {
        token: createToken(user, process.env.JWT_SECRET, '1hr'),
      }
    },
  },
}
