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

  constructor(props){
    super(props);
    this.state = {
      options : []
    }
  }

  setConfigOptions = (options) =>{
    this.setState({...this.state,...{options:options}});
  }  

  render () {
    return  ([
              <MenuBar key={'menu'} {...this.state}/>,
              <BrowserRouter key={'router'}>
                <Switch>
                  <Route exact path="/" component={LoadableHome}/>
                  <Route path="/camtest/" render={(props) => (<LoadableCamTest {...props} setConfigOptions = {this.setConfigOptions} />)}/>
                  <Route path="/camtestcanvas/"  render={(props) => (<LoadableCamTestCanvas {...props} setConfigOptions = {this.setConfigOptions} />)}/>
                </Switch>
              </BrowserRouter>
            ]);
  }
}