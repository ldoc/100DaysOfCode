import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Video from './video';
import Button from './button';

class CamTestCanvas extends Component {

  constructor(props){
    super(props);
    this.state ={
      fn: this.doNothing
    }
    this.props.setConfigOptions([
      {
        id: 1,
        text: 'Change to Red',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.changeColor(context,video,[255,0,0])})}
      },
      {
        id: 2,
        text: 'Change to Green',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.changeColor(context,video,[0,255,0])})}
      },
      {
        id: 3,
        text: 'Change to Blue',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.changeColor(context,video,[0,0,255])})}
      },
      {
        id: 4,
        text: 'Change to Gray Scale',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.changeColor(context,video,[130,130,130])})}
      },
      {
        id: 5,
        text: 'Clear color',
        action: () => {this.setState({...this.state, fn:this.doNothing})}
      }
    ]);
  }
  doNothing = (context,video) =>{
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
  }

  changeColor = (context,video,color) => {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    var pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height),
        i = 0,
        brightness;
    for (; i < pixels.data.length; i += 4) {
      brightness = ((3*pixels.data[i]+4*pixels.data[i+1]+pixels.data[i+2])>>>3) / 256;
      pixels.data[i] = ((color[0] * brightness)+0.5)>>0;
      pixels.data[i+1] = ((color[1]  * brightness)+0.5)>>0
      pixels.data[i+2] = ((color[2]  * brightness)+0.5)>>0
    }
    context.putImageData(pixels, 0, 0);
  }

  render(){
    return (
      [
        <Button text="Back to menu" img="back.svg" link="" key="button"/>,
        <Video renderToCanvas={true} canvasFn={this.state.fn} key="video"/>
      ]
    )
  }
  
  static propTypes = {
    setConfigOptions: PropTypes.func
  }
}

export default withRouter(CamTestCanvas)