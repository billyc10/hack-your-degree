import Axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import './styles/App.css';

import config from '../config';

function DiscussionStudent() {
	const [prompt, setPrompt] = useState('');
	
	useEffect(() => {
		Axios.get(config.SERVER_URL + '/getDiscussion')
			.then((response) => {
				setPrompt(response.data);
			});
	});

	return (
		<div> 
			The prompt is: {prompt}
		</div>
	);
}

export default DiscussionStudent;