# Day 14
## (21 January 2018)

* Today I have solved a problem with arrow functions that was´nt recognized into react component classes.

* Continuing with video element I have created an state to get status from video html element (status and message of a posible error)

```javascript
this.state = {
      status: 'ok',
      error: null
    };
```

* Then in render function I show the video element or a error message 

```javascript
  { 
    status == 'ok' ?
    <video id="video" className="video" autoPlay="autoplay" ref="cam"></video>
    :
    <div>{error}</div>
  }
```

* I have been modifying the style to get a responsive design.



#### That's all folks,look at the commit for more info: https://github.com/ldoc/100DaysOfCode/commit/
