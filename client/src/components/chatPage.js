import React, { useState, useEffect, useRef, Component } from 'react';
import './styles/App.css';
import Talk from 'talkjs';
import config from '../config';
import Axios from 'axios';

function ChatPage() {
	// Create the ref
	const talkjsContainer = React.createRef();
	console.log(talkjsContainer)

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
			const conversation = window.session.getOrCreateConversation("5");

			// Add users into group chat
			conversation.setParticipant(me);
			for (let i = 0; i < talkUsers.length; i++) {
				conversation.setParticipant(talkUsers[i]);
			}

			// Set group chat attributes
			conversation.setAttributes({
				subject: "FIT1234 Breakout Room"
			});

			// Display
			var chatbox = window.session.createChatbox(conversation);
			chatbox.mount(talkjsContainer.current);
		})
	}, [])

	const [userList, _setUserList] = useState([]);
	const userListContainer = useRef(userList);

	const setUserList = (x) => {
		_setUserList(x);
		userListContainer.current = x;
	}

	// useEffect(() => {
	// 	// Subscribe to API server-sent event for new polls
	// 	let eventSource = new EventSource(config.SERVER_URL + '/refreshUsers')

	// 	eventSource.onmessage = (e) => {
	// 		// only update users if incoming list is different
	// 		if (e.data !== JSON.stringify({ users: userList })) {
	// 			setUserList(JSON.parse(e.data).users);

	// 			console.log("New User");
	// 			// Create user
	// 			console.log(userList)
	// 			if (userList.length != 0) {
	// 				let newUser = new Talk.User({
	// 					id: userList[-1],
	// 					name: userList[-1],
	// 				});
	// 				// Add to conversation
	// 				const conversation = window.session.getOrCreateConversation("4");
	// 				conversation.setParticipant(newUser);
	// 			}
	// 		}
	// 	}
	// 	eventSource.onerror = (err) => {
	// 		console.log("EventSource failed: ", err);
	// 	}
	// }, []);

	return (
		<div>
			<div style={{ height: '500px' }} ref={talkjsContainer}>Loading...</div>
		</div>
	);
}

export default ChatPage;