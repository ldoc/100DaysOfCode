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
      },
      {
        id: 3,
        text: 'Shapes',
        action: () => this.changeConfigMenu(this.optionsShapes),
        keepOpen: true
      },
      {
        id: 4,
        text: 'Transform and Anim',
        action: () => this.changeConfigMenu(this.optionsTranfAnim),
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

    this.optionsShapes = [
      {
        id: 1,
        text: 'Lines',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.lines(context,video)});this.changeConfigMenu(this.optionsMenu);}
      },
      {
        id: 2,
        text: 'Curves',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.curves(context,video)});this.changeConfigMenu(this.optionsMenu);}
      },
      {
        id: 3,
        text: 'Paths',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.paths(context,video)});this.changeConfigMenu(this.optionsMenu);}
      },
      {
        id: 4,
        text: 'Fill Styles',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.fillStyles(context,video)});this.changeConfigMenu(this.optionsMenu);}
      },
      {
        id: 5,
        text: 'Text and Images',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.textAndImages(context,video)});this.changeConfigMenu(this.optionsMenu);}
      }
    ]

    this.optionsTranfAnim = [
      {
        id: 1,
        text: 'Translate,Scale and Rotate',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.translate(context,video)});this.changeConfigMenu(this.optionsMenu);}
      }
    ]
    

    this.imgMountains = new Image();
    this.imgMountains.src = '../img/mountains.png';
    this.imgBanner = new Image();
    this.imgBanner.src = '../img/banner.png';
    this.imgEagle = new Image();
    this.imgEagle.src = '../img/eagle.png';


    this.moon = new Image();
    this.earth = new Image();
    
  
    this.moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
    this.earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';

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

  lines = (context,video) => {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    let pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height);

    const w = pixels.width;
    const h = pixels.height;

    context.putImageData(pixels, 0, 0);

    //Lets draw a grille

    const SEPARATION = 30;
    const LINEWIDTH = 4;
    const COLOR = 'gray';
    const BORDER = 'round';

    // Vertical lines
    for(let i= 0; i < w ; i+=SEPARATION) {
      context.beginPath();
      context.moveTo(i, SEPARATION );
      context.lineTo(i, h);
      context.strokeStyle = COLOR;
      context.lineCap = BORDER;
      context.lineWidth = LINEWIDTH;
      context.stroke();
    } 

    // Horizontal lines
    for(let j= SEPARATION * 2; j < h ; j+=SEPARATION) {
      context.beginPath();
      context.moveTo(0, j);
      context.lineTo(w, j);
      context.strokeStyle = COLOR;
      context.lineCap = BORDER;
      context.lineWidth = LINEWIDTH;
      context.stroke();
    } 
  }

  curves = (context,video) => {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    let pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    context.putImageData(pixels, 0, 0);

    //lets draw some birds

    context.strokeStyle = 'black';
    context.lineCap = 'round';
    context.lineWidth = 4;

    //with two arcs (x, y, radius, startAngle, endAngle, counterClockwise)
    context.beginPath();
    context.arc(40,40,10,1.1*Math.PI,1.9*Math.PI);
    context.arc(60,40,10,1.1*Math.PI,1.9*Math.PI);
    context.stroke();

    //with two quadratic curves (cpx,cpy,x,y)
    context.beginPath();
    context.moveTo(90,50);
    context.quadraticCurveTo(100,40,130,50);
    context.quadraticCurveTo(140,30,150,45);
    context.stroke();

    //with two bezier curves (cp1x,cp1y,cp2x,cp2y,x,y);
    context.beginPath();
    context.moveTo(180,25);
    context.bezierCurveTo(190,10,195,10,200,20);
    context.bezierCurveTo(215,8,222,10,228,15);
    context.stroke();
  }

  paths = (context,video) => {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    let pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    context.putImageData(pixels, 0, 0);

    //lets draw a star
    context.strokeStyle = 'yellow';
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(250, 50);
    context.lineTo(260,30);
    context.lineTo(270,50);
    context.lineTo(290,60);
    context.lineTo(270,70);
    context.lineTo(260,90);
    context.lineTo(250,70);
    context.lineTo(230,60);
    context.closePath();
    context.stroke();

    //lets draw a cloud
    context.beginPath();
    context.moveTo(60, 40);
    context.bezierCurveTo(70, 50, 60, 70, 110, 70);
    context.bezierCurveTo(120, 90, 140, 90, 150, 70);
    context.bezierCurveTo(210, 70, 210, 60,200, 50);
    context.bezierCurveTo(220, 20, 180, 15, 170, 25);
    context.bezierCurveTo(150, 4, 100, 10, 120, 25);
    context.bezierCurveTo(100, 4, 70, 15,60, 40);

    // complete custom shape
    context.closePath();
    context.lineWidth = 5;
    context.fillStyle = '#8ED6FF';
    context.fill();
    context.strokeStyle = 'blue';
    context.stroke();
  }

  fillStyles = (context,video) => {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    let pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    context.putImageData(pixels, 0, 0);
    context.globalAlpha = 0.8
    //lets draw a sky with a linear gradient
    context.beginPath();
    context.rect(0, 0, context.canvas.width, context.canvas.height/2);
    let linGradient = context.createLinearGradient(0, 0,context.canvas.width, context.canvas.height/2);
    linGradient.addColorStop(0, 'lightblue');   
    linGradient.addColorStop(1, 'blue');
    context.fillStyle = linGradient;
    context.fill();
    
    //lets draw a sun with radial gradient
    context.beginPath();
    context.arc(100,45,20,0,2*Math.PI);
    let radGradient = context.createRadialGradient(238, 50, 10, 238, 50, 300);
    radGradient.addColorStop(0, 'orange');
    radGradient.addColorStop(1, 'red');
    context.fillStyle = radGradient;
    context.fill();

    //lets draw mountains with a image pattern
    context.beginPath();
    let pattern = context.createPattern(this.imgMountains, 'repeat');
    context.rect(0, 90, context.canvas.width, 90);
    context.fillStyle = pattern;
    context.fill();
  }

  textAndImages = (context,video) => {

    //This time dont draw the into the entire canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    //lets draw an banner image
    context.drawImage(this.imgBanner, 0, 0, context.canvas.width, context.canvas.height/2);

    //lets draw an eagle image scaled
    context.drawImage(this.imgEagle, 20, 15, this.imgEagle.width/2, this.imgEagle.height/2);

    //lets draw some text

    //Basic
    context.font = "20px Arial";
    context.fillText("Hello World",20,20);

    //Stroke text
    context.font = "28px Arial";
    context.lineWidth = 2;
    context.strokeText("Hello World",120,30);

    //Finally we gonna play with the video image drawing it in a frame
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 90, 90, 90, 70);
    let pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    context.putImageData(pixels, 0, 0);
    //The frame
    context.beginPath();
    context.rect(90, 90, 90, 70);
    context.lineWidth = 4;
    context.strokeStyle = 'black';
    context.stroke();
  }

 translate = (context,video) => {
 
  context.globalCompositeOperation = 'destination-over';
  context.clearRect(0,0,300,300); 

  context.save();
  context.translate(150,150);

  // the earth
  var time = new Date();
  context.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
  context.translate(105,0);
  context.drawImage(this.earth,-12,-12);

  // the moon
  context.save();
  context.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
  context.translate(0,28.5);
  context.drawImage(this.moon,-3.5,-3.5);
  context.restore();
  context.restore();
  
  context.beginPath();
  context.stroke();
  context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);

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