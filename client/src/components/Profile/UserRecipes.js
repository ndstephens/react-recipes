import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'

import { GET_USER_RECIPES, CURRENT_USER } from '../../queries/User'
import { DELETE_USER_RECIPE, UPDATE_USER_RECIPE } from '../../mutations/Recipe'
import { GET_ALL_RECIPES } from '../../queries/Recipe'

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
            <ul>
              {modal && (
                <EditRecipeModal
                  recipe={this.state}
                  closeModal={this.closeModal}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                />
              )}
              <h3>Your Recipes</h3>
              {!data.getUserRecipes.length && (
                <p>
                  <strong>You have no recipes</strong>
                </p>
              )}
              {data.getUserRecipes.map(recipe => (
                <li
                  key={recipe._id}
                  style={{
                    border: '1px solid black',
                    width: '60%',
                    borderRadius: '10px',
                    margin: '0 auto',
                    marginBottom: '1rem',
                  }}
                >
                  <Link to={`/recipe/${recipe._id}`}>
                    <p style={{ fontSize: '3rem' }}>{recipe.name}</p>
                  </Link>
                  <p>Likes: {recipe.likes}</p>

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
                      <>
                        <button
                          className="button-primary"
                          style={{ marginRight: '1rem' }}
                          onClick={() => this.loadRecipe(recipe)}
                        >
                          Update
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => this.handleDelete(deleteUserRecipe)}
                        >
                          {attrs.loading ? 'deleting...' : 'Delete'}
                        </button>
                      </>
                    )}
                  </Mutation>
                </li>
              ))}
            </ul>
          )
        }}
      </Query>
    )
  }
}

const EditRecipeModal = ({
  handleSubmit,
  recipe,
  handleChange,
  closeModal,
}) => (
  <Mutation mutation={UPDATE_USER_RECIPE} variables={{ ...recipe }}>
    {updateUserRecipe => (
      <div className="modal modal-open">
        <div className="modal-inner">
          <div className="modal-content">
            <form
              onSubmit={e => handleSubmit(e, updateUserRecipe)}
              className="modal-content-inner"
            >
              <h4>Edit Recipe</h4>

              <label htmlFor="name">Recipe Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={recipe.name}
                onChange={handleChange}
              />

              <label htmlFor="imageUrl">Recipe Image Url</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={recipe.imageUrl}
                onChange={handleChange}
              />

              <label htmlFor="category">Recipe Category</label>
              <select
                id="category"
                name="category"
                value={recipe.category}
                onChange={handleChange}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </select>

              <label htmlFor="description">Recipe Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={recipe.description}
                onChange={handleChange}
              />

              <hr />
              <div className="modal-buttons">
                <button type="submit" className="button-primary">
                  Update
                </button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
  </Mutation>
)

export default UserRecipes
