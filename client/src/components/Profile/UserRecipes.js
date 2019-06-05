import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'

import { GET_USER_RECIPES, CURRENT_USER } from '../../queries/User'
import { DELETE_USER_RECIPE, UPDATE_USER_RECIPE } from '../../mutations/Recipe'
import { GET_ALL_RECIPES } from '../../queries/Recipe'

import EditRecipeModal from '../Recipe/EditRecipeModal'
import Spinner from '../Spinner'
import Error from '../Error'

class UserRecipes extends Component {
  state = {
    _id: '',
    name: '',
    imageUrl: '',
    category: '',
    description: '',
    modal: false,
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleDelete = deleteUserRecipe => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this recipe?'
    )
    if (confirmDelete) {
      deleteUserRecipe()
    }
  }

  handleSubmit = (e, updateUserRecipe) => {
    e.preventDefault()
    updateUserRecipe().then(({ data }) => {
      console.log(data)
      this.closeModal()
    })
  }

  loadRecipe = recipe => {
    this.setState({ ...recipe, modal: true })
  }

  closeModal = () => {
    this.setState({ modal: false })
  }

  render() {
    const { username } = this.props
    const { modal } = this.state

    return (
      <Query query={GET_USER_RECIPES} variables={{ username }}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />
          if (error) return <Error error={error} />

          return (
            <div className="user-recipes">
              <h3>Your Recipes</h3>
              <ul className="recipe-container">
                {modal && (
                  <EditRecipeModal
                    recipe={this.state}
                    closeModal={this.closeModal}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                  />
                )}
                {!data.getUserRecipes.length && (
                  <p>
                    <strong>You have no recipes</strong>
                  </p>
                )}
                {data.getUserRecipes.map(recipe => (
                  <li
                    className="recipe-card"
                    key={recipe._id}
                    style={{
                      backgroundImage: `
                      linear-gradient(
                        to bottom,
                        rgba(0,0,0,0.7),
                        rgba(0,0,0,0.0) 80%),
                        url(${recipe.imageUrl})`,
                    }}
                  >
                    <Link to={`/recipe/${recipe._id}`}>
                      <p className="white-text">{recipe.name}</p>
                    </Link>

                    <Mutation
                      mutation={DELETE_USER_RECIPE}
                      variables={{ _id: recipe._id }}
                      refetchQueries={() => [
                        {
                          query: GET_ALL_RECIPES,
                        },
                        {
                          query: CURRENT_USER,
                        },
                      ]}
                      update={(cache, { data: { deleteUserRecipe } }) => {
                        const { getUserRecipes } = cache.readQuery({
                          query: GET_USER_RECIPES,
                          variables: { username },
                        })

                        cache.writeQuery({
                          query: GET_USER_RECIPES,
                          variables: { username },
                          data: {
                            getUserRecipes: getUserRecipes.filter(
                              recipe => recipe._id !== deleteUserRecipe._id
                            ),
                          },
                        })
                      }}
                    >
                      {(deleteUserRecipe, attrs = {}) => (
                        <div className="recipe-buttons">
                          <button
                            className="btn waves-effect waves-light light-green"
                            onClick={() => this.loadRecipe(recipe)}
                          >
                            Update
                          </button>
                          <button
                            className="btn waves-effect waves-light pink"
                            style={{ marginLeft: '0.5rem' }}
                            onClick={() => this.handleDelete(deleteUserRecipe)}
                          >
                            {attrs.loading ? 'deleting...' : 'Delete'}
                          </button>
                          <button
                            className="btn white black-text"
                            style={{ marginLeft: '0.5rem' }}
                          >
                            {recipe.likes} ❤️
                          </button>
                        </div>
                      )}
                    </Mutation>
                  </li>
                ))}
              </ul>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default UserRecipes
