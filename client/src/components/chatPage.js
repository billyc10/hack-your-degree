import React, { useState, useEffect, useRef, Component } from 'react';
import './styles/App.css';
import Talk from 'talkjs';

class InboxApp extends React.Component {
	constructor(props) {
		super(props)
		this.talkjsContainer = React.createRef();
	}

	componentDidMount() {
		Talk.ready.then(() => {
			var me = new Talk.User({
				id: parseInt(Math.random() * 500000).toString(),
				name: "Alice",
				email: "demo@talkjs.com",
				photoUrl: "https://demo.talkjs.com/img/alice.jpg",
				welcomeMessage: "Hey there! How are you? :-)",
				role: "booker"
			});

			window.talkSession = new Talk.Session({
				appId: "Hku1c4Pt",
				me: me
			});

			var other = new Talk.User({
				id: parseInt(Math.random() * 500000).toString(),
				name: "Sebastian",
				email: "demo@talkjs.com",
				photoUrl: "https://demo.talkjs.com/img/sebastian.jpg",
				welcomeMessage: "Hey, how can I help?",
				role: "booker"
			});

			var conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other));
			conversation.setParticipant(me);
			conversation.setParticipant(other);

			var inbox = talkSession.createInbox({ selected: conversation });
			inbox.mount(this.talkjsContainer.current);
		});
	}

	render() {
		return (
			<div ref={this.talkjsContainer} className="chatbox-container"></div>
		)
	}
}

ReactDOM.render(<InboxApp />, document.querySelector("#app"))

function ChatPage() {
	return (
		<div>
			<div id="talkjs-container" styles="width: 90%; margin: 30px; height: 500px">
				<i>Loading chat...</i>
			</div>
		</div>

	);
}

export default ChatPage;