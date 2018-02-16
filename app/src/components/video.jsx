import React, { Component } from 'react';
import PropTypes from 'prop-types';
import imgTile from '../img/tile.png';
import '../css/video.css';

class Video extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: 'ok',
      error: null,
      device: 'mobile'
    };

    this.video = null;
    this.canvas = null;
    this.context = null;
  }

  handleVideo (video,stream) {
    video.src = window.URL.createObjectURL(stream);
    if(this.props.renderToCanvas) this.initCanvas();
    video.onloadedmetadata = function(e) {
       console.log('do something with the video')
    };
  }

  handleError = (e) => {
    const error = e.name == 'DevicesNotFoundError' ? 'Device not found, please check if your mobile,pc or laptop have an active cam' : 'Permission denied, you have denied to the browser to access to your cam';
    this.setState({ ...this.state, status:'error',error: error});
  }

  handleResize = () => {
    if(window.innerWidth > 767 && this.state.device == 'mobile'){
      this.setState({...this.state,device:'pc'});
    }
    else if(window.innerWidth <= 767 && this.state.device == 'pc'){
      this.setState({...this.state,device:'mobile'});
    }
  }

  initVideo = () => {
    this.video = this.refs.cam;

    if (this.video && navigator.getUserMedia) {
      navigator.getUserMedia(
        { 
          video: {
            width: 1280 ,
            height: 720
          },
          audio: false
        },
        this.handleVideo.bind(this,this.video),
        this.handleError
      );
    } 
  }

  initCanvas = () => {
    this.canvas = this.refs.canvas;
    this.context = this.canvas.getContext('2d');
    if (this.video && this.video.videoWidth) {
      this.context.width = this.video.videoWidth;
      this.context.height = this.video.videoHeight;
    }
    this.drawToCanvas();
  }

  drawToCanvas = () =>{
    if(this.context.canvas){
      this.requestAnimationFrame(this.drawToCanvas);
      this.props.canvasFn(this.context,this.video);
    }
  }

  requestAnimationFrame = (window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(f){
      return setTimeout(f, 1000/60)
    }).bind(window);

  componentDidUpdate () {
    if(window.innerWidth > 767 && this.state.device == 'mobile'){
      this.setState({...this.state,device:'pc'});
    }
    else if(window.innerWidth <= 767 && this.state.device == 'pc'){
      this.setState({...this.state,device:'mobile'});
    }
    this.initVideo();
  }
  
  componentDidMount () {
    this.initVideo();
    window.addEventListener("resize", this.handleResize);
  }

  render(){
    const {status,error} = this.state;
    const {renderToCanvas} = this.props;
    const stlVideo = {display:(renderToCanvas?'none':'block')};
    const stlCanvas = {display:(renderToCanvas?'block':'none')};

    return (
      <div style={{backgroundImage: `url(${imgTile})`}} ref="container" className="videoContainer">
        { 
          status == 'ok' ?
          renderToCanvas ?
            [ 
              <video className="video" autoPlay="autoplay" ref="cam" style={stlVideo} key="video"></video>,
              <canvas className="video" ref="canvas" style={stlCanvas} key="canvas" width={this.state.device == 'pc' ? 640:380} height={this.state.device == 'pc' ? 480:520}></canvas>
            ]
            :
            <video className="video" autoPlay="autoplay" ref="cam" style={stlVideo}></video>  
          :
          <div className="video">{error}</div>
        }
      </div>)
  }

  static propTypes = {
    renderToCanvas: PropTypes.bool,
    canvasFn: PropTypes.func
  }
}

export default Video