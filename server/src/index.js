const express = require('express')
const app = express()
const cors = require('cors');

const AppService = require('./services/appService').AppService;
const appService = new AppService();

const PORT = 5000;

// CORS middleware for all routes
app.use(cors());
    
// Routes
app.get('/', function (req, res) {
    res.send('Welcome to the root of the server');
})

app.get('/isEven/:num', function (req, res) {
    let response = appService.isEven(req.params.num);
    res.send(response);
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))