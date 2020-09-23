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
function Page1() {

	// How to maintain the state of a variable and trigger re-renders
	let [variable, setVariable] = useState(0);

	console.log(stateVariable); // 0
	setVariable(5);

	console.log(variable); // 5, and will maintain its state

	console.log("Hello!"); // This will run every single time variable changes, as the whole page reloads.


	// Arrow notation
	// (args) => { function }

	// How to only fire an event on initial page load?
	useEffect(() => {
		console.log("Hello, I'm not repeatedly run");
	}, []); // Put state variables in the array if you want this to run everytime that state changes

	return (
		<div> 
			<title>Kahoot Quiz<\title>
<link href ="style.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
<script src = "main.js></script>

</head>

<body>

<h1> Student quiz </h1>
<form id = "quiz" name = "quiz">

<p>Kahoot</p>
<iframe src="https://kahoot.it/" style="border:0px #ffffff none;" name="Kahoot" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="600px" allowfullscreen></iframe>


//<p>Sample question 1</p>
//<input id = "textbox" type = "text" name = "q1">

<p>Sample question 2</p>
<input type = "radio" id = "mc" name = "question 2" value = "Option 1"> Option 1<br>
<input type = "radio" id = "mc" name = "question 2" value = "Option 2"> Option 2<br>
<input type = "radio" id = "mc" name = "question 2" value = "Option 3"> Option 3<br>
<input type = "radio" id = "mc" name = "question 2" value = "Option 4"> Option 4<br>

<input id = "button" type = "button" value = "I'm done" onclick = "check();"></input>
		    Hello this is page {x}
            <Button onClick={setVariable(variable + 1)}> </Button>
		</div>
	);
}

export default Page1;