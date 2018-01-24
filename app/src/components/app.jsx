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

const LoadableCamTest = Loadable({
  loader: () => import(
     /* webpackChunkName: "chunk_camtest" */
    './camTest.jsx'),
  loading() {
    return <div>Loading...</div>
  }
});

const LoadableCamTestCanvas = Loadable({
  loader: () => import(
     /* webpackChunkName: "chunk_camtestcanvas" */
    './camTestCanvas.jsx'),
  loading() {
    return <div>Loading...</div>
  }
});

export default class App extends Component {
  render () {
    return  ([
              <MenuBar  key={'menu'}/>,
              <BrowserRouter  key={'router'}>
                <Switch>
                  <Route exact path="/" component={LoadableHome}/>
                  <Route path="/camtest/" component={LoadableCamTest}/>
                  <Route path="/camtestcanvas/" component={LoadableCamTestCanvas}/>
                </Switch>
              </BrowserRouter>
            ]);
  }
}