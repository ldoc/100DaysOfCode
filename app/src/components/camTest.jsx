import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import Video from './video';

class CamTest extends Component {
  render(){
    return (
      <Video w={600} h={600}/>
    )
  }
}

export default withRouter(CamTest)