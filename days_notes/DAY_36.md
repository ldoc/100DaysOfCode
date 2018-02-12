# Day 36
## (12 February 2018)

* Light session: preparing the UI for the chroma mini app option

* Furthermore I have separated the routes to a new file

```javascript
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
```

#### That's all folks,look at the commit for more info: https://github.com/ldoc/100DaysOfCode/commit/

