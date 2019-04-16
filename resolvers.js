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
  },
}
