import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import logo from './../../assets/ironup.png';

const avatars = [
    "https://i.imgur.com/Mwskb9x.png",
    "https://i.imgur.com/ddSNn8P.png",
    "https://i.imgur.com/EUUUKXJ.png",
    "https://i.imgur.com/As0ujpu.png"
];

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(avatars[0]);
    const [message, setMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        try {
            const response = await fetch("https://iron-back.onrender.com/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, avatar })
            });

            const data = await response.json();
            if (response.ok) {
                setUsername("");
                setEmail("");
                setPassword("");
                navigate("/login");
            } else {
                setMessage(data.message || "Registration failed");
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
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                
                <div className="avatar-selection">
                    <div className="avatars">
                        {avatars.map((img, index) => (
                            <img key={index} src={img} className={avatar === img ? "selected" : ""} onClick={() => setAvatar(img)} alt={`Avatar ${index}`} />
                        ))}
                    </div>
                </div>

                <button type="submit">Sign up</button>
            </form>
            <span>Already have an account? <a onClick={() => navigate("/login")}>Sign in</a></span>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Register;
