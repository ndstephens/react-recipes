import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import CKEditor from 'react-ckeditor-component'
import Error from '../Error'

import { ADD_RECIPE } from '../../mutations/Recipe'
import { GET_ALL_RECIPES } from '../../queries/Recipe'

import withAuth from '../withAuth'
import { GET_USER_RECIPES } from '../../queries/User'

class AddRecipe extends Component {
  state = {
    name: '',
    imageUrl: '',
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

  handleEditorChange = e => {
    const newContent = e.editor.getData()
    this.setState({ instructions: newContent })
  }

  handleSubmit = (e, addRecipe) => {
    e.preventDefault()
    addRecipe().then(({ data }) => {
      this.props.history.push('/')
    })
  }

  validateForm = () => {
    const {
      name,
      imageUrl,
      category,
      description,
      instructions,
      username,
    } = this.state

    const isInvalid =
      !name.trim() ||
      !imageUrl.trim() ||
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
    const {
      name,
      imageUrl,
      category,
      description,
      instructions,
      username,
    } = this.state

    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{ ...this.state }}
        refetchQueries={() => [
          {
            query: GET_USER_RECIPES,
            variables: { username },
          },
        ]}
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
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Recipe Image URL"
                  onChange={this.handleChange}
                  value={imageUrl}
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
                <label htmlFor="instructions">Add Instructions</label>
                <CKEditor
                  id="instructions"
                  name="instructions"
                  content={instructions}
                  events={{ change: this.handleEditorChange }}
                />
                {/* <textarea
                  name="instructions"
                  cols="30"
                  rows="10"
                  placeholder="Add instructions"
                  onChange={this.handleChange}
                  value={instructions}
                /> */}
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
