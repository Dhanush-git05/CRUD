import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [filterusers, setFilterusers] = useState([]);
  const [userData, setUserData] = useState({ name: "", age: "", city: "" });

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const res = await axios.get("http://localhost:8000/users");
    setUsers(res.data);
    setFilterusers(res.data);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete pannalama?");
    if (confirm) {
      await axios.delete(`http://localhost:8000/users/${id}`);
      getAllUsers();
    }
  };

  const handleSubmit = async () => {
    if (userData._id) {
      await axios.patch(`http://localhost:8000/users/${userData._id}`, userData);
    } else {
      await axios.post("http://localhost:8000/users", userData);
    }
    getAllUsers();
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h3>Add User</h3>
      <input placeholder="Name" onChange={(e)=>setUserData({...userData,name:e.target.value})}/>
      <input placeholder="Age" onChange={(e)=>setUserData({...userData,age:e.target.value})}/>
      <input placeholder="City" onChange={(e)=>setUserData({...userData,city:e.target.value})}/>
      <button onClick={handleSubmit}>Save</button>

      <h3>User List</h3>
      {filterusers.map((user) => (
        <div key={user._id}>
          {user.name} - {user.age} - {user.city}
          <button onClick={() => handleDelete(user._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;