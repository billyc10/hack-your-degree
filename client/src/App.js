import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

function Page1() {
  return (
    <div> 
      Hello this is page 1
    </div>
  );
}

function Page2() {
  return (
    <div> 
      Hello this is page 2
    </div>
  );
}

function Page3() {
  return (
    <div> 
      Hello this is page 3
    </div>
  );
}

function Prompt() {
  	return (
    	<div className = "PromptComponent">
         	<div className = "Prompt">
          		THIS IS THE DISCUSSION PROMPT
        	</div>
			<div className = "Image">
				This is where the image will go
			</div>
        </div>
  	);
}

function Home() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div> Welcome to the home page </div>
        
        
      </header>
    </div>
  );
  
}

function App() {
  return(
    <div>
       <Router>
          <Link to="/"> Home Page </Link>
		  <Link to="/prompt"> Prompt </Link>
          <Link to="/page1">Page 1</Link>
          <Link to="/page2">Page 2</Link>
          <Link to="/page3">Page 3</Link>
          <Link to="/multiplePages"> Show Page 2 and Page 3</Link>

          <Switch>

		  	<Route path="/prompt">
              <Prompt></Prompt>
            </Route>

          	<Route path="/multiplePages">
              <Page1></Page1>
              <Page3></Page3>
            </Route>

            <Route path="/page1">
              <Page1></Page1>
            </Route>

            <Route path="/page2">
              <Page2></Page2>
            </Route>

            <Route path="/page3">
              <Page3></Page3>
            </Route>

            <Route path="/">
              <Home></Home>
            </Route>
          </Switch>
        
        </Router>
    </div>
  )
 
}

export default App;
