const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Add this

mongoose.connect('mongodb://localhost:27017/LoginDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

app.post('/login', async (req, res) => {
    console.log('Received login request:', req.body); // Log received data
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        console.log('Login successful');
        res.send('Login successful');
    } else {
        console.log('Invalid credentials');
        res.send('Invalid credentials');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
