const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require('cors');
const twilio = require('twilio');
const { error } = require("console");

const uri = process.env.MONGO_URI;
console.log('MongoDB URI:', uri);

// Twilio Config.
const actSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(actSid, authToken);

// Connect to DB
mongoose
    .connect(uri)
    .then(() => console.log("Connected to MongoDB Successfully!!!!"))
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
    });

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/user"));

const PORT = process.env.PORT || 5000;

app.post('/send_msg', (req, res) => {
    const { to, message } = req.body;

    client.message
    .create({
        body: message,
        from: process.env.TWILIO_PHNOE_NUMBER,
        to: to,
    })
    .then((message) => res.status(200).json({ success: true, messageSid: message.sid }))
    .catch((error) => res.status(500).json({ success: false, error: error.message }));

});

app.listen(PORT, () => console.log("Sever is running"));