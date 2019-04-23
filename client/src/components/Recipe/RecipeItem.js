import React from 'react'
import { Link } from 'react-router-dom'

const RecipeItem = ({ _id, name, imageUrl, category }) => (
  <li
    style={{ background: `url(${imageUrl}) center center / cover no-repeat` }}
    className="card"
  >
    <span className={category}>{category}</span>
    <div className="card-text">
      <Link to={`/recipe/${_id}`}>
        <h4>{name}</h4>
      </Link>
    </div>
  </li>
)

export default RecipeItem
