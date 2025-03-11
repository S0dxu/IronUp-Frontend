import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './../../assets/ironup.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setMessage(null);

      try {
          const response = await fetch("https://iron-back.onrender.com/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password })
          });

          const data = await response.json();
          if (response.ok) {
              localStorage.setItem("token", data.token);
              localStorage.setItem("username", data.username);
              navigate("/");
          } else {
              setMessage(data.message || "Login failed");
          }
      } catch (error) {
          setMessage("Server error. Try again later.");
          console.error("Error:", error);
      }
  };

  return (
      <div className="register">
          <img src={logo} />
          <form onSubmit={handleSubmit}>
              <div className="form-group">
                  <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  />
              </div>
              <div className="form-group">
                  <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  />
              </div>
              <button type="submit">Sign in</button>
          </form>
          <span>Don't have an account yet? <a onClick={() => navigate("/register")}>Sign up</a></span>
          {message && <p className="message">{message}</p>}
      </div>
    );
};

export default Login;