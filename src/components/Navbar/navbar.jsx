import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { setUserLoggedIn } from '../features/login/loginSlice';
import axios from 'axios';
import "./navbar.css";

const Navbar = () => {
    console.log("Navbar component rendered");

    const dispatch = useDispatch();
    const userLoggedIn = useSelector((state) => state.login.userLoggedIn);
    const userId = useSelector((state) => state.login.user_id);

    useEffect(() => {
        console.log("Checking user status...");
        // Fetch user data to check login status
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/check`, {
                withCredentials: true,
            })
            .then((response) => {
                console.log('User Status:', response.data);
                const { success, user } = response.data;
                dispatch(
                    setUserLoggedIn({
                        userLoggedIn: success,
                        user_id: user ? user._id : null,
                    })
                );
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                dispatch(setUserLoggedIn({ userLoggedIn: false, user_id: null }));
            });
    }, [dispatch]);

    const handleLoginLogout = () => {
        if (userLoggedIn) {
            // Perform logout action (e.g., clear session or call logout API)
            axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, {}, { withCredentials: true })
                .then(() => {
                    dispatch(setUserLoggedIn({ userLoggedIn: false, user_id: null }));
                })
                .catch((error) => {
                    console.error("Logout failed", error);
                });
        } else {
            // Redirect to login page
            // No action needed for login as handled by route change
        }
    };

    return (
        <div className='navbar'>
            <img className='logo' src="/Logo.png" alt="Logo" />
            <div>
                <img className='profile' src="/Profile.png" alt="Profile" />
                <Link 
                    to={userLoggedIn ? "/" : "/login"} 
                    className='login-link' 
                    onClick={handleLoginLogout}
                >
                    {userLoggedIn ? "Logout" : "Login"}
                </Link> 
            </div>
        </div>
    );
};

export default Navbar;
