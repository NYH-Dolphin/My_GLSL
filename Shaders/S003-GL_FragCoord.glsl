#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse; 
uniform float u_time;


void main(){
    /*
    glsl has a default output [vec4 gl_FragColor]
    it also gives us a default input [vec4 gl_FragCoord],
    which holds the screen coordinates of the pixel or screen fragment that the active thread is working on
    In this case we don't call it [uniform] because it will be different from thread to thread
    instead gl_FragCoord is called a [varying]
    */

    /*
    In the above code we normalize the coordinate of the fragment by dividing it by the total resolution of the billboard
    By doing this the values will go between 0.0 and 1.0, which makes it easy to map the X and Y values to the RED and GREEN channel.
    */
    vec2 uv = gl_FragCoord.xy/u_resolution;
    gl_FragColor = vec4(uv.x,uv.y,0.0,1.0);
}
