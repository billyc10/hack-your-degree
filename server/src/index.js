const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const path = require("path")
const fs = require("fs")

// Importing a service
const AppService = require('./services/appService').AppService;
const appService = new AppService();

const PORT = 5000;

// CORS middleware for all routes
app.use(cors());
//app.use(express.static(__dirname + '/'));

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



app.get("/getImage", (req, res) => {
    res.sendFile(path.join(__dirname, "./uploads/image.png"));
  });



const handleError = (err, res) => {
    console.log(err);
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

const upload = multer({
    dest: "/upload/"
    //dest: "/path/to/temporary/directory/to/store/uploaded/files"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


app.post(
    "/upload",
    upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "./uploads/image.png");

        if (path.extname(req.file.originalname).toLowerCase() === ".png") {
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);

                res
                    .status(200)
                    .contentType("text/plain")
                    .end("File uploaded!");
            });
        } else {
            fs.unlink(tempPath, err => {
                if (err) return handleError(err, res);

                res
                    .status(403)
                    .contentType("text/plain")
                    .end("Only .png files are allowed!");
            });
        }
        appService.discussionImage = targetPath;
    }
);


/*
app.post('/upload', (req,res) => {
    const file = req.body.image
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if (err) {
            console.error(err);
        }
    })
   
})
 */

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))