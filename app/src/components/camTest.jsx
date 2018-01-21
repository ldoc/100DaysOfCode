import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Video from './video';

class CamTest extends Component {
  render(){
    return (
      <Video/>
    )
  }
}

export default withRouter(CamTest)