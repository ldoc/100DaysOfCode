import React, {Component} from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import './style.css';

const LoadableHome = Loadable({
  loader: () => import(
    /* webpackChunkName: "chunk_home" */
    './components/home.jsx'),
  loading() {
    return <div>Loading...</div>
  }
});

const LoadableOtherComponent = Loadable({
  loader: () => import(
     /* webpackChunkName: "chunk_otherComponent" */
    './components/otherComponent.jsx'),
  loading() {
    return <div>Loading...</div>
  }
});

class App extends Component {
  render () {
    return  <BrowserRouter>
              <Switch>
                <Route exact path="/" component={LoadableHome}/>
                <Route path="/pathToOtherComponent" component={LoadableOtherComponent}/>
              </Switch>
            </BrowserRouter>;
  }
}

render(<App/>, document.getElementById('app'));