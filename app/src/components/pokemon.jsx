import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';

class Pokemon extends Component {
  render(){
    const name = this.props.match.params.name;
    return (
      <div style={{backgroundColor:'white'}}>
        <h1>{`Hi from pokemon ${name}`}</h1>
        <Link to="/">Back to home menu</Link>
      </div>)
  }
}

export default withRouter(Pokemon)