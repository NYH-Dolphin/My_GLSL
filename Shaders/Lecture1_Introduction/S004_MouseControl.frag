#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Canvas size (width,height)
uniform vec2 u_mouse;       // mouse position in screen pixels
uniform float u_time;       // Time in seconds since load


void main(){
    // you can use u_mouse to get the values in pixel
    // u_mouse.x = horizontal value of the pixel num
    // u_mouse.y = vertical value of the pixel num
    vec2 m = u_mouse;
    m /= u_resolution;
    gl_FragColor = vec4(m.x,m.y,0.0,1.0);
}
