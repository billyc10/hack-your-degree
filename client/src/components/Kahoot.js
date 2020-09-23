import React, {useState, useEffect, useRef} from 'react';
import './styles/App.css';

// This is a component declared within this page (and only accessible within this page)
function Prompt() {
	return (
		<div className = "PromptComponent">
			<div className = "Prompt">
				THIS IS THE DISCUSSION PROMPT
			</div>
			<div className = "Image">
				This is where the image will go
			</div>
		</div>
	);
}

// This is the actual 'Page' that is exported to be used within any area of the site
function Kahoot() 
{
	return (
		<div> 
			<title>Kahoot Quiz 
            </title>
        <link href ="style.css" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet"></link>
        <script src = "main.js"></script>

        <body>

        <h1> Student quiz </h1>
        <form id = "quiz" name = "quiz">
        </form>
        <p>Kahoot</p>
        <iframe src="https://kahoot.it/" style="border:0px #ffffff none;" name="Kahoot" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="600px" allowfullscreen></iframe>
        <input id = "button" type = "button" value = "I'm done" onclick = "check();"></input> 
            
        </body>
        </div>
    );
}
export default Kahoot;