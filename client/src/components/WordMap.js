import React, {useState, useEffect, useRef} from 'react';
import './styles/App.css';

import ReactWordcloud from 'react-wordcloud';
import TextField from '@material-ui/core/TextField';


import axios from 'axios';
import config from '../config';

const words = [];

const wordCloudOptions = {
    rotations: 2,
	rotationAngles: [0, -90],
	
};


function Wordcloud() {
  return <ReactWordcloud 
  options = {wordCloudOptions}
  words={words} 
  minSize = {[600, 400]} />
};


function WordMap() {

	const [formData, setFormData] = useState();
	const [receivedWord, setReceivedWord] = useState('');
	const [sent, setSent] = useState(false);
	const [cloudWord, setCloudWord] = useState(false);


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
					setReceivedWord(response.data);
		});}	
	}, [sent]);


	useEffect(() => {
		let flag = 0;
		for (var i = 0; i<words.length; i++) {
			if (words[i].text == receivedWord) {
				words[i].value = words[i].value + 1;
				console.log("same word");
				flag = 1;
			}
		}
		if (!flag&&receivedWord.length) {
			words.push(
				{
					text: receivedWord,
					value: 1,
				}
			)
		}
		TextField.text = "";
	}, [receivedWord]);



	useEffect(() => {
		axios.get(config.SERVER_URL + '/getCloud')
			.then((response) => {
				setCloudWord(response.data);
			});
	});


	//WIP
	return (
		
		<div>
			Topic: {cloudWord}
            <form autoComplete="off" onSubmit = {handleSubmit}>
                <TextField id="standard-basic" label = "Input your response" value={formData || ''} onChange={handleChange}></TextField>
            </form>

            <p>Here is the word cloud of the responses</p>
            <Wordcloud></Wordcloud>
		</div>
	);
}

export default WordMap;