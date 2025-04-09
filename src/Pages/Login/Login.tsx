import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './../../assets/ironup.png';

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const isEmail = (input: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch("https://ironup-backend.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
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
      <img src={logo} alt="IronUp Logo" />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="identifier"
            placeholder="Email or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
