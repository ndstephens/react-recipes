import React from 'react'
import { Link } from 'react-router-dom'

const SearchItem = ({ _id, name, imageUrl, likes }) => (
  <li className="search-item">
    <img src={imageUrl} alt="" />

    <div className="search-item__title">
      <Link
        to={`/recipe/${_id}`}
        className="orange-text text-accent-2 truncate"
      >
        {name}
      </Link>
    </div>

    <div className="search-item__likes">Likes: {likes} ❤️</div>
  </li>
)

export default SearchItem
