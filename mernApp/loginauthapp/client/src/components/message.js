import React, { useState } from 'react';
import axios from 'axios';

const SendMessage = () => {
    cont[to, setTo] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const sendMessage = async () => {
        try {
            const responce = await axios.post('http://localhost:5000/send-sms', { to, message });
            if (responce.data.success) {
                setStatus('Message was sent successfully!!');
            } else {
                setStatus('Failed to send the message!!');
            }
        } catch (error) {
            setStatus(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Testing Twilios send text message</h2>
            <p>This will be used for 2 fac auth at somepoint.</p>
            <input
                type="text"
                placeholder='Recipient Number'
                value={to}
                onChange={(e) => setTo(e.target.value)}
            />
            <textarea
                placeholder='sending message now'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button onClick={sendMessage}>Send message</button>
            <p>{status}</p>
        </div>
    )

};

export default SendMessage;