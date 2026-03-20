import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const res = await axios.get("http://localhost:8000/users");

        // ✅ SAFE MATCH
        const user = res.data.find((u) => {
          if (!u.email || !u.password) return false;

          return (
            u.email.trim().toLowerCase() === formData.email.trim().toLowerCase() &&
            u.password.trim() === formData.password.trim()
          );
        });

        // ✅ DEBUG (inside correct place)
        console.log("Entered:", formData);
        console.log("Users:", res.data);
        console.log("Matched:", user);

        if (user) {
          alert("Login Successful");

          if (user.role && user.role.toLowerCase() === "admin") {
            navigate("/admin");
          } else {
            navigate("/user");
          }
        } else {
          alert("Invalid email or password");
        }
      } catch (error) {
        console.error(error);
        alert("Server error");
      }
    } else {
      try {
        await axios.post("http://localhost:8000/users", {
          ...formData,
          role: "user",
        });

        alert("Signup successful");
        setIsLogin(true);
      } catch (error) {
        console.error(error);
        alert("Signup error");
      }
    }
  };

return (
  <div className="login-page">   {/* ✅ ADD HERE */}
    <div className="container">

      <h1>{isLogin ? "Login Page" : "Sign Up Page"}</h1>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={handleChange}
              required
            />
            <br /><br />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <br />

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Don't have an account? Sign Up"
          : "Already have an account? Login"}
      </button>

    </div>
  </div>
);
}
export default Login;