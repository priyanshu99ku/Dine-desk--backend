const express = require('express');
require('./config/DataBase');
const app = express();

const {AdminAuth} = require('./middlewares/auth');

const {UserAuth} = require('./middlewares/auth');

app.listen(3000, () => {
    console.log('server is running on port 3000');
});