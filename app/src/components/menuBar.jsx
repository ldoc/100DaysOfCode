import React, { Component } from 'react';
import Logo from './logo.jsx'
import ConfigMenu from './configMenu.jsx'

export default class MenuBar extends Component {
  render(){
    return (
      <div className={"header"}>
        <Logo/>
        <span></span>
        <ConfigMenu />
      </div>
    );
  }
}