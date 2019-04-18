import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import { ADD_RECIPE } from '../../mutations/Recipe'
import { GET_ALL_RECIPES } from '../../queries/Recipe'

import Error from '../Error'
import withAuth from '../withAuth'

class AddRecipe extends Component {
  state = {
    name: '',
    category: 'Breakfast',
    description: '',
    instructions: '',
    username: '',
  }

  componentDidMount() {
    if (this.props.session) {
      this.setState({ username: this.props.session.currentUser.username })
    }
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e, addRecipe) => {
    e.preventDefault()
    addRecipe().then(({ data }) => {
      // console.log(data)
      this.props.history.push('/')
    })
  }

  validateForm = () => {
    const { name, category, description, instructions, username } = this.state
    const isInvalid =
      !name.trim() ||
      !category.trim() ||
      !description.trim() ||
      !instructions.trim() ||
      !username.trim()

    return isInvalid
  }

  updateCache = (cache, { data: { addRecipe } }) => {
    const { recipes } = cache.readQuery({ query: GET_ALL_RECIPES })

    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        recipes: [addRecipe, ...recipes],
      },
    })
  }

  render() {
    const { name, category, description, instructions } = this.state

    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{ ...this.state }}
        update={this.updateCache}
      >
        {(addRecipe, { loading, error, data }) => {
          return (
            <div className="App">
              <h2 className="App">Add Recipe</h2>
              <form
                className="form"
                onSubmit={e => this.handleSubmit(e, addRecipe)}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Recipe Name"
                  onChange={this.handleChange}
                  value={name}
                />
                <select
                  name="category"
                  onChange={this.handleChange}
                  value={category}
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
                <input
                  type="text"
                  name="description"
                  placeholder="Add description"
                  onChange={this.handleChange}
                  value={description}
                />
                <textarea
                  name="instructions"
                  cols="30"
                  rows="10"
                  placeholder="Add instructions"
                  onChange={this.handleChange}
                  value={instructions}
                />
                <button
                  disabled={loading || this.validateForm()}
                  type="submit"
                  className="button-primary"
                >
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
            </div>
          )
        }}
      </Mutation>
    )
  }
}

export default withAuth(data => data && data.currentUser)(AddRecipe)
