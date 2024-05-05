import { useState, useEffect, useRef, useMemo } from 'react'
import { UsersList } from '../UsersList/UsersList'
import './App.css'
import { SortBy, type User } from '../../types.d'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(true)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const originalUsers = useRef<User[]>([])
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter(user => {
          return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
        })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last,
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter(user => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
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
            {sorting === SortBy.COUNTRY ? 'Do not order by country' : 'Order by country'}
          </button>

          <button onClick={handleReset}>Reset state</button>

          <input
            placeholder='Search by country'
            onChange={e => {
              setFilterCountry(e.target.value)
            }}
          />
        </header>

        <UsersList
          users={sortedUsers}
          showColors={showColors}
          deleteUser={handleDelete}
          changeSorting={handleChangeSort}
        />
      </div>
    </>
  )
}

export default App
