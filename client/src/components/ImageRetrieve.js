import React, { useState, useEffect, useRef, Component } from 'react';
import './styles/App.css';
import axios from 'axios';

import config from '../config';


class ImageRetrieve extends Component {
	state = { source: null };
	componentDidMount() {
		axios
			.get(
				config.SERVER_URL + '/getImage',
				{ responseType: 'arraybuffer' },
			)
			.then(response => {
				const base64 = btoa(
					new Uint8Array(response.data).reduce(
						(data, byte) => data + String.fromCharCode(byte),
						'',
					),
				);
				this.setState({ source: "data:;base64," + base64 });
			});
	}

	render() {

		return (
			<div>
				The prompt is:
				<img src={this.state.source}></img>
			</div>

		)
	}
}

/*
function ImageRetrieve() {
	const [retImage, setRetImage] = useState('');
	
	useEffect(() => {
		
		axios({
			url: config.SERVER_URL + '/getImage',
			method: 'GET',
			responseType: 'blob'
		})

		
		axios.get(config.SERVER_URL + '/getImage')
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
*/


export default ImageRetrieve;