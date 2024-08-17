import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getUser = async () => {
        const res = await axios.get("/auth", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setUser(res.data);
    };

    useEffect(() => {
        getUser();
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        navigate("/login"); // Redirect to login page
    }

    if (!localStorage.getItem('token')){
        navigate("/login"); // Redirect to login page
    }

    return (
        <div className='homePage'>
            <div className='jumbotron'>
                <p className='lead'>Welcome {user && user.name}</p>
                <button className='btn btn-danger' onClick={logout}>Logout</button>
            </div>
        </div>
    )

};

export default Home;