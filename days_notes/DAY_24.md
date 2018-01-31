# Day 24
## (31 January 2018)

* Continue with canvas

* Drawing a cloud and a star with paths

```javascript
  paths = (context,video) => {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    let pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    context.putImageData(pixels, 0, 0);

    //lets draw a star
    context.strokeStyle = 'yellow';
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(250, 50);
    context.lineTo(260,30);
    context.lineTo(270,50);
    context.lineTo(290,60);
    context.lineTo(270,70);
    context.lineTo(260,90);
    context.lineTo(250,70);
    context.lineTo(230,60);
    context.closePath();
    context.stroke();

    //lets draw a cloud
    context.beginPath();
    context.moveTo(60, 40);
    context.bezierCurveTo(70, 50, 60, 70, 110, 70);
    context.bezierCurveTo(120, 90, 140, 90, 150, 70);
    context.bezierCurveTo(210, 70, 210, 60,200, 50);
    context.bezierCurveTo(220, 20, 180, 15, 170, 25);
    context.bezierCurveTo(150, 4, 100, 10, 120, 25);
    context.bezierCurveTo(100, 4, 70, 15,60, 40);

    // complete custom shape
    context.closePath();
    context.lineWidth = 5;
    context.fillStyle = '#8ED6FF';
    context.fill();
    context.strokeStyle = 'blue';
    context.stroke();
  }
```

* Drawing a sky, a sun and some mountains with fill patterns

```javascript
 fillStyles = (context,video) => {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    let pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    context.putImageData(pixels, 0, 0);
    context.globalAlpha = 0.8
    //lets draw a sky with a linear gradient
    context.beginPath();
    context.rect(0, 0, context.canvas.width, context.canvas.height/2);
    let linGradient = context.createLinearGradient(0, 0,context.canvas.width, context.canvas.height/2);
    linGradient.addColorStop(0, 'lightblue');   
    linGradient.addColorStop(1, 'blue');
    context.fillStyle = linGradient;
    context.fill();
    
    //lets draw a sun with radial gradient
    context.beginPath();
    context.arc(100,45,20,0,2*Math.PI);
    let radGradient = context.createRadialGradient(238, 50, 10, 238, 50, 300);
    radGradient.addColorStop(0, 'orange');
    radGradient.addColorStop(1, 'red');
    context.fillStyle = radGradient;
    context.fill();

    //lets draw mountains with a image pattern
    context.beginPath();
    let pattern = context.createPattern(this.imgMountains, 'repeat');
    context.rect(0, 90, context.canvas.width, 90);
    context.fillStyle = pattern;
    context.fill();
  }
```

#### That's all folks,look at the commit for more info: https://github.com/ldoc/100DaysOfCode/commit/
