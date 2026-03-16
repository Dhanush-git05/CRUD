export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>S.no</th>
          <th>Name</th>
          <th>Age</th>
          <th>City</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => (
          <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.city}</td>

            <td>
              <button className="btn green" onClick={() => onEdit(user)}>
                Edit
              </button>
            </td>

            <td>
              <button className="btn red" onClick={() => onDelete(user._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}