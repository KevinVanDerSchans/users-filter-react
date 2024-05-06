import { SortBy, type User } from '../../types.d'
import './UsersList.css'

interface Props {
  users: User[]
  showColors: boolean
  deleteUser: (email: string) => void
  changeSorting: (sort: SortBy) => void
}

export function UsersList({ users, showColors, deleteUser, changeSorting }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Photo</th>
          <th
            className='pointer'
            onClick={() => changeSorting(SortBy.NAME)}
          >
            Name
          </th>
          <th
            className='pointer'
            onClick={() => changeSorting(SortBy.LAST)}
          >
            Surname
          </th>
          <th
            className='pointer'
            onClick={() => changeSorting(SortBy.COUNTRY)}
          >
            Country
          </th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555'
          const color = showColors ? backgroundColor : 'transparent'

          return (
            <tr
              key={user.email}
              style={{ backgroundColor: color }}
            >
              <td className='photo-container'>
                <img
                  className='photo'
                  src={user.picture.thumbnail}
                />
              </td>

              <td>{user.name.first}</td>

              <td>{user.name.last}</td>

              <td>{user.location.country}</td>

              <td>
                <button
                  onClick={() => {
                    deleteUser(user.email)
                  }}
                  className='delete-button'
                >
                  <img
                    src='/assets/delete.svg'
                    alt='Delete row'
                    style={{
                      height: 24,
                      width: 24,
                    }}
                  />
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
