import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Video from './video';
import Button from './button';

class CamTest extends Component {

  constructor(props){
    super(props);
    this.props.setConfigOptions([]);
  }  

  render(){
    return (
      [
        <Button text="Back to menu" img="back.svg" link="" key="button"/>,
        <Video key="video"/>
      ]
    )
  }

  static propTypes = {
    setConfigOptions: PropTypes.func
  }
}

export default withRouter(CamTest)