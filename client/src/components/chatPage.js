import React, { useState, useEffect, useRef, Component } from 'react';
import './styles/App.css';
import Talk from 'talkjs';

function ChatPage() {

	(function (t, a, l, k, j, s) {
		s = a.createElement('script'); s.async = 1; s.src = "https://cdn.talkjs.com/talk.js"; a.head.appendChild(s)
			; k = t.Promise; t.Talk = {
				v: 3, ready: {
					then: function (f) {
						if (k) return new k(function (r, e) { l.push([f, r, e]) }); l
							.push([f])
					}, catch: function () { return k && new k() }, c: l
				}
			};
	})(window, document, []);

	await Talk.ready;
	const me = new Talk.User({
		id: "123456",
		name: "Alice",
		email: "alice@example.com"
	});
	const session = new Talk.Session({
		appId: "YOUR_APP_ID",
		me: me
	});

	const other1 = new Talk.User({
		id: "654321",
		name: "Sebastian",
		email: "sebastian@example.com"
	});

	const other2 = new Talk.User({
		id: "456789",
		name: "Steve",
		email: "steve@example.com"
	});

	const conversation = session.getOrCreateConversation("CONVERSATION_ID");
	conversation.setParticipant(me);
	conversation.setParticipant(other1);
	conversation.setParticipant(other2);
	conversation.setAttributes({
		photoUrl: "https://demo.talkjs.com/img/11.jpg",
		subject: "Beautiful Steel Preserve for rent!"
	});

	var chatbox = session.createChatbox(conversation);
	chatbox.mount(document.getElementById("talkjs-container"));
	return (
		<div>
			<div id="talkjs-container" styles="width: 90%; margin: 30px; height: 500px">
				<i>Loading chat...</i>
			</div>
		</div>

	);
}

export default ChatPage;