#ifdef GL_ES
precision mediump float;
#endif

/*
we need to be able to send some inputs from the CPU to all the threads
Because of the architecture of the graphics card 
those inputs are going to be equal (uniform) to all the threads and necessarily set as read only

these inputs are called [uniform]
come in most of the supported types: float, vec2, vec3, vec4, mat2, mat3, mat4, sampler2D and samplerCube
Uniforms are defined with the corresponding type at the top of the shader [right after assigning the default floating point precision]
*/
uniform vec2 u_resolution;  // Canvas size (width,height)
uniform vec2 u_mouse;       // mouse position in screen pixels
uniform float u_time;       // Time in seconds since load


void main(){
    // we use u_time - the number of seconds since the shader started running
    // together with a sine function to animate the transition of the amount of red in the billboard
    gl_FragColor = vec4(abs(sin(u_time)),0.0,0.0,1.0);
}
