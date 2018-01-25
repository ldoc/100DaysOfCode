# Day 18
## (25 January 2018)

* I have created a tools folder and a canvasTools file where to add helper functions

* I have continued playing with canvas pixels modifications for different colors

```javascript
  class CamTestCanvas extends Component {

  constructor(props){
    super(props);
    this.state ={
      fn: this.doNothing
    }
  }
  doNothing = (context,video) =>{
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
  }

  changeColor = (context,video,color) => {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    var pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height),
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

  render(){
    return (
      [
        <Button text="Back to menu" img="back.svg" link="" key="button"/>,
        <Video renderToCanvas={true} canvasFn={this.state.fn} key="video"/>,
        <div key="options">
          <input type="button" value="Change to Red" onClick={() => {this.setState({...this.state, fn:(context,video)=>this.changeColor(context,video,[255,0,0])})}}/>
          <input type="button" value="Change to Green" onClick={() => {this.setState({...this.state, fn:(context,video)=>this.changeColor(context,video,[0,255,0])})}}/>
          <input type="button" value="Change to Blue" onClick={() => {this.setState({...this.state, fn:(context,video)=>this.changeColor(context,video,[0,0,255])})}}/>
          <input type="button" value="Change to Gray Scale" onClick={() => {this.setState({...this.state, fn:(context,video)=>this.changeColor(context,video,[130,130,130])})}}/>
          <input type="button" value="Clear color" onClick={() => {this.setState({...this.state, fn:this.doNothing})}}/>
        </div>
      ]
    )
  }
}
```
* Next days I have to create a button options menus to launch actions.

#### That's all folks,look at the commit for more info: https://github.com/ldoc/100DaysOfCode/commit/ffdaf86bcceb899611e17cbb6c0ae38836c1df05
