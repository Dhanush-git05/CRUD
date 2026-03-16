export default function UserModal({ userData, setUserData, onSubmit, onClose }) {
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal">
      <div className="modal-content">

        <span className="close" onClick={onClose}>&times;</span>

        <h2>{userData._id ? "Update Record" : "Add Record"}</h2>

        <div className="input-group">
          <label>Name</label>
          <input name="name" value={userData.name} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Age</label>
          <input name="age" value={userData.age} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>City</label>
          <input name="city" value={userData.city} onChange={handleChange} />
        </div>

        <button className="btn-green" onClick={onSubmit}>
          {userData._id ? "Update User" : "Add User"}
        </button>

      </div>
    </div>
  );
}