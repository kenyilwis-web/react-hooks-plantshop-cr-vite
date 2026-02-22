import React, { useEffect, useMemo, useState } from 'react'
import ProductList from './components/ProductList'
import Search from './components/Search'

// Default API endpoint used in local development.
const API_URL = window.__API_URL__ || 'http://localhost:6001/plants'

const App = () => {
  // Core app state: plant inventory, search query, form values, and request status.
  const [plants, setPlants] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [newPlant, setNewPlant] = useState({ name: '', image: '', price: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  // Load plants once when the app mounts.
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setIsLoading(true)
        setError('')
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Failed to load plants.')
        }

        const data = await response.json()
        setPlants(data)
      } catch (fetchError) {
        setError(fetchError.message || 'Unable to load plants right now.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlants()
  }, [])

  // Keep filtering derived from source state so clearing search restores all plants.
  const filteredPlants = useMemo(() => {
    if (!searchTerm.trim()) {
      return plants
    }

    return plants.filter((plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [plants, searchTerm])

  // Reusable change handler for the add-plant form fields.
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewPlant((prevPlant) => ({ ...prevPlant, [name]: value }))
  }

  // Persist a new plant and append the returned record to local state.
  const handleAddPlant = async (event) => {
    event.preventDefault()

    try {
      setError('')
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newPlant.name,
          image: newPlant.image,
          price: Number(newPlant.price),
          soldOut: false
        })
      })

      if (!response.ok) {
        throw new Error('Failed to add plant.')
      }

      const createdPlant = await response.json()
      setPlants((prevPlants) => [...prevPlants, createdPlant])
      setNewPlant({ name: '', image: '', price: '' })
    } catch (submitError) {
      setError(submitError.message || 'Unable to add plant right now.')
    }
  }

  // Mark a plant as sold out in the backend, then sync local state with the response.
  const handleMarkSoldOut = async (plantId) => {
    try {
      setError('')
      const response = await fetch(`${API_URL}/${plantId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ soldOut: true })
      })

      if (!response.ok) {
        throw new Error('Failed to update plant.')
      }

      const updatedPlant = await response.json()
      setPlants((prevPlants) =>
        prevPlants.map((plant) =>
          plant.id === updatedPlant.id ? updatedPlant : plant
        )
      )
    } catch (updateError) {
      setError(updateError.message || 'Unable to update plant right now.')
    }
  }

  return (
    <div>
      <h1>Plant Shop</h1>

      <form onSubmit={handleAddPlant}>
        <h2>Add a Plant</h2>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={newPlant.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newPlant.image}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newPlant.price}
          onChange={handleInputChange}
          min="0"
          step="0.01"
          required
        />
        <button type="submit">Add Plant</button>
      </form>

      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {error && <p>{error}</p>}
      {isLoading ? (
        <p>Loading plants...</p>
      ) : (
        <ProductList plants={filteredPlants} onMarkSoldOut={handleMarkSoldOut} />
      )}
    </div>
  )
}

export default App
