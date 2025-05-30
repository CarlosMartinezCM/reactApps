import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
    const [data, setData] = useState({
        email: "",
        password: "",
        error: null
    });
    const { email, password, error } = data;
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData(prevData => ({ ...prevData, error: null }));

        try {
            const res = await axios.post(
                "auth/login",
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            localStorage.setItem("token", res.data.token);
            setIsLoggedIn(true); // Set login status to true on successful login
        } catch (err) {
            const errorMessage = err.response ? err.response.data.error : "An error occurred";
            setData(prevData => ({ ...prevData, error: errorMessage }));
        }
    };

    // Redirect to home page after successful login
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/"); // Redirect to home page
        }
    }, [isLoggedIn, navigate]);

    const createAccount = () => {
        navigate("/Register"); // Redirect to create an account page
    };

    return (
        <div className='body'>
            <h4 className='text-muted text-center mb-5'>Welcome</h4>
            <div className='card p-5 shadow'>
                <form>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            className='form-control'
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            className='form-control'
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange} />
                    </div>
                    {error ? <p className='text-danger'>{error}</p> : null}
                    <div className='text-centered'>
                        <button className='btn btn-primary' onClick={handleSubmit}>Login</button>
                    </div>
                    <br />
                    <div className='text-centered'>
                        <button className='btn btn-primary' onClick={createAccount}>create and account</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
