import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => navigate("/admin")}>Admin</button>
      <button onClick={() => navigate("/user")}>User</button>
    </div>
  );
}

export default Login;