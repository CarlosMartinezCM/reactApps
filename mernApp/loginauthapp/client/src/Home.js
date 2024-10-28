import React, { useEffect, useState, useCallback } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from "./components/Navbar.js"

const Home = (props) => {
    const [user, setUser] = useState(null);
    const { isLoggedIn, setIsLoggedIn } = props;
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
        setIsLoggedIn(false);
        navigate("/login");
    }

    if (!isLoggedIn) {
        return <p>Loading...</p>; // Show a loading state until user data is fetched
    }

    return (

        <div className='body'>
            <div className='jumbotron'>
                <div className="home">
                    <header className="hero">
                        <h1>Welcome  {user && user.name} to the Website!</h1>
                        <p>Your one-stop solution for all your needs.</p>
                        <button className="cta-button">Get Started(clickable)</button>
                    </header>
                    <main>
                        <section className="features">
                            <h2>Layout under construction</h2>
                            <div className="feature-items">
                                <div className="feature-item">
                                    <h3>Features will include</h3>
                                    <p>A lot of things!!!!</p>
                                </div>
                            </div>
                        </section>
                    </main>
                    <footer className="footer">
                        <p>&copy; The footer</p>
                    </footer>
                </div>
                {isLoggedIn && (<button className='btn btn-danger' onClick={logout}>Logout</button>)}
            </div>
        </div>
    );
}

export default Home;
