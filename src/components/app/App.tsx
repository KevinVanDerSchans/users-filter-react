import { useState, useEffect } from 'react'
import { UsersList } from '../UsersList/UsersList'
import './App.css'

// import { type User } from '../../types.d'

function App() {
  const [users, setUsers] = useState([])
  const [showColors, setShowColors] = useState(false)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

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
        </header>

        <UsersList
          users={users}
          showColors={showColors}
        />
      </div>
    </>
  )
}

export default App
