# Day 27
## (3 February 2018)

* Installing emscripten

- First download the last version of [emscripten](https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html)

- Unzip into any folder

- Fetch the latest registry of available tools.
```
emsdk update
```

- Download and install the latest SDK tools.
```
emsdk install latest
```

** Make the "latest" SDK "active" for the current user. (writes ~/.emscripten file)
```
emsdk activate latest
```

- Activate PATH and other environment variables in the current terminal
```
emsdk_env.bat
```

- Compile a C code:

```
#include <stdio.h>
#include <stdlib.h>
#include <emscripten/emscripten.h>

int main(int argc, char ** argv) {
    printf("WebAssembly module loaded\n");
}

```

```
emcc ./app/wasm/test.c -s WASM=1 -O3 -o ./app/wasm/index.js
``` 

#### That's all folks,look at the commit for more info: https://github.com/ldoc/100DaysOfCode/commit/0b018b8cbd78be17238214e803e03f6cf716ddf1

