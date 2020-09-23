import React, {useState, useEffect, useRef} from 'react';
import './styles/App.css';

import ReactWordcloud from 'react-wordcloud';
import TextField from '@material-ui/core/TextField';


import axios from 'axios';
import config from '../config';

const words = [];
 
function Wordcloud() {
  return <ReactWordcloud words={words} />
};

const wordCloudOptions = {
    rotations: 1,
    rotationAngles: [0, 0],
};



function WordMap() {

	const [formData, setFormData] = useState();
	const [prompt, setPrompt] = useState('');
	const [sent, setSent] = useState(false);


    const handleSubmit = (submission) => {
        const data = formData;
		submission.preventDefault();
		setSent(true);

		// Sending the data to the API
        axios.post(config.SERVER_URL + '/wordmap', {
            wordmap: data
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
		  });
    }
    
    const handleChange = (smolChange) => {
        // Must access these values like this due to React Synthetic Event Pooling
        const {name, value} = smolChange.target;
		setFormData(value);
		setSent(false);
	};
	
	
	useEffect(() => {
		if (sent){
			axios.get(config.SERVER_URL + '/wordmap')
					.then((response) => {
					setPrompt(response.data);
		});}	
	}, [sent]);


	useEffect(() => {
		let flag = 0;
		for (var i = 0; i<words.length; i++) {
			if (words[i].text == prompt) {
				words[i].value = words[i].value + 1;
				console.log("same word");
				flag = 1;
			}
		}
		if (!flag) {
			words.push(
				{
					text: prompt,
					value: 1,
				}
			)
		}
		console.log(words[0].value)
	}, [prompt]);

	//WIP
	return (
		
		<div>
            <p>Prompt goes here</p>
            <form autoComplete="off" onSubmit = {handleSubmit}>
                <TextField id="standard-basic" label = "Input your response" value={formData || ''} onChange={handleChange}></TextField>
            </form>

            <p>Here is the word cloud of the responses below</p>
            <Wordcloud 
                options = {wordCloudOptions}></Wordcloud>
		</div>
	);
}

export default WordMap;