import { useEffect, useState } from "react";
import axios from "axios";
import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";



function UserDashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [filterusers, setFilterusers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

    const handleLogout = () => {
  navigate("/"); // go to login page
};


  const getAllUsers = async () => {
    const res = await axios.get("http://localhost:8000/users");
    setUsers(res.data);
    setFilterusers(res.data);
  };

    // 🔥 SEARCH FUNCTION
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value) ||
      user.city.toLowerCase().includes(value) ||
      user.age.toString().includes(value)
    );

    setFilterusers(filtered);
  };

  /*const handleDelete = async (id) => {
    const confirm = window.confirm("Delete pannalama?");
    if (confirm) {
      await axios.delete(`http://localhost:8000/users/${id}`);
      getAllUsers();
    }
  }; */

  /*const handleSubmit = async () => {
    if (userData._id) {
      await axios.patch(`http://localhost:8000/users/${userData._id}`, userData);
    } else {
      await axios.post("http://localhost:8000/users", userData);
    }
    getAllUsers();
  }; */

return (
  <div className="container">
    <h1>User Details</h1>

       {/* TOP BAR */}
  <div className="top-bar">
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  </div>

  <input  className="search-input" type="text" placeholder="Search Here..."
        value={search}
        onChange={handleSearch} />

    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>City</th>
        </tr>
      </thead>

      <tbody>
        {filterusers.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}
export default UserDashboard;