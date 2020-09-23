import React, {useState, useEffect, useRef} from 'react';
import './styles/App.css';

import ReactWordcloud from 'react-wordcloud';
import TextField from '@material-ui/core/TextField';


import axios from 'axios';
import config from '../config';

const words = [
	{
		text: 'told',
		value: 1,
	}
];
 
function Wordcloud() {
  return <ReactWordcloud words={words} />
};

const wordCloudOptions = {
    rotations: 1,
    rotationAngles: [0, 0],
};

function WordMap() {

    const [formData, setFormData] = useState();


    const handleSubmit = (submission) => {
        const data = formData;
        submission.preventDefault();

		// Sending the data to the API
        axios.post(config.SERVER_URL + '/wordmap', {
            text: data
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
    };



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