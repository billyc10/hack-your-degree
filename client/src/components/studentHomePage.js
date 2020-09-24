import React, { useState, useEffect, useRef } from 'react';
import './styles/App.css';
import axios from 'axios';
import Talk from 'talkjs';
import config from '../config';

function ChatPage() {
	// Create the ref
	const talkjsContainer = React.createRef();

	// State variables
	const [ready, _setReady] = useState(false);
	const readyContainer = useRef(ready);
	const setReady = (x) => {
		_setReady(x);
		readyContainer.current = x;
	}

	const [userList, _setUserList] = useState([]);
	const userListContainer = useRef(userList);
	const setUserList = (x) => {
		_setUserList(x);
		userListContainer.current = x;
	}

	useEffect(() => {
		// Listen for when Talk library is loaded
		Talk.ready.then(() => {	
			setReady(true);
		})
	}, [])

	useEffect(() => {
		// Subscribe to API server-sent event for new polls
		let eventSource = new EventSource(config.SERVER_URL + '/refreshUsers')

		eventSource.onmessage = (e) => {
			// only update users if incoming list is different
			if (e.data !== JSON.stringify(userListContainer.current)) {
				let newList = JSON.parse(e.data);
				setUserList(newList);

				// Create user
				if (readyContainer.current) {
					if (newList.length != 0) {
						var me = new Talk.User({
							id: newList.users[newList.users.length - 1],
							name: newList.users[newList.users.length - 1]
						});

						// Creating user session
						window.session = new Talk.Session({
							appId: "tNXEJKMr",
							me: me
						});

						// Add to conversation
						const conversation = window.session.getOrCreateConversation("10");
						conversation.setParticipant(me);

						var chatbox = window.session.createChatbox(conversation);
						document.getElementById("talkjs-container").innerHTML = "";
						chatbox.mount(document.getElementById("talkjs-container"));

					}
				}
			}
		}
		eventSource.onerror = (err) => {
			console.log("EventSource failed: ", err);
		}
	}, []);

	return (
		<div>
			<div style={{ height: '500px' }} id="talkjs-container" ref={talkjsContainer}>Loading...</div>
		</div>
	);
}

function StudentHomePage() {
	const [formData, setFormData] = useState();

	const [page, setPage] = useState('username');

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

		setPage('chat');
	};

	const handleChange = (e) => {
		// Must access these values like this due to React Synthetic Event Pooling
		const { name, value } = e.target;

		setFormData(value);
	};

	if (page == 'username') {
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
	else if (page == 'chat') {
		return <ChatPage />
	}
}

export default StudentHomePage;