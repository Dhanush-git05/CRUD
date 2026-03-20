import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    city: "",
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const res = await axios.get("http://localhost:8000/users");
    setUsers(res.data);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
  navigate("/"); // go to login page
};

  const handleDelete = async (id) => {
    if (window.confirm("Delete pannalama?")) {
      await axios.delete(`http://localhost:8000/users/${id}`);
      getAllUsers();
    }
  };

  const openAddModal = () => {
    setUserData({ name: "", age: "", city: "" });
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setUserData(user);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (userData._id) {
      await axios.patch(
        `http://localhost:8000/users/${userData._id}`,
        userData
      );
    } else {
      await axios.post("http://localhost:8000/users", userData);
    }

    setShowModal(false);
    getAllUsers();
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <button className="save-btn" onClick={openAddModal}>
        Add User
      </button>
      {/* TOP BAR */}
  <div className="top-bar">
    {/* <h1>Admin Dashboard</h1> */}
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  </div>

      {/* TABLE */}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.city}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>

      <div className="container">

  

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{userData._id ? "Update User" : "Add User"}</h2>

            <input
              placeholder="Name"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
            <input
              placeholder="Age"
              value={userData.age}
              onChange={(e) =>
                setUserData({ ...userData, age: e.target.value })
              }
            />
            <input
              placeholder="City"
              value={userData.city}
              onChange={(e) =>
                setUserData({ ...userData, city: e.target.value })
              }
            />

            <button className="save-btn" onClick={handleSubmit}>
              {userData._id ? "Update" : "Add"}
            </button>

            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
  }
export default AdminDashboard;