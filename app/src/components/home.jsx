import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import homeImage from '../img/home.png';

export default class Home extends Component {
  render(){
    return (
      [
        <div></div>,
        <div class="content">
          <img src={homeImage} />
          <h1>Hi from home component</h1>
          <Link to="/pathToOtherComponent">Go to OtherComponent</Link>
        </div>,
        <div></div>
      ]);
  }
}