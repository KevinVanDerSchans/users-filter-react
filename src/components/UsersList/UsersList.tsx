import { type User } from '../../types.d'

interface Props {
  users: User[]
}

export function UsersList({ users }: Props) {
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
        {users.map(user => {
          return (
            <tr key={user.id.value}>
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
