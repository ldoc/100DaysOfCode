# Day 13
## (20 January 2018)

* Today I have started to see the getUserMedia navigator api that allow to access to the device cam

* I have created a specific component (Video) to control the HTML5 video element

```javascript
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
```

* Then I can add it into any page component

```javascript
class CamTest extends Component {
  render(){
    return (
      <Video w={600} h={600}/>
    )
  }
}
```

* Tomorrow I have to see some issues with element style

#### That's all folks,look at the commit for more info: https://github.com/ldoc/100DaysOfCode/commit/6b4e19f782f2a05dc58a15769ebafadb193236a0
