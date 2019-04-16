const { createToken } = require('./utils/createToken')

exports.resolvers = {
  Query: {
    recipes: async (root, args, { Recipe }) => {
      return Recipe.find()
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

      return { token: createToken(newUser, process.env.JWT_SECRET, '1hr') }
    },
  },
}
