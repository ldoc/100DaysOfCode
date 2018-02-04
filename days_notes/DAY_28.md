# Day 28
## (4 February 2018)

* Making a simple WASM test 

* This is my c code:
```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <emscripten/emscripten.h>

// The code inside the main will be executed once the WASM module loads.
int main(int argc, char ** argv) {
    printf("WebAssembly module loaded\n");
}

// Simple C function that returns a char array
char* EMSCRIPTEN_KEEPALIVE get_hello_world() {
    //This do´nt work as expected, WebAssembly doesn't natively support a string type, it rather supports i32 / i64 / f32 / f64
    return "Hello world from WASM";
}

// Simple C function that returns a  random nuber between 1 and 100
int EMSCRIPTEN_KEEPALIVE get_random_number() {
    srand(time(NULL));   
    return (rand() % 100) + 1;
}
```

* Then I compile it to .wasm:
```
emcc ./app/wasm/test.c -s WASM=1 -O3 -o ./app/wasm/index.js
``` 

* It will create an index.wasm and index.js file

* Finally I have created a testwam.html file where launch the wasm functions

```html
<!DOCTYPE html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>WebAssembly Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <input type ="button" onclick = "launchWASMfunc(_get_hello_world)" value = "Say Hello Wasm"/>
    <input type ="button" onclick = "launchWASMfunc(_get_random_number)" value = "Get Random Number"/>
    <script src="index.js"></script>
    <script>
     function launchWASMfunc (f) {
      var result = f();
      alert(result);
    }
    </script>
  </body>
</html> 
```

#### That's all folks,look at the commit for more info: https://github.com/ldoc/100DaysOfCode/commit/07a5685a5fcbffe3eda4bc87d41fd7bd41a1b23b
