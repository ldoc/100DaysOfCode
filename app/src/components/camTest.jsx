import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';

class CamTest extends Component {
  render(){
    return (
      <div>
        <h1>CamTest</h1>
        <Link to="/">Back to home menu</Link>
      </div>)
  }
}

export default withRouter(CamTest)