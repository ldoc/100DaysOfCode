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
        action: () => {this.setState({currentStep: 1})},
        keepOpen: true
      },
      {
        id: 2,
        text: 'Choose chroma image',
        action: () => {this.setState({currentStep: 2})},
        keepOpen: true
      },
      {
        id: 3,
        text: 'Increase tolerance',
        action: () => {this.tolerance += 10;},
        keepOpen: true
      },
      {
        id: 4,
        text: 'Reduce tolerance',
        action: () => {this.tolerance -= 10;},
        keepOpen: true
      }
    ];

    this.props.setConfigOptions(this.optionsMenu);
    
    setTimeout(() => this.setState({currentStep: 1}), 3000);
    
    this.steps = [
      {step: 0, text: 'Hi welcome to chroma app', fn: this.step_zero},
      {step: 1, text: 'Choose a color touching or making click into the cam video', fn: this.step_one},
      {step: 2, text: 'Choose an image', fn: this.step_two},
      {step: 3, text: '', fn: this.step_three}
    ]

    this.cursorPos = {x:0,y:0};
    this.cursorPosColor = [];
    this.tolerance = 60;
  }

  componentDidUpdate (prevProps, prevState) {
    
    if(this.state.currentStep == 1 && prevState.currentStep != 1){
      const canvas = this.refs.video.refs.canvas;
      this.fMouseMove = this.handleMouseMove.bind(null,canvas);
      this.fClick = this.handleClick.bind(null,canvas);
      canvas.addEventListener('mousemove',this.fMouseMove,true);
      canvas.addEventListener('click',this.fClick,true);
    }
    else if(this.state.currentStep == 2 && prevState.currentStep != 2){
      const canvas = this.refs.video.refs.canvas;
      canvas.removeEventListener('click', this.fClick, true);
      this.refs.selImg.click();
      this.refs.selImg.onchange = this.handleGetImage;
    }
  }

  handleMouseMove = (canvas,e) => {
    this.pos = this.getEventLocation(canvas,e);
    this.cursorPosColor = canvas.getContext('2d').getImageData(this.pos.x, this.pos.y, 1, 1).data; 
  }

  handleClick = (canvas,e) => {
    canvas.removeEventListener('mousemove', this.fMouseMove, true);
    this.setState({currentStep: 2});
  }

  handleGetImage = (e) => {
    const file = e.target.files[0]; 

    if (!file.type.match('image.*')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.bgImage = new Image();
      this.bgImage.onload = () =>{
        this.setState({currentStep: 3, cursorPosColor: this.cursorPosColor});
      }
      this.bgImage.src = e.target.result;
      
    }
    reader.readAsDataURL(file);
  }

  addText = (c,text) => {
    c.font = "14px Arial"
    c.strokeStyle = 'black';
    c.lineWidth = 3;
    c.strokeText(text, 10, 20);
    c.fillStyle = 'yellow';
    c.fillText(text, 10, 20);
  }

  addRect = (c) => {
    c.rect(40,40,20,20);
    c.fillStyle = `rgba(${this.cursorPosColor[0]}, ${this.cursorPosColor[1]}, ${this.cursorPosColor[2]}, ${this.cursorPosColor[3]})`;
    c.stroke();
    c.fill();
  }
  
  step_zero = (context,video) => {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    this.addText(context,this.steps[this.state.currentStep].text);
  }

  step_one = (context,video) => {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    this.addText(context,this.steps[this.state.currentStep].text);
    this.addRect(context);
  }

  step_two = (context,video) => {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    this.addText(context,this.steps[this.state.currentStep].text);
    this.addRect(context);
  }

  step_three = (context,video) => {
    // The color key
    const cCatch = this.state.cursorPosColor;
    const cw = context.canvas.width, ch = context.canvas.height, vw = video.videoWidth, vh = video.videoHeight;
    // Getting video image
    context.drawImage(video, 0, 0, vw, vh , 0, 0, cw, ch);
    let vPixels = context.getImageData(0, 0, cw, ch);
    context.clearRect(0, 0, cw, ch);

     // Getting bg image
    context.drawImage(this.bgImage, 0, 0, cw, ch);
    let bgPixels = context.getImageData(0, 0, cw, ch);
    context.clearRect(0, 0, cw, ch);

    // Replacing video pixels that are beetween color and tolerance limits for pixels from background image 
    for (let i=0; i < vPixels.data.length; i += 4) {
      if( vPixels.data[i]   >= cCatch[0] - this.tolerance && vPixels.data[i]   <= cCatch[0] + this.tolerance  &&
          vPixels.data[i+1] >= cCatch[1] - this.tolerance && vPixels.data[i+1] <= cCatch[1] + this.tolerance  && 
          vPixels.data[i+2] >= cCatch[2] - this.tolerance && vPixels.data[i+2] <= cCatch[2] + this.tolerance)
      {
        vPixels.data[i] = bgPixels.data[i];
        vPixels.data[i+1] = bgPixels.data[i+1];
        vPixels.data[i+2] = bgPixels.data[i+2];
        vPixels.data[i+3] = bgPixels.data[i+3];
      } 
    }

    // Paint !!
    context.putImageData(vPixels, 0, 0);
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
        <Video renderToCanvas={true} canvasFn={this.steps[this.state.currentStep].fn} key="video" ref="video"/>,
        <input name="myFile" type="file" style={{display:'none'}} key="selImg" ref="selImg"/>
      ]
    )
  }
  
  static propTypes = {
    setConfigOptions: PropTypes.func
  }
}

export default withRouter(Chroma)