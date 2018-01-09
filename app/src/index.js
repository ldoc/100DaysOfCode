import React, {Component} from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Route, Switch, Link  } from 'react-router-dom';
import './style.css';
import homeImage from './img/home.png';

class Home extends Component {
  render(){
      return (
        <div>
          <img src={homeImage} />
          <h1>Hi from home component</h1>
          <Link to="/pathToOtherComponent">Go to OtherComponent</Link>
        </div>
      );
  }
}

class OtherComponent extends Component {
  render(){
      return (
        <div>
          <h1>Hi from other component</h1>
          <Link to="/">Go to sweet home</Link>
        </div>
      );
  }
}

class App extends Component {
  render () {
    return  <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/pathToOtherComponent" component={OtherComponent}/>
              </Switch>
            </BrowserRouter>;
  }
}

render(<App/>, document.getElementById('app'));