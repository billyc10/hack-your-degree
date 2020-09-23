import React, { useState, useEffect, useRef, Component } from 'react';
import './styles/App.css';
import axios from 'axios';

import config from '../config';

function ImageRetrieve() {
    const [retImage, setRetImage] = useState('');
	
	useEffect(() => {
		axios.get(config.SERVER_URL + '/image')
			.then((response) => {
				setRetImage(response.image);
			});
	});

	return (
		<div> 
			The prompt is: {retImage}
		</div>
	);
}


export default ImageRetrieve;