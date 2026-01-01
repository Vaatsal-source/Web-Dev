const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
const mongoURI = process.env.MONGO_URI || "mongodb+srv://vaatsalya161_db_user:CARbon31@myfirstapi.cwznas0.mongodb.net/MyFirstAPI?appName=MyFirstAPI";
mongoose.connect(mongoURI)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.error("❌ Connection error:", err));
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    interest: String
});
const User = mongoose.model('User', userSchema, 'users');
app.get('/user', async (req, res) => {
    try {
        const user = await User.find(); 
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
});
app.post('/add-user', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "User saved to MongoDB!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save User" });
    }
});
app.delete('/delete-user/:name', async (req, res) => {
    try {
        await User.deleteOne({ name: req.params.name });
        res.json({ message: "Deletion Successful" });
    } catch (error) {
        res.status(500).json({ error: "Deletion unsuccessful" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});