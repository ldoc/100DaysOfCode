# Day 23
## (30 January 2018)

* Today I have seen two canvas topics lines and curves

* Drawing a grille with lines

```javascript
  lines = (context,video) => {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    let pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height);

    const w = pixels.width;
    const h = pixels.height;

    context.putImageData(pixels, 0, 0);

    //Lets draw a grille

    const SEPARATION = 30;
    const LINEWIDTH = 4;
    const COLOR = 'gray';
    const BORDER = 'round';

    // Vertical lines
    for(let i= 0; i < w ; i+=SEPARATION) {
      context.beginPath();
      context.moveTo(i, SEPARATION );
      context.lineTo(i, h);
      context.strokeStyle = COLOR;
      context.lineCap = BORDER;
      context.lineWidth = LINEWIDTH;
      context.stroke();
    } 

    // Horizontal lines
    for(let j= SEPARATION * 2; j < h ; j+=SEPARATION) {
      context.beginPath();
      context.moveTo(0, j);
      context.lineTo(w, j);
      context.strokeStyle = COLOR;
      context.lineCap = BORDER;
      context.lineWidth = LINEWIDTH;
      context.stroke();
    } 
  }
```

* Drawing some birds with curves

```javascript
  curves = (context,video) => {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    let pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    context.putImageData(pixels, 0, 0);

    //lets draw some birds

    context.strokeStyle = 'black';
    context.lineCap = 'round';
    context.lineWidth = 4;

    //with two arcs (x, y, radius, startAngle, endAngle, counterClockwise)
    context.beginPath();
    context.arc(40,40,10,1.1*Math.PI,1.9*Math.PI);
    context.arc(60,40,10,1.1*Math.PI,1.9*Math.PI);
    context.stroke();

    //with two quadratic curves (cpx,cpy,x,y)
    context.beginPath();
    context.moveTo(90,50);
    context.quadraticCurveTo(100,40,130,50);
    context.quadraticCurveTo(140,30,150,45);
    context.stroke();

    //with two bezier curves (cp1x,cp1y,cp2x,cp2y,x,y);
    context.beginPath();
    context.moveTo(180,25);
    context.bezierCurveTo(190,10,195,10,200,20);
    context.bezierCurveTo(215,8,222,10,228,15);
    context.stroke();
  }
```

#### That's all folks,look at the commit for more info: https://github.com/ldoc/100DaysOfCode/commit/
