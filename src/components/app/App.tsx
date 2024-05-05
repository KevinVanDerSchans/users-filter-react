import { useState, useEffect, useRef } from 'react'
import { UsersList } from '../UsersList/UsersList'
import './App.css'
import { type User } from '../../types.d'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country)
      })
    : users

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter(user => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <div className='app'>
        <h1>Users filter</h1>

        <header>
          <button onClick={toggleColors}>Color rows</button>

          <button onClick={toggleSortByCountry}>
            {sortByCountry ? 'Do not order by country' : 'Order by country'}
          </button>

          <button onClick={handleReset}>Reset state</button>
        </header>

        <UsersList
          users={sortedUsers}
          showColors={showColors}
          deleteUser={handleDelete}
        />
      </div>
    </>
  )
}

export default App
