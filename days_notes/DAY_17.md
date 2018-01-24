# Day 17
## (24 January 2018)

* Today I have extended video functionality to allow render the cam image to a canvas element

* I have created to properties that control if the video element have to be render as video or as canvas:

```javascript
  static propTypes = {
    renderToCanvas: PropTypes.bool,
    canvasFn: PropTypes.func
  }
```

* When I instance a video component with this properties:

```javascript
  <Video renderToCanvas={true} canvasFn={this.editVideo} key="video"/>
```

* The render function set the video display to none but it will exist in background

```javascript
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
              <canvas className="video" ref="canvas" style={stlCanvas} key="canvas"></canvas>
            ]
            :
            <video className="video" autoPlay="autoplay" ref="cam" style={stlVideo}></video>  
          :
          <div className="video">{error}</div>
        }
      </div>)
  }
```

* The canvas and the context is initialized inside the component life cycle, and the function (canvasFn) passed as prop will be executed in the requestAnimationFrame, this way we can interact with video pixels loop.

```javascript
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
    window.requestAnimationFrame(this.drawToCanvas);
    this.props.canvasFn(this.context,this.video);
  }

  componentDidUpdate () {
    this.initVideo();
    if(this.props.renderToCanvas) this.initCanvas();
  }
  
  componentDidMount () {
    this.initVideo();
    if(this.props.renderToCanvas) this.initCanvas();
    window.addEventListener("resize", this.handleResize);
  }
```

* I have used an adaption of a function that changes the pixels to a concrete color range from the [Tab Atkins canvas tutorial](http://html5doctor.com/video-canvas-magic/)

```javascript
   editVideo = (context,video) => {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    var pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height),
        i = 0,
        brightness;
  
    for (; i < pixels.data.length; i += 4) {
      brightness = ((3*pixels.data[i]+4*pixels.data[i+1]+pixels.data[i+2])>>>3) / 256;
  
      pixels.data[i] = ((0 * brightness)+0.5)>>0;
      pixels.data[i+1] = ((200 * brightness)+0.5)>>0
      pixels.data[i+2] = ((0 * brightness)+0.5)>>0
    }
    context.putImageData(pixels, 0, 0);
  }
```

#### That's all folks,look at the commit for more info: https://github.com/ldoc/100DaysOfCode/commit/1297e2a092c028a8c16345b730792381991bbf14
