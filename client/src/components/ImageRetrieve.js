import React, { useState, useEffect, useRef, Component } from 'react';
import './styles/App.css';
import Axios from 'axios';

import config from '../config';

function ImageRetrieve() {
    const [retImage, setRetImage] = useState('');
	
	useEffect(() => {
		Axios.get(config.SERVER_URL + '/getImage')
			.then((response) => {
				setRetImage(response.file);
			});
	});

	return (
		<div> 
			The prompt is: {retImage}
		</div>
	);
}


export default ImageRetrieve;