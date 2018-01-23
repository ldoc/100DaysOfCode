import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Video from './video';
import Button from './button';

class CamTest extends Component {
  render(){
    return (
      [
        <Button text="Back to menu" img="back.svg" link=""/>,
        <Video w={640} h={480}/>
      ]
    )
  }
}

export default withRouter(CamTest)