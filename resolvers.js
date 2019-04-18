const bcrypt = require('bcryptjs')
const { createToken } = require('./utils/createToken')

exports.resolvers = {
  Query: {
    recipes: async (root, args, { Recipe }) => {
      return Recipe.find().sort({ createdAt: 'desc' })
    },

    recipe: async (root, { _id }, { Recipe }) => {
      const recipe = await Recipe.findOne({ _id })
      if (!recipe) throw new Error('Recipe not found')

      return recipe
    },

    searchRecipes: async (root, { searchTerm }, { Recipe }) => {
      if (searchTerm) {
        //
      } else {
        const recipes = await Recipe.find().sort({
          likes: 'desc',
          createdAt: 'desc',
        })
        return recipes
      }
    },

    currentUser: async (root, args, { User, currentUser }) => {
      if (!currentUser) return null

      const user = await User.findOne({
        username: currentUser.username,
      }).populate('favorites')
      if (!user) throw new Error('User not found')

      return user
    },
  },
  Mutation: {
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
