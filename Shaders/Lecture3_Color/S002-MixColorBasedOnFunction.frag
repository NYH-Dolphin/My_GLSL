
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.141592653589793
#define HALF_PI 1.5707963267948966

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float upper(vec2 uv, float func) {
    // blur amount is relative to the resolution
    float blur = 300./u_resolution.y;    
    return smoothstep( func-blur, func, uv.y);
}


vec3 colorA = vec3(0.1098, 0.1059, 0.2549);
vec3 colorB = vec3(0.8941, 0.7333, 0.1608);

void main() {
    // normalization
    vec2 uv = gl_FragCoord.xy/u_resolution;
    float x = uv.x;
    float y = uv.y;


    // try different functions!
    /////////////////////////////////////////////////////////
    float func = 1. - pow(abs(x), 3.);
    /////////////////////////////////////////////////////////

    float c_upper = upper(uv, func);
    vec3 color = mix(colorB, colorA, c_upper);
    gl_FragColor = vec4(color,1.0);
}