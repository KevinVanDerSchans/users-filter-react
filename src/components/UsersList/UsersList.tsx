import { type User } from '../../types.d'

interface Props {
  users: User[]
  showColors: boolean
}

export function UsersList({ users, showColors }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555'
          const color = showColors ? backgroundColor : 'transparent'

          return (
            <tr
              key={index}
              style={{ backgroundColor: color }}
            >
              <td>
                <img src={user.picture.thumbnail} />
              </td>

              <td>{user.name.first}</td>

              <td>{user.name.last}</td>

              <td>{user.location.country}</td>

              <td>Delete</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
