import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import CKEditor from 'react-ckeditor-component'
import { FormSelect } from 'materialize-css'
import Error from '../Error'

import { ADD_RECIPE } from '../../mutations/Recipe'
import { GET_ALL_RECIPES } from '../../queries/Recipe'

import withAuth from '../withAuth'
import { GET_USER_RECIPES } from '../../queries/User'

class AddRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      imageUrl: '',
      category: '',
      description: '',
      instructions: '',
      username: '',
    }
    this.categoryRef = React.createRef()
  }

  componentDidMount() {
    if (this.props.session) {
      this.setState({ username: this.props.session.currentUser.username })
    }
    this.categoryInstance = FormSelect.init(this.categoryRef.current)
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
            <div className="AddRecipe">
              <h2 className="orange-text text-accent-2">Add Recipe</h2>

              <form
                className="form"
                onSubmit={e => this.handleSubmit(e, addRecipe)}
              >
                {/* NAME */}
                <div className="input-field">
                  <input
                    autoFocus
                    value={name}
                    onChange={this.handleChange}
                    type="text"
                    name="name"
                    id="name"
                  />
                  <label htmlFor="name">Title</label>
                </div>

                {/* IMAGE URL */}
                <div className="input-field">
                  <input
                    value={imageUrl}
                    onChange={this.handleChange}
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                  />
                  <label htmlFor="imageUrl">Image Url</label>
                </div>

                {/* CATEGORY */}
                <div className="input-field">
                  <select
                    name="category"
                    id="category"
                    onChange={this.handleChange}
                    value={category}
                    ref={this.categoryRef}
                  >
                    <option value="" disabled selected>
                      Choose a Category
                    </option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                  </select>
                  {/* <label htmlFor="category">Category</label> */}
                </div>

                {/* DESCRIPTION */}
                <div className="input-field">
                  <input
                    value={description}
                    onChange={this.handleChange}
                    type="text"
                    name="description"
                    id="description"
                  />
                  <label htmlFor="description">Description</label>
                </div>

                {/* INSTRUCTIONS */}
                <label htmlFor="instructions">Add Instructions</label>
                <CKEditor
                  id="instructions"
                  name="instructions"
                  content={instructions}
                  events={{ change: this.handleEditorChange }}
                />

                {/* SUBMIT BUTTON */}
                <button
                  disabled={loading || this.validateForm()}
                  type="submit"
                  className="btn waves-effect waves-light green lighten-2 z-depth-0"
                >
                  <i class="material-icons right">cloud_upload</i>
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
