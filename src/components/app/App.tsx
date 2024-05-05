import { useState, useEffect } from 'react'
import { UsersList } from '../UsersList/UsersList'
import './App.css'
import { type User } from '../../types.d'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)

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

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
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
        </header>

        <UsersList
          users={sortedUsers}
          showColors={showColors}
        />
      </div>
    </>
  )
}

export default App
