import React from 'react'

// Controlled input for plant-name filtering.
const Search = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      <label htmlFor="plant-search">Search plants by name: </label>
      <input
        id="plant-search"
        type="text"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Type a name to search..."
      />
    </div>
  )
}

export default Search