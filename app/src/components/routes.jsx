import React from 'react';
import {Route} from 'react-router-dom';
import Loadable from 'react-loadable';

const LoadableHome = Loadable({
  loader: () => import(
    './home.jsx'),
  loading() {
    return <div>Loading...</div>
  }
});

const LoadableCamTest = Loadable({
  loader: () => import(
    './camTest.jsx'),
  loading() {
    return <div>Loading...</div>
  }
});

const LoadableCamTestCanvas = Loadable({
  loader: () => import(
    './camTestCanvas.jsx'),
  loading() {
    return <div>Loading...</div>
  }
});

const LoadableChroma = Loadable({
  loader: () => import(
    './chroma.jsx'),
  loading() {
    return <div>Loading...</div>
  }
});

const Routes = (setConfigOptions) => (
  [
    <Route exact path="/" component={LoadableHome} key='home'/>,
    <Route path="/camtest/" render={(props) => (<LoadableCamTest {...props} setConfigOptions = {setConfigOptions} />)} key='camTest'/>,
    <Route path="/camtestcanvas/"  render={(props) => (<LoadableCamTestCanvas {...props} setConfigOptions = {setConfigOptions}/>)}  key='camTestCanvas'/>,
    <Route path="/chroma/"  render={(props) => (<LoadableChroma {...props} setConfigOptions = {setConfigOptions}/>)}  key='chroma'/>
  ].map((r)=>r)
);

export default Routes;