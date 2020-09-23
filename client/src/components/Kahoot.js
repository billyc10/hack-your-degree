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
		<p>Kahoot</p>
        <iframe src="https://kahoot.it" title="Play Kahoot!"></iframe>
        <script src = "app.js"></script>

        <body>
        
            
        </body>
        </div>
    );
}
export default Kahoot;