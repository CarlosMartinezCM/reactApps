const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;

//connect to DB
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB Successfully!!!!"))
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
    });

app.use(express.json());

app.use("/auth" , require("./routes/user"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Sever is running"));