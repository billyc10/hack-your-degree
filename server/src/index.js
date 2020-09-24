const express = require('express')
const app = express()
const cors = require('cors');

// Importing a service
const AppService = require('./services/appService').AppService;
const appService = new AppService();

const PORT = 5000;

// CORS middleware for all routes
app.use(cors({origin: true, credentials: true}));
    
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

app.post('/setUsername', express.json(), function (req, res) {
    // Set discussion topic
    console.log(req.body.topic);
    appService.usernames.push(req.body.topic);
    console.log(appService.usernames);
    res.sendStatus(200);
})

app.get('/getUsername', function (req, res) {
    // Set discussion topic
    res.send(appService.username);
})

app.get("/refreshUsers", (req, res) => {
    // Server-Sent Event: Periodically send out user list to clients
    // that have connected to this stream with an eventSource
        res.set({
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive"
          })
        
          // Function that periodically sends new data to this client
          let eventStream = setInterval(() => {
              res.write(`data: ${JSON.stringify({users: appService.usernames})}\n\n`);
          }, 2000)
      
          // Stop sending responses if client closes connection (closes the page)
          req.on('close', () => {
              clearInterval(eventStream);
              res.end();
          })
      
          // Send initial data
          res.write(`data: ${JSON.stringify({users: appService.usernames})}\n\n`);
})


app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))