import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import "./navbar.css";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check local storage for login status
        const loginStatus = localStorage.getItem('isLoggedIn');
        console.log("Initial login status from localStorage:", loginStatus); // Debugging log
        setIsLoggedIn(loginStatus === 'true');
    }, []);

    const handleLoginLogout = () => {
        // Toggle login/logout
        if (isLoggedIn) {
            localStorage.removeItem('isLoggedIn'); // Clear login state
            console.log("Logging out..."); // Debugging log
            setIsLoggedIn(false);
        } else {
            localStorage.setItem('isLoggedIn', 'true'); // Set login state
            console.log("Logging in..."); // Debugging log
            setIsLoggedIn(true);
        }
        // Log the current state after toggling
        console.log("Current login state:", !isLoggedIn); // Show the new state after toggling
    };

    return (
        <div className='navbar'>
            <img className='logo' src="/Logo.png" alt="Logo" />
            <div>
                <img className='profile' src="/Profile.png" alt="Profile" />
                <Link 
                    to={isLoggedIn ? "/" : "/login"} 
                    className='login-link' 
                    onClick={handleLoginLogout}
                >
                    {isLoggedIn ? "Logout" : "Login"}
                </Link> 
            </div>
        </div>
    );
};

export default Navbar;
