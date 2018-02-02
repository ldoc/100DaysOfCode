# Day 26
## (2 February 2018)

* Continue with canvas

* Readapting this example [Solar System](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations)

```javascript
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
```

#### That's all folks,look at the commit for more info: https://github.com/ldoc/100DaysOfCode/commit/89cb3dcf5a7dfd4d71a80a0e2c63f1d209488b86
