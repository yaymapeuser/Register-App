'use strict'
const cors = require('cors');
const authRoutes = require('./auth/auth.routes');
const express = require('express');
const propierties = require('./config/properties');
const DB = require('./config/db');
const whiteList = ['http://localhost:4200', 'http://localhost:3000']

//initDB
DB();

const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();                                        // create application/json parser
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });          // create application/x-www-form-urlencoded parser

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(cors({ origin:whiteList }));
app.use('/api', router);
authRoutes(router);
router.get('/', (req, res) => {
    res.send('Hello from home');
});

app.use(router);
app.listen(propierties.PORT, () => console.log(`Server running on port ${propierties.PORT}`));