import React, {useState, useEffect, useRef} from 'react';
import './styles/App.css';

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

function Page1() {
	return (
		<div> 
		    Hello this is page 1
            <Prompt></Prompt>
		</div>
	);
}

export default Page1;