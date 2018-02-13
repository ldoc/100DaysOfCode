import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Video from './video';
import Button from './button';

class Chroma extends Component {

  constructor(props){
    super(props);

    this.state = {
      currentStep: 0
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
    
    setTimeout(() => this.setState({currentStep: 1}), 3000);
    
    this.steps = [
      {step: 0, text: 'Hi welcome to chroma app', fn: this.step_zero},
      {step: 1, text: 'Choose a color touching or making click into the cam video', fn: this.step_one}
    ]
  }

  componentDidUpdate (prevProps, prevState) {
    if(this.state.currentStep == 1 && prevState.currentStep == 0){
      const canvas = this.refs.video.refs.canvas;

      canvas.addEventListener("mousemove",(e) => {
        var eventLocation = this.getEventLocation(canvas,e);
        var coord = "x=" + eventLocation.x + ", y=" + eventLocation.y;
        var pixelData = canvas.getContext('2d').getImageData(eventLocation.x, eventLocation.y, 1, 1).data; 
        console.log(coord);
        console.log(pixelData);
      },false);
    }
  }

  addText = (c,text) => {
    c.font = "14px Arial"
    c.strokeStyle = 'black';
    c.lineWidth = 3;
    c.strokeText(text, 10, 20);
    c.fillStyle = 'yellow';
    c.fillText(text, 10, 20);
  }

  addRect = (c, color) => {
    c.rect(20,20,20,20);
    c.stroke();
  }
  
  step_zero = (context,video) =>{
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    this.addText(context,this.steps[this.state.currentStep].text);
  }

  step_one = (context,video) =>{
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    this.addText(context,this.steps[this.state.currentStep].text);
    this.addRect(context,null);
  }

  getElementPosition = (obj) => {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
      do {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);
      return { x: curleft, y: curtop };
    }
    return undefined;
  }

  getEventLocation = (element,event) => {
    var pos = this.getElementPosition(element);
    return {
        x: (event.pageX - pos.x),
        y: (event.pageY - pos.y)
    };
  }

  render(){
    return (
      [
        <Button text="Back to menu" img="back.svg" link="" key="button"/>,
        <Video renderToCanvas={true} canvasFn={this.steps[this.state.currentStep].fn} key="video" ref="video"/>
      ]
    )
  }
  
  static propTypes = {
    setConfigOptions: PropTypes.func
  }
}

export default withRouter(Chroma)