import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = (props) => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        error: null
    });

    const { name, email, password, error } = data;
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
            await axios.post(
                "/auth/register",
                { name, email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            navigate("/login"); // Redirect to login page
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
                        <label htmlFor='name'>Name</label>
                        <input
                            className='form-control'
                            type="name"
                            name="name"
                            value={name}
                            onChange={handleChange} />
                    </div>
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
                    {error ? <p className='text-danger'>{error}</p> : null }
                    <div className='text-centered'>
                        <button className='btn btn-primary' onClick={handleSubmit}>Register</button>
                    </div>
                    <p className='mt-3 text-center'>
                        Already a user? <Link to="/login">Login</Link>
                    </p>
                </form>
                <div>
                </div>
            </div>
        </div>
    )
}

export default Register;
