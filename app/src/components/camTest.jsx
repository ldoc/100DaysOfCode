import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Video from './video';

class CamTest extends Component {
  render(){
    return (
      <Video w={640} h={480}/>
    )
  }
}

export default withRouter(CamTest)