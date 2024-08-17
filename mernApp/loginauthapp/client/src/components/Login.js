// In Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
    const [data, setData] = useState({
        email: "",
        password: "",
        error: null
    });
    const { email, password, error } = data;
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
                "/auth/login",
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            localStorage.setItem("token", res.data.token);
            navigate("/"); // Use navigate from react-router-dom v6
        } catch (err) {
            const errorMessage = err.response ? err.response.data.error : "An error occurred";
            setData(prevData => ({ ...prevData, error: errorMessage }));
        }
    };
    
    return (
        <div className='form mt-5'>
            <h4 className='text-muted text-center mb-5'>Create an account</h4>
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
                
                </form>
                <div>
                </div>
            </div>
        </div>
    );
}
export default Login;