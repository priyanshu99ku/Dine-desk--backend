const express = require('express');
const connectDB=require('./config/DataBase');

const app = express();
app.use(express.json());

app.post('/signuprestaurant', async (req, res) => {
    const { name, address, contacts } = req.body;
    
const startServer = async () => {
    try {
        await connectDB(); 
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (err) {
        console.error('Failed to start server:', err);
    }
};
startServer();