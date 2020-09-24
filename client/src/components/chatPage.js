import React, { useState, useEffect, useRef, Component } from 'react';
import './styles/App.css';
import Talk from 'talkjs';
import config from '../config';
import Axios from 'axios';

function ChatPage() {
	// Create the ref
	const talkjsContainer = React.createRef();

	// State variables
	const [i, setI] = useState(0);

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

	// Usernames and current user
	let listOfUsernames = ["a", "b", "c"];
	let currentUser = "Collins";

	useEffect(() => {
		// Remove current user from list of usernames
		for (let i = 0; i < listOfUsernames.length; i++) {
			if (currentUser == listOfUsernames[i]) {
				listOfUsernames.splice(i);
				break;
			}
		}

		// Listen for when Talk library is loaded
		Talk.ready.then(() => {

			setReady(true);
			// Create own user
			var me = new Talk.User({
				id: currentUser,
				name: currentUser
			});

			// Creating user session
			window.session = new Talk.Session({
				appId: "tNXEJKMr",
				me: me
			});

			// Create users in same breakout room
			let talkUsers = []
			for (let i = 0; i < listOfUsernames.length; i++) {
				talkUsers.push(
					new Talk.User({
						id: listOfUsernames[i],
						name: listOfUsernames[i],
					})
				);
			}

			// Create group chat with ID for breakout room
			const conversation = window.session.getOrCreateConversation("6");

			// Add users into group chat
			conversation.setParticipant(me);
			for (let i = 0; i < talkUsers.length; i++) {
				conversation.setParticipant(talkUsers[i]);
			}

			// Set group chat attributes
			conversation.setAttributes({
				subject: "FIT12345 Breakout Room"
			});

			// Display
			var chatbox = window.session.createChatbox(conversation);
			try {
				chatbox.mount(talkjsContainer.current);
			} catch (error) {
				setI(i + 1);
			}

			const userA = new Talk.User({
				id: "pls work",
				name: "pls work",
			})

			conversation.setParticipant(userA);
			let a = 5;
		})
	}, [i])

	useEffect(() => {
		// Subscribe to API server-sent event for new polls
		let eventSource = new EventSource(config.SERVER_URL + '/refreshUsers')

		eventSource.onmessage = (e) => {
			// only update users if incoming list is different
			if (e.data !== JSON.stringify(userListContainer.current)) {
				let newList = JSON.parse(e.data);
				setUserList(newList);

				// Create user
				console.log("a");
				if (readyContainer.current) {
					if (newList.length != 0) {
						var me = new Talk.User({
							id: currentUser,
							name: currentUser
						});

						let newUser = new Talk.User({
							id: newList.users[newList.users.length - 1],
							name: newList.users[newList.users.length - 1],
						});

						// Creating user session
						window.session = new Talk.Session({
							appId: "tNXEJKMr",
							me: me
						});

						// Add to conversation
						const conversation = window.session.getOrCreateConversation("6");
						conversation.setParticipant(newUser);

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

export default ChatPage;