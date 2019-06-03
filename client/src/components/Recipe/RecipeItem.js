import React from 'react'
import { Link } from 'react-router-dom'
import posed from 'react-pose'

const RecipeItem = posed.li({
  shown: { opacity: 1 },
  hidden: { opacity: 0 },
})

export default ({ _id, name, imageUrl, category }) => (
  <RecipeItem className="card z-depth-0">
    <div className="card-image">
      <img src={imageUrl} alt="recipe item" />
      <span className="card-title">{category}</span>
    </div>

    <div className="card-text ">
      <Link to={`/recipe/${_id}`} className="orange-text text-accent-2">
        {name}
      </Link>
    </div>
  </RecipeItem>
)
