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
var x = Math.ceil(5*Math.random());
// This is the actual 'Page' that is exported to be used within any area of the site
function Kahoot() 
{
	return (
		<div> 
			<title>Kahoot Quiz 
            </title>
        <link href ="style.css" rel="stylesheet"></link>
		
		<p>Kahoot</p>
		<p>Breakout Room {x}</p>
		<br></br>
        <iframe src="https://kahoot.it" title="Play Kahoot!" width="600" height="400"></iframe>
        <script src = "app.js"></script>

        <body>
        
            
        </body>
        </div>
    );
}
export default Kahoot;