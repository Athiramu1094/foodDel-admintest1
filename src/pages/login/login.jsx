import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserLoggedIn } from '../features/login/loginSlice';
import "./login.css"

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [welcomeMessage, setWelcomeMessage] = useState(''); 

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault();
        setEmailError('');
        setPasswordError('');
        setGeneralError('');

        console.log("Data being sent to API:", { email, password });
    
        try {
            const data = { email, password };
    
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/login`, data, { withCredentials: true });
            const { success, user } = response.data;
    
            console.log("Login response:", response.data);
    
            if (success && user) {
                console.log("login.jsx", user);
                console.log("User successfully logged in:", user);
                dispatch(setUserLoggedIn({ userLoggedIn: success, user_id: user._id }));
                console.log("login.jsx", user._id);
                console.log("Dispatched login state update:", { userLoggedIn: success, user_id: user._id });
                setIsLoggedIn(true);
                setWelcomeMessage('Welcome, Admin!');
            } else {
                console.log("Login failed, no user data or success flag is false.");
                setGeneralError('Login failed. Please try again.'); // Handling login failure
            }
        } catch (error) {
            console.error("Error during login request:", error.response?.data || error.message);
            setGeneralError('Login failed. Please try again.'); // General error handling
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