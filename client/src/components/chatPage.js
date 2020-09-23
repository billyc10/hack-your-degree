import React, { useState, useEffect, useRef, Component } from 'react';
import './styles/App.css';
import Talk from 'talkjs';

function ChatPage() {
	// Usernames and current user
	let listOfUsernames = ["Billy", "Nishil", "Kevin", "Tas", "Collins"];
	let currentUser = "Collins";

	// Remove current user from list of usernames
	for (let i = 0; i < listOfUsernames.length; i++) {
		if (currentUser == listOfUsernames[i]) {
			listOfUsernames.splice(i);
			break;
		}
	}

	// Create the ref
	const talkjsContainer = React.createRef();

	useEffect(() => {
		// Listen for when Talk library is loaded
		Talk.ready.then(() => {
			// Create own user
			var me = new Talk.User({
				id: currentUser,
				name: currentUser
			});

			// Creating user session
			const session = new Talk.Session({
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
			const conversation = session.getOrCreateConversation("4");

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
			var chatbox = session.createChatbox(conversation);
			chatbox.mount(talkjsContainer.current);
		})
	}, [])

	return (
		<div>
			<div style={{ height: '500px' }} ref={talkjsContainer}>Loading...</div>
		</div>
	);
}

export default ChatPage;