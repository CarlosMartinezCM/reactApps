const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require('cors');

const uri = process.env.MONGO_URI;
console.log('MongoDB URI:', uri);

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

app.listen(PORT, () => console.log("Sever is running"));