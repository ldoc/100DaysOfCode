import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class OtherComponent extends Component {
  render(){
    return (
      <div>
        <h1>Hi from other component</h1>
        <Link to="/">Go to sweet home</Link>
      </div>
    );
  }
}
