import React, { Component } from 'react';
import imgTile from '../img/tile.png';

class Video extends Component {

  constructor(props){
    super(props);

    this.state = {
      status: 'ok',
      error: null
    };
    this.video = null;
  }

  handleVideo (video,stream) {
    video.src = window.URL.createObjectURL(stream);
    video.onloadedmetadata = function(e) {
       console.log('do something with the video')
    };
  }

  handleError = (e) => {
    const error = e.name == 'DevicesNotFoundError' ? 'Device not found, please check if your mobile,pc or laptop have an active cam' : 'Permission denied, you have denied to the browser to access to your cam';
    this.setState({ ...this.state, status:'error',error: error});
  }

  handleResize = () => {
    //USELESS (reconsider delete this event)
    // console.log(window.innerWidth);
    // if(window.innerWidth < 767){
    //   this.video.style.width = 380;
    //   this.video.style.height = 520;
    //   this.video.width = 380;
    //   this.video.height = 520;
    // }
    // else{
    //   this.video.style.width = 640;
    //   this.video.style.height = 480;
    //   this.video.width = 640;
    //   this.video.height = 480;
    // }
  }

  componentDidMount () {
    this.video = this.refs.cam;

    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { 
          video: {
            width: this.video.offsetWidth ,
            height: this.video.offsetHeight 
          },
          audio: false
        },
        this.handleVideo.bind(this,this.video),
        this.handleError
      );
    } 

    window.addEventListener("resize", this.handleResize);
  }
  
  render(){
    const {w,h} = this.props;
    const {status,error} = this.state;
    const stl = {backgroundColor:'#D9DFDF',width:`100%`,height:`100%`};
    return (
      <div style={{backgroundImage: `url(${imgTile})`}} ref="container" className="videoContainer">
        { 
          status == 'ok' ?
          <video className="video" autoPlay="autoplay" ref="cam" style={stl}></video>
          :
          <div className="video" style={stl}>{error}</div>
        }
      </div>)
  }
}

export default Video