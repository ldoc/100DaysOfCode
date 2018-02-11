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