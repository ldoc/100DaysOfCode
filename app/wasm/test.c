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

