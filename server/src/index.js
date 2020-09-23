const express = require('express')
const app = express()
const cors = require('cors');

// Importing a service
const AppService = require('./services/appService').AppService;
const appService = new AppService();

const PORT = 5000;

// CORS middleware for all routes
app.use(cors());
    
// Routes
app.get('/', function (req, res) {
    res.send('Welcome to the root of the server');
})

app.get('/a/b', function (req, res) {
    res.send('welcome to page b');
})

app.get('/isEven/:num', function (req, res) {
    let response = appService.isEven(req.params.num);
    res.send(response);
})

app.post('/setDiscussion', express.json(), function (req, res) {
    // Set discussion topic
    appService.discussionTopic = req.body.topic;
    res.sendStatus(200);
})

app.get('/getDiscussion', function (req, res) {
    // Set discussion topic
    res.send(appService.discussionTopic);
})


app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))