import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from './logo.jsx'
import ConfigMenu from './configMenu.jsx'

export default class MenuBar extends Component {
  render(){
    return (
      <div className={"header"}>
        <Logo/>
        <span></span>
        <ConfigMenu options={this.props.options} key={"Menu"}/>
      </div>
    );
  }

  static propTypes = {
    options: PropTypes.array
  }
}