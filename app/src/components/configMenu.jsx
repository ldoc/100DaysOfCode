import React, { Component } from 'react';

export default class ConfigMenu extends Component {
  render(){
    return (
      <svg x="0" y="0" width="60" height="60" float="right" className="config">
        <line x1="4" y1="10" x2="56" y2="10" className="line"/>
        <line x1="4" y1="30" x2="56" y2="30" className="line"/>
        <line x1="4" y1="50" x2="56" y2="50" className="line"/>
      </svg>
    );
  }
}