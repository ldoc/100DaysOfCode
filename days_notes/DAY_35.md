# Day 35
## (11 February 2018)

* Finally I get a basic model to use webassembly in the react app, it´s not the best solution (because the wasm function are globally expose) but now a days is the one I choose until [wip](https://medium.com/webpack/webpack-awarded-125-000-from-moss-program-f63eeaaf4e15) is ready

* These are the steps I follow

- I have created two functions in C++ to apply over canvas pixels data:

```c++
#include <stdlib.h>

extern "C" {
  
  void grayScale (unsigned char* data, int len) {
    for (int i = 0; i < len; i += 4) {
      data[i] = data[i];
      data[i+1] = data[i];
      data[i+2] = data[i];
      data[i+3] = data[i+3];
    }
  }

  void invert (unsigned char* data, int len) {
    for (int i = 0; i < len; i += 4) {
      data[i] = 255 - data[i];
      data[i+1] = 255 - data[i+1];
      data[i+2] = 255 - data[i+2]; 
    }
  }

}
```

- Then I compile it with this emcc instruction, to get the .wasm file ant the .js emscripten glue code
```
emcc -s WASM=-1 -O2 ./app/wasm/filters.cpp -o ./app/wasm/filters.js -s EXPORTED_FUNCTIONS="['_grayScale','_invert']"
```

- After that I have needed to include this sentence into the filters.js file to allow loadWASM function to know when this file is completly loaded

```
function run(args) {
  ...
  script.dispatchEvent(doneEvent); // include this at the end
}
```

- As I said before I expose globally this functions using this script that I load in the .html of the app:

```javascript
var Module = {};
var filtersWASM;
loadWASM()
  .then(module => {
    filtersWASM = module;
  }).catch((err) => {
  console.log('Error in fetching module: ', err);
});

function loadWASM() { 
  return new Promise((resolve, reject) => {
  
    function buildWam() {
      const filters = {};
      filters['grayScale'] = function (pixelData) {
        const len = pixelData.length
        const mem = _malloc(len);
        HEAPU8.set(pixelData, mem); 
        _grayScale(mem, len);
        const filtered = HEAPU8.subarray(mem, mem + len);
        _free(mem);
        return filtered;
      };
      filters['invert'] = function (pixelData) {
        const len = pixelData.length
        const mem = _malloc(len);
        HEAPU8.set(pixelData, mem); 
        _invert(mem, len);
        const filtered = HEAPU8.subarray(mem, mem + len);
        _free(mem);
        return filtered;
      };
      resolve(filters);
    };

    fetch('./wasm/filters.wasm')
      .then(response => response.arrayBuffer())
      .then(buffer => {
        Module.wasmBinary = buffer;
        script = document.createElement('script');
        doneEvent = new Event('done');
        script.addEventListener('done', buildWam);
        script.src = './wasm/filters.js';
        document.body.appendChild(script);
    });
  });
}
```

- Finally I can use the functions stored in the filtersWASM javascript object

```javascript
 wasm_invert = (context,video) =>{
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, context.canvas.width, context.canvas.height);
    let pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    let data = filtersWASM.invert(pixels.data);
    pixels.data.set(data);
    context.putImageData(pixels, 0, 0);
  }
```

#### That's all folks,look at the commit for more info: https://github.com/ldoc/100DaysOfCode/commit/33731a8a615d2055b6d34f7c877119e151901829

