import { useState, useEffect } from 'react'
import { UsersList } from '../UsersList/UsersList'
import './App.css'

// import { type User } from '../../types.d'

function App() {
  const [users, setUsers] = useState([])

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

        <UsersList users={users} />
      </div>
    </>
  )
}

export default App
