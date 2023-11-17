#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Canvas size (width,height)
uniform vec2 u_mouse;       // mouse position in screen pixels
uniform float u_time;       // Time in seconds since load


void main(){
    /*
    glsl has a default output [vec4 gl_FragColor]
    it also gives us a default input [vec4 gl_FragCoord],
    which holds the screen coordinates of the pixel or screen fragment that the active thread is working on
    In this case we don't call it [uniform] because it will be different from thread to thread
    instead gl_FragCoord is called a [varying]
    */
    vec2 uv = gl_FragCoord.xy/u_resolution;
    gl_FragColor = vec4(uv.x,uv.y,0.0,1.0);
}
