import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Video from './video';
import Button from './button';

class Chroma extends Component {

  constructor(props){
    super(props);
    this.state ={
  
    }

    this.optionsMenu = [
      {
        id: 1,
        text: 'Choose chroma color',
        action: () => {},
        keepOpen: true
      },
      {
        id: 2,
        text: 'Choose chroma image',
        action: () => {},
        keepOpen: true
      },
      {
        id: 3,
        text: 'Adjust tolerance',
        action: () => {},
        keepOpen: true
      }
    ];

    this.props.setConfigOptions(this.optionsMenu);
  }

  noChroma = (context,video) =>{
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
  }

  render(){
    return (
      [
        <Button text="Back to menu" img="back.svg" link="" key="button"/>,
        <Video renderToCanvas={true} canvasFn={this.noChroma} key="video"/>
      ]
    )
  }
  
  static propTypes = {
    setConfigOptions: PropTypes.func
  }
}

export default withRouter(Chroma)