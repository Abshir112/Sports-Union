import express from "express";
import dotenv from "dotenv";

dotenv.config();


const app = express();


app.get("/", (req, res) => {
    res.send("Welcome to Home");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
