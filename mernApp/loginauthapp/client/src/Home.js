import React, { useEffect, useState, useCallback } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Memoize getUser to avoid redefinition on each render
    const getUser = useCallback(async () => {
        try {
            const res = await axios.get("/auth", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setUser(res.data);
            setIsLoggedIn(true);
        } catch (err) {
            console.error(err);
            setIsLoggedIn(false);
            localStorage.removeItem("token");
            navigate("/login");
        }
    }, [navigate]);

    // Use useEffect to trigger getUser based on token presence
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/login");
        } else {
            getUser(); // Call the memoized getUser function
        }
    }, [getUser, navigate]); // Dependency array includes memoized getUser and navigate

    const logout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }

    if (!isLoggedIn) {
        return <p>Loading...</p>; // Show a loading state until user data is fetched
    }
 
    return (
        <div className='homePage'>
            <div className='jumbotron'>
                <p className='lead'>Welcome {user && user.name}</p>
                <button className='btn btn-danger' onClick={logout}>Logout</button>
            </div>
        </div>
    );
};

export default Home;
