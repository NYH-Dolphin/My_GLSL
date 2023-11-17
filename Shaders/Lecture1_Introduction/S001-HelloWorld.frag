/*
macro, preprocessor
With them it is possible to #define global variables and do some basic conditional operation (with #ifdef and #endif).
All the macro commands begin with a hashtag (#)
Pre-compilation happens right before compiling and copies all the calls to #defines and check #ifdef (is defined) and #ifndef (is not defined)
if GL_ES is defined, which mostly happens when the code is compiled on mobile devices and browsers

the level of precision is crucial
lower precision means faster rendering, but at the cost of quality
*/
#ifdef GL_ES
precision mediump float; // we are setting all floats to medium precision
// we can choose to set them to low or high
// precision low float;
// precision high float;
#endif

/*
Float types are vital in shaders, so the level of precision is crucial
*/
uniform float u_time;

// Shader Language has a single main function that returns a color at the end
void main() {
  // The final pixel color is assigned to the reserved global variable gl_FragColor.
  // vec4 that stands for a four dimensional vector of floating point precision
  // four arguments respond to the RED, GREEN, BLUE and ALPHA channels
  // also we can see that these values are normalized, which means they go from 0.0 to 1.0
  // maks sure to putting the point (.) in your floats
  // There are multiple ways of constructing vec4 types, try to discover other ways
  // vec4(vec3(1.0,0.0,1.0),1.0);
	gl_FragColor = vec4(vec3(1.), 1.0);
}