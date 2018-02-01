# Day 25
## (1 February 2018)

* Continue with canvas

* Drawing images and text

```javascript
  textAndImages = (context,video) => {

    //This time dont draw the into the entire canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    //lets draw an banner image
    context.drawImage(this.imgBanner, 0, 0, context.canvas.width, context.canvas.height/2);

    //lets draw an eagle image scaled
    context.drawImage(this.imgEagle, 20, 15, this.imgEagle.width/2, this.imgEagle.height/2);

    //lets draw some text

    //Basic
    context.font = "20px Arial";
    context.fillText("Hello World",20,20);

    //Stroke text
    context.font = "28px Arial";
    context.lineWidth = 2;
    context.strokeText("Hello World",120,30);

    //Finally we gonna play with the video image drawing it in a frame
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 90, 90, 90, 70);
    let pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    context.putImageData(pixels, 0, 0);
    //The frame
    context.beginPath();
    context.rect(90, 90, 90, 70);
    context.lineWidth = 4;
    context.strokeStyle = 'black';
    context.stroke();
  }
```

#### That's all folks,look at the commit for more info: https://github.com/ldoc/100DaysOfCode/commit/