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

/* 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
   
    <div class="content">
        <div class="picksForm">
            <h2>Picks submit form</h2>
            <h3>Week 5 Matchup</h3>
            <h4>Team Name</h4>
            <form id="checkboxForm"></form><br>
            <button id="asf" onclick="alertSubmitForm()">Submit</button><br><br>
        </div>
        <div class="content">
            <div class="loginCard">
                <h1>Login page</h1>
                <div class="loginForm">
                <form>
                    <label for="userName">Username</label><br>
                    <input type="text" id="un" name="userName" placeholder="Username"><br>
                    <label for="userPassword">Password</label><br>
                    <input type="password" id="pw" name="userPassword" placeholder="Password"><br>
                    <button onclick="showAlert()">Submit</button><br>
                </form>
            </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="./matchupGen.js"> </script>
    <script type="text/javascript" src="./form.js"> </script>
</body>

</html> 




function showAlert() {
    var username = document.getElementById("un").value;
    var password = document.getElementById("pw").value;

    alert("Username: " + username + "\nPassword: " + password);

     // Prevent form submission for demo purposes
    return false;
};

function alertSubmitForm() {
    //initialize the array to store the selected options.
    const selection = [];

    //
    const selected = document.querySelectorAll('input[type="radio"]:checked');

    //Loop through the selected radio buttons and push them in to the selection array. 
    selected.forEach(input => {
        selection.push(input.value);
    });

    // Display the selection array in an alert to confirm that the correct picks work added to the array.
    alert("Selected picks: " + selection.join(', '));

    // Prevent form submission for demo purposes
    return false;
}

 // 
window.onload = function () {
    numGames();
}

function numGames() {

    const form = document.getElementById('checkboxForm');
    var inputValue = 16; //document.getElementById("numberOfGames").value;
    //alert("number of games: " + inputValue);

    // Assume 'form' is the form or container where you are appending the radio buttons
    for (let i = 1; i <= inputValue; i += 2) {
        // Create first option (radio button)
        const label1 = document.createElement('label');
        label1.setAttribute('for', 'option' + i);
        label1.innerText = 'Option ' + i;

        const radio1 = document.createElement('input');
        radio1.type = 'radio';
        radio1.id = 'option' + i;
        radio1.name = 'group' + Math.ceil(i / 2);  // Grouping radio buttons by matchups
        radio1.value = i;

        // Create second option (radio button)
        const label2 = document.createElement('label');
        label2.setAttribute('for', 'option' + (i + 1));
        label2.innerText = 'Option ' + (i + 1);

        const radio2 = document.createElement('input');
        radio2.type = 'radio';
        radio2.id = 'option' + (i + 1);
        radio2.name = 'group' + Math.ceil(i / 2);  // Same group name as the first radio button
        radio2.value = i + 1;

        // Append the first radio button and label
        form.appendChild(radio1);
        form.appendChild(label1);

        // Append the second radio button and label
        form.appendChild(radio2);
        form.appendChild(label2);

        // Insert a line break after every two options
        const lineBreak = document.createElement('br');
        form.appendChild(lineBreak);


    }
     // Prevent form submission for demo purposes
    return false;
}



*/