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
    float func = x;
    // func = x*x;
    // func = pow(x,5.0);
    // func = smoothstep(0.1,0.9,x);
    // func = smoothstep(0.2,0.5,x) - smoothstep(0.5,0.8,x);
    // func = sin(15.*x)/2.+.5;
    // func = mod(x, .5);
    // func = fract(3.*x);
    // func = ceil(x);
    // func = floor(x);
    // func = sign(x*2.-1.);
    // func = abs(2.*(x-.5));
    // func = clamp(x*x*2., 0., 1.);
    // func = min(0., x);
    // func = max(0., x);
    /////////////////////////////////////////////////////////

    // Plot a line
    /*
    we visualize the normalized value of the x coordinate (st.x) in two ways
    1. one with brightness (observe the nice gradient from black to white)
    2. by plotting a green line on top (in that case the x value is assigned directly to y)
    */
    float c_func = plot_func(uv, func);
    vec3 color_func = vec3(c_func) * vec3(1.0,0.0,0.0);

    // Plot y changed base on x
    vec3 color_bright = vec3(func);

    // here we mix the color_bright and color_func
    vec3 color = mix(color_bright, color_func, c_func);
    gl_FragColor = vec4(color,1.0);
}
