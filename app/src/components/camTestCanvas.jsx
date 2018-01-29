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

    this.optionsMenu = [
      {
        id: 1,
        text: 'Colors',
        action: () => this.changeConfigMenu(this.optionsColor),
        keepOpen: true
      },
      {
        id: 2,
        text: 'Effects',
        action: () => this.changeConfigMenu(this.optionsEffects),
        keepOpen: true
      }
    ];

    this.optionsColor = [
      {
        id: 1,
        text: 'Change to Red',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.changeColor(context,video,[255,0,0])});this.changeConfigMenu(this.optionsMenu);}
      },
      {
        id: 2,
        text: 'Change to Green',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.changeColor(context,video,[0,255,0])});this.changeConfigMenu(this.optionsMenu);}
      },
      {
        id: 3,
        text: 'Change to Blue',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.changeColor(context,video,[0,0,255])});this.changeConfigMenu(this.optionsMenu);}
      },
      {
        id: 4,
        text: 'Change to Gray Scale',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.changeColor(context,video,[130,130,130])});this.changeConfigMenu(this.optionsMenu);}
      },
      {
        id: 5,
        text: 'Clear color',
        action: () => {this.setState({...this.state, fn:this.doNothing});this.changeConfigMenu(this.optionsMenu);}
      }
    ]

    this.optionsEffects = [
      {
        id: 1,
        text: 'Mirror',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.mirror(context,video)});this.changeConfigMenu(this.optionsMenu);}
      }
    ]

    this.props.setConfigOptions(this.optionsMenu);
  }

  changeConfigMenu = (options) => {
    this.props.setConfigOptions(options);
  }

  doNothing = (context,video) =>{
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
  }

  changeColor = (context,video,color) => {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    let pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height),
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

  mirror = (context,video) => {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    let pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    const w = pixels.width;
    const h = pixels.height;
    for(let y = 0; y < h; y++) {
      for(let x = 0; x < w / 2; x++) { 
        let off = ((w * y) + x) * 4; 

        let r = pixels.data[off];
        let g = pixels.data[off + 1];
        let b = pixels.data[off + 2];
        let a = pixels.data[off + 3];

        let mirroroff = (w - (x * 2)) * 4;

        pixels.data[off + mirroroff] = r;
        pixels.data[off + 1 + mirroroff] = g;
        pixels.data[off + 2 + mirroroff] = b;
        pixels.data[off + 3 + mirroroff] = a;
      }
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