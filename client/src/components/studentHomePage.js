import React, { useState, useEffect, useRef } from 'react';
import './styles/App.css';
import axios from 'axios';

import config from '../config';

function StudentHomePage() {
	const [formData, setFormData] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();

		// Convert state object to API poll object
		const data = formData;

		// Send new poll to API
		axios.post(config.SERVER_URL + '/setUsername', {
			topic: data
		})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleChange = (e) => {
		// Must access these values like this due to React Synthetic Event Pooling
		const { name, value } = e.target;

		setFormData(value);
	};
	return (
		<div>
			<form className='poll-input' onSubmit={handleSubmit}>
				<label className='form-label'>
					Enter your Username:
				<input name='topic' type="text" value={formData || ''} onChange={handleChange} />
				</label>
				<input className='submit-btn' type="submit" value="Submit" />
			</form>
		</div>
	);
}

export default StudentHomePage;