import React, { Component } from 'react';

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
    this.setState({ ...this.state, status:'error',error: e.name});
  }

  componentDidMount () {
    this.video = this.refs.cam;
    const width = this.refs.container.offsetWidth;
    const height = this.refs.container.offsetHeight;
    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { 
          video: {
            width: width,
            height: height 
          }
        },
        this.handleVideo.bind(this,this.video),
        this.handleError
      );
    } 
  }
  
  render(){
    const {status,error} = this.state;
    return (
      <div style={{backgroundColor:'gray'}} ref="container" className="videoContainer">
        { 
          status == 'ok' ?
          <video id="video" className="video" autoPlay="autoplay" ref="cam"></video>
          :
          <div>{error}</div>
        }
      </div>)
  }
}

export default Video