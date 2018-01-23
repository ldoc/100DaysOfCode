# Day 16
## (23 January 2018)

* Today I started finishing responsive beahavior adding a state change when screen width go down under or go up of 767 px

```javascript
// in the constructor
 this.state = {
      status: 'ok',
      error: null,
      device: 'mobile'
    };

// after the component is mounted I listen for screen size changes

componentDidMount () {
    ...
    window.addEventListener("resize", this.handleResize);
  }

// And check for mobile to desktop or desktop to mobile changes

handleResize = () => {
  if(window.innerWidth > 767 && this.state.device == 'mobile'){
    this.setState({...this.state,device:'pc'});
  }
  else if(window.innerWidth <= 767 && this.state.device == 'pc'){
    this.setState({...this.state,device:'mobile'});
  }
}

//The setState function will update the state, then in the componentDidMount event I set the video again
componentDidUpdate () {
    this.video = this.refs.cam;
  
    if (this.video && navigator.getUserMedia) {
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
  }

```

* Furthermore, I have created a responsive button element to back to main menu and I have reorganized some css elements to new files

#### That's all folks,look at the commit for more info: https://github.com/ldoc/100DaysOfCode/commit/
