# Day 22
## (29 January 2018)

* Today I have modifyied the configMenu to allow load submenus, now I have to sections in page component camTestCanvas: Color and Effects

```javascript
    this.optionsMenu = [
      {
        id: 1,
        text: 'Colors',
        action: () => this.changeConfigMenu(this.optionsColor),
        keepOpen: true
      },
      {
        id: 2,
        text: 'Effects',
        action: () => this.changeConfigMenu(this.optionsEffects),
        keepOpen: true
      }
    ];

    this.optionsColor = [
      {
        id: 1,
        text: 'Change to Red',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.changeColor(context,video,[255,0,0])});this.changeConfigMenu(this.optionsMenu);}
      },
      {
        id: 2,
        text: 'Change to Green',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.changeColor(context,video,[0,255,0])});this.changeConfigMenu(this.optionsMenu);}
      },
      {
        id: 3,
        text: 'Change to Blue',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.changeColor(context,video,[0,0,255])});this.changeConfigMenu(this.optionsMenu);}
      },
      {
        id: 4,
        text: 'Change to Gray Scale',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.changeColor(context,video,[130,130,130])});this.changeConfigMenu(this.optionsMenu);}
      },
      {
        id: 5,
        text: 'Clear color',
        action: () => {this.setState({...this.state, fn:this.doNothing});this.changeConfigMenu(this.optionsMenu);}
      }
    ]

    this.optionsEffects = [
      {
        id: 1,
        text: 'Mirror',
        action: () => {this.setState({...this.state, fn:(context,video)=>this.mirror(context,video)});this.changeConfigMenu(this.optionsMenu);}
      }
    ]

    this.props.setConfigOptions(this.optionsMenu);
```

* Finally I have created a Mirror effect

```javascript
  mirror = (context,video) => {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    let pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    const w = pixels.width;
    const h = pixels.height;
    for(let y = 0; y < h; y++) { // Iterate all the columns
      for(let x = 0; x < w / 2; x++) { // Only iterate half part of canvas
        // Take the RGBA of the pixel that I´m gonna reflect
        let off = ((w * y) + x) * 4; 

        let r = pixels.data[off];
        let g = pixels.data[off + 1];
        let b = pixels.data[off + 2];
        let a = pixels.data[off + 3];

        //Calculate the position to the mirror half part

        let mirroroff = (w - (x * 2)) * 4;

        // And assign 
        pixels.data[off + mirroroff] = r;
        pixels.data[off + 1 + mirroroff] = g;
        pixels.data[off + 2 + mirroroff] = b;
        pixels.data[off + 3 + mirroroff] = a;
      }
    }
    context.putImageData(pixels, 0, 0);
  }
```


#### That's all folks,look at the commit for more info: https://github.com/ldoc/100DaysOfCode/commit/1228e9274a228dd3d1b483e28f484b3fb74c9329
