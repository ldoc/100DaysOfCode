import React, {Component} from 'react';
import { HashRouter , Switch } from 'react-router-dom';
import Routes from './routes';
import MenuBar from './menuBar';
import '../css/app.css';

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
              <HashRouter outer key={'router'}>
                <Switch>
                  {Routes(this.setConfigOptions)}
                </Switch>
              </HashRouter>
            ]);
  }
}