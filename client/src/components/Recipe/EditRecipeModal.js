import React, { useRef, useEffect } from 'react'
import { Mutation } from 'react-apollo'
// import { Link } from 'react-router-dom'
import { FormSelect } from 'materialize-css'

// import { GET_USER_RECIPES, CURRENT_USER } from '../../queries/User'
import { UPDATE_USER_RECIPE } from '../../mutations/Recipe'
// import { GET_ALL_RECIPES } from '../../queries/Recipe'

// import Spinner from '../Spinner'
// import Error from '../Error'

const EditRecipeModal = ({
  handleSubmit,
  recipe,
  handleChange,
  closeModal,
}) => {
  const categoryRef = useRef(null)

  useEffect(() => {
    FormSelect.init(categoryRef.current)
  }, [])

  return (
    <Mutation mutation={UPDATE_USER_RECIPE} variables={{ ...recipe }}>
      {updateUserRecipe => (
        <div className="my-modal modal-open">
          <div className="modal-inner">
            <div className="modal-content">
              <form
                onSubmit={e => handleSubmit(e, updateUserRecipe)}
                className="modal-content-inner"
              >
                <h4 className="orange-text text-accent-2">Edit Recipe</h4>

                {/* NAME */}
                <div className="input-field">
                  <input
                    autoFocus
                    value={recipe.name}
                    onChange={handleChange}
                    type="text"
                    id="name"
                    name="name"
                  />
                  <label className="active" htmlFor="name">
                    Name
                  </label>
                </div>

                {/* IMAGE URL */}
                <div className="input-field">
                  <input
                    value={recipe.imageUrl}
                    onChange={handleChange}
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                  />
                  <label className="active" htmlFor="imageUrl">
                    Image Url
                  </label>
                </div>

                {/* CATEGORY */}
                <div className="input-field">
                  <select
                    id="category"
                    name="category"
                    value={recipe.category}
                    onChange={handleChange}
                    ref={categoryRef}
                  >
                    <option value="" disabled selected>
                      Choose a Category
                    </option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                  </select>
                  <label htmlFor="category">Category</label>
                </div>

                {/* DESCRIPTION */}
                <div className="input-field">
                  <input
                    value={recipe.description}
                    onChange={handleChange}
                    type="text"
                    id="description"
                    name="description"
                  />
                  <label className="active" htmlFor="description">
                    Description
                  </label>
                </div>

                {/* BUTTONS */}
                <div className="modal-buttons">
                  <button
                    type="submit"
                    className="btn waves-effect waves-light white-text light-green"
                  >
                    Update
                  </button>
                  <button
                    onClick={closeModal}
                    className="btn waves-effect waves-light white-text grey"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Mutation>
  )
}

export default EditRecipeModal
