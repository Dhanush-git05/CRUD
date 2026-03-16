import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [role,setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {

    if(role === "admin"){
      navigate("/admin");
    }
    else{
      navigate("/user");
    }

  };

  return (
    <div>

      <h2>Login</h2>

      <select onChange={(e)=>setRole(e.target.value)}>
        <option>Select Role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      <button onClick={handleLogin}>Login</button>

    </div>
  );
}

export default Login;