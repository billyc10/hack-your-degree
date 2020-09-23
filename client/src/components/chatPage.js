import React, { useState, useEffect, useRef, Component } from 'react';
import './styles/App.css';
import Talk from 'talkjs';

class ChatPage extends React.Component {
	constructor(props) {
		super(props);

		this.inbox = undefined;
	}

	componentDidMount() {
		// Promise can be `then`ed multiple times
		Talk.ready
			.then(() => {
				const me = new Talk.User({
					id: "idA",
					name: "Alice",
				});
				const session = new Talk.Session({
					appId: "tNXEJKMr",
					me: me
				});

				const other1 = new Talk.User({
					id: "idB",
					name: "Sebastian",
				});

				const other2 = new Talk.User({
					id: "idC",
					name: "Steve",
				});

				// Conversation ID
				const conversation = session.getOrCreateConversation("1");
				conversation.setParticipant(me);
				conversation.setParticipant(other1);
				conversation.setParticipant(other2);
				conversation.setAttributes({
					subject: "FIT1234 Breakout Room"
				});

				var chatbox = session.createChatbox(conversation);
				chatbox.mount(document.getElementById("talkjs-container"));

				this.inbox.mount(this.container);

			})
			.catch(e => console.error(e));
	}

	componentWillUnmount() {
		if (this.inbox) {
			this.inbox.destroy();
		}
	}

	render() {
		return (<span>
			<div id="talkjs-container" style={{ height: '500px' }} ref={c => this.container = c }>Loading...</div>
		</span>);
	}
}

export default ChatPage;