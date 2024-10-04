import React, { useState } from 'react';
import axios from 'axios';
import "./login.css"

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [welcomeMessage, setWelcomeMessage] = useState(''); 

    const handleLogin = async (event) => {
        event.preventDefault();
        setEmailError('');
        setPasswordError('');
        setGeneralError('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/login`,
                { email, password }, 
                { withCredentials: true }
            );
            const { success, message } = response.data;
            
            if (success) {
                setIsLoggedIn(true); 
                setWelcomeMessage('Welcome, Admin!'); 
            } else {
                setGeneralError(message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setGeneralError('Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            {isLoggedIn ? (
                
                <div className="welcome-message">
                    <h2>{welcomeMessage}</h2>
                    <p>You have successfully logged in!</p>
                </div>
            ) : (
               
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="error-message">{emailError}</p>}
                    
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <p className="error-message">{passwordError}</p>}
                    
                    <button type="submit">Login</button>
                </form>
            )}
            
            {generalError && <p className="error-message">{generalError}</p>}
        </div>
    );
};

export default AdminLogin;