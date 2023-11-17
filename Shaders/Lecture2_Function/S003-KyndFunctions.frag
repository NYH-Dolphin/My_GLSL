#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

/*
uv: uv map
fun: function
output 1 to represent there this is in the range of the function, else output 0
*/
float plot_func(vec2 uv, float func) {
    // blur amount is relative to the resolution
    float blur = 2./u_resolution.y;    
    return  smoothstep( func-blur, func, uv.y) -
          smoothstep( func, func+blur, uv.y);
}

void main() {
    // normalization
    vec2 uv = gl_FragCoord.xy/u_resolution;
    // extract the x and y variable
    float x = uv.x;
    float y = uv.y;

    // try different functions!
    /////////////////////////////////////////////////////////
    float func = 1. - pow(abs(x), 0.5*6.*abs(sin(u_time)));
    func = pow(cos(3.1415*x/2.0), 0.5*6.*abs(sin(u_time)));
    func = 1.-pow(abs(sin(3.1415*x/2.)), 0.5*6.*abs(sin(u_time)));
    func = pow(min(cos(3.1415*x/2.0), 1.-abs(x)),0.5*6.*abs(sin(u_time)));
    func = 1. - pow(max(0.0, abs(x)*2.-1.), 0.5*6.*abs(sin(u_time)));
    /////////////////////////////////////////////////////////

    float c_func = plot_func(uv, func);
    vec3 color_func = vec3(c_func) * vec3(1.0,0.0,0.0);

    // Plot y changed base on x
    vec3 color_bright = vec3(func);

    // here we mix the color_bright and color_func
    vec3 color = mix(color_bright, color_func, c_func);
    gl_FragColor = vec4(color,1.0);
}
