import React, { Component } from 'react';

class Video extends Component {

  constructor(props){
    super(props);
  }

  handleVideo (stream) {
    video.src = window.URL.createObjectURL(stream);
    video.onloadedmetadata = function(e) {
       console.log('do something with the video')
    };
  }

  handleError (e) {
    console.log(e);
  }

  componentDidMount () {
    const {w,h} = this.props;
    let video = this.refs.cam;
    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { 
          video: {
            width: w,
            height: h 
          }
        },
        this.handleVideo,
        this.handleError
      );
    } 
  }
  
  render(){
    const {w,h} = this.props;
    return (
      <div width= {w} height={h}>
        <video id="video" width={w} height={h} autoPlay="autoplay" ref="cam"></video>
      </div>)
  }
}

export default Video