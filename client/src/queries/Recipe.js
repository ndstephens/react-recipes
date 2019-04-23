import { gql } from 'apollo-boost'

import { recipeFragments } from '../fragments/fragments'

export const GET_ALL_RECIPES = gql`
  query GET_ALL_RECIPES {
    recipes {
      _id
      name
      imageUrl
      category
    }
  }
`

export const GET_RECIPE = gql`
  query GET_RECIPE($_id: ID!) {
    recipe(_id: $_id) {
      ...CompleteRecipe
    }
  }
  ${recipeFragments.recipe}
`

export const SEARCH_RECIPES = gql`
  query SEARCH_RECIPES($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      _id
      name
      likes
    }
  }
`
