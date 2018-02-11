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