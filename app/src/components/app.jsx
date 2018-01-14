import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import MenuBar from './menuBar';
import '../css/app.css';

const LoadableHome = Loadable({
  loader: () => import(
    /* webpackChunkName: "chunk_home" */
    './home.jsx'),
  loading() {
    return <div>Loading...</div>
  }
});

const LoadableOtherComponent = Loadable({
  loader: () => import(
     /* webpackChunkName: "chunk_otherComponent" */
    './otherComponent.jsx'),
  loading() {
    return <div>Loading...</div>
  }
});

export default class App extends Component {
  render () {
    return  ([
              <MenuBar/>,
              <BrowserRouter >
                <Switch>
                  <Route exact path="/" component={LoadableHome}/>
                  <Route path="/pathToOtherComponent" component={LoadableOtherComponent}/>
                </Switch>
              </BrowserRouter>
            ]);
  }
}