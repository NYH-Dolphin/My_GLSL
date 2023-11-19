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

// change different random functions to see different effects
float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 99999.5453123);
}

float random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    
    return fract( sin( dot( st.xy, vec2(12.9898,78.233) ) ) * 43758.5453123);
}

float rand(float x){
    return random2(vec2(x));
}

// x: range from [0, 1]
// samping point sample how much base on x
float noise(float x, float sample){
    x *= sample;
    float i = floor(x);  // integer (not sure why we need offset, some appears to have chaotics..)
    float f = fract(x);  // fraction    
    float func = rand(i); //rand() is described in the previous chapter
    func = mix(rand(i), rand(i + 1.0), smoothstep(0.,1.,f));
    return func;
}


void main() {
    // normalization
    vec2 uv = gl_FragCoord.xy/u_resolution;

    // my noise function impelmentation
    float func = noise(uv.x, 10.)+.1;

    float c_func = plot_func(uv, func);
    vec3 color_func = vec3(c_func) * vec3(1.0,0.0,0.0);

    // Plot y changed base on x
    vec3 color_bright = vec3(func);

    // here we mix the color_bright and color_func
    vec3 color = mix(color_bright, color_func, c_func);
    gl_FragColor = vec4(color,1.0);
}
