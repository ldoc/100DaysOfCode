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
      {step: 1, text: 'Choose a color touching or making click into the cam video', fn: this.step_one},
      {step: 2, text: 'Choose an image', fn: this.step_two}
    ]

    this.cursorPos = {x:0,y:0};
    this.cursorPosColor = [];
  }

  componentDidUpdate (prevProps, prevState) {
    
    if(this.state.currentStep == 1 && prevState.currentStep == 0){
      const canvas = this.refs.video.refs.canvas;
      this.fMouseMove = this.handleMouseMove.bind(null,canvas);
      this.fClick = this.handleClick.bind(null,canvas);
      canvas.addEventListener('mousemove',this.fMouseMove,true);
      canvas.addEventListener('click',this.fClick,true);
    }
    else if(this.state.currentStep == 2 && prevState.currentStep == 1){
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
    reader.onload = (e) => {console.log(e.target.result)}
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
  
  step_zero = (context,video) =>{
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    this.addText(context,this.steps[this.state.currentStep].text);
  }

  step_one = (context,video) =>{
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    this.addText(context,this.steps[this.state.currentStep].text);
    this.addRect(context);
  }

  step_two = (context,video) =>{
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    this.addText(context,this.steps[this.state.currentStep].text);
    this.addRect(context);
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