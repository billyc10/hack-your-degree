import React, {useState, useEffect, useRef} from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import './styles/App.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import ImageUpload from './ImageUpload';
import Page1 from './Page1';
import Page2 from './Page2';
import DiscussionTeacher from './DiscussionTeacher';
import DiscussionStudent from './DiscussionStudent';
import ImageRetrieve from './ImageRetrieve';





function Home() {
	return (
		<div>
			Welcome to the home page
		</div>
	);
}

function App() {
	return(
		<div>
			<Router>
				<div className='Navigation'>
					<Button>
						<Link to="/"> Home Page </Link>
					</Button>
					<Button>
						<Link to="/page1">Page 1</Link>
					</Button>
					<Button>
						<Link to="/page2">Page 2</Link>
					</Button>
					<Button>
						<Link to="/ImageUpload">IMAGE UPLOAD</Link>
					</Button>
					<Button>
						<Link to="/ImageRetrieve">IMAGE RETRIEVE</Link>
					</Button>
					<Button>
						<Link to="/multiplePages"> Show Page 1 and Page 2</Link>
					</Button>
					<Button>
						<Link to="/setDiscussion"> Set Discussion </Link>
					</Button>
					<Button>
						<Link to="/getDiscussion"> Get Discussion </Link>
					</Button>
				</div>
				
				<div className ="App">
					<Switch>
						<Route path="/multiplePages">
							<Page1></Page1>
							<Page2></Page2>
						</Route>

						<Route path = "/ImageUpload">
							<ImageUpload></ImageUpload>
						</Route>
						<Route path = "/ImageRetrieve">
							<ImageRetrieve></ImageRetrieve>
						</Route>


						<Route path="/page1">
							<Page1></Page1>
						</Route>

						<Route path="/page2">
							<Page2></Page2>
						</Route>

						<Route path="/setDiscussion">
							<DiscussionTeacher></DiscussionTeacher>
						</Route>

						<Route path="/getDiscussion">
							<DiscussionStudent></DiscussionStudent>
						</Route>

						<Route path="/">
							<Home></Home>
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	)
}

export default App;
