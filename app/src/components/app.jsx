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

const LoadablePokemon = Loadable({
  loader: () => import(
     /* webpackChunkName: "chunk_pokemon" */
    './pokemon.jsx'),
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
                  <Route path="/pokemon/:name" component={LoadablePokemon}/>
                </Switch>
              </BrowserRouter>
            ]);
  }
}