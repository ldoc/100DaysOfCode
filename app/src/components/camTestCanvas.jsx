import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Video from './video';
import Button from './button';

class CamTestCanvas extends Component {
  editVideo = (context,video) => {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    var pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height),
        i = 0,
        brightness;
  
    for (; i < pixels.data.length; i += 4) {
      // from Tab Atkins' canvas demos http://html5doctor.com/video-canvas-magic/
      brightness = ((3*pixels.data[i]+4*pixels.data[i+1]+pixels.data[i+2])>>>3) / 256;
  
      pixels.data[i] = ((0 * brightness)+0.5)>>0;
      pixels.data[i+1] = ((200 * brightness)+0.5)>>0
      pixels.data[i+2] = ((0 * brightness)+0.5)>>0
    }
    context.putImageData(pixels, 0, 0);
  }

  render(){
    return (
      [
        <Button text="Back to menu" img="back.svg" link="" key="button"/>,
        <Video renderToCanvas={true} canvasFn={this.editVideo} key="video"/>
      ]
    )
  }
}

export default withRouter(CamTestCanvas)