#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718
#define HALF_PI 1.5707963267948966

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float heartSDF(vec2 st) {
    st/=1.5;
    st -= vec2(.0,.25);
    float r = length(st)*5.;
    st = normalize(st);
    return r - 
         ((st.y*pow(abs(st.x),0.67))/ 
         (st.y+1.5)-(2.)*st.y+1.26);
}

float elasticOut(float t) {
  return sin(-13.0 * (t + 1.0) * HALF_PI) * pow(2.0, -10.0 * t) + 1.0;
}

float plot_func(vec2 uv, float func) {
    float blur = 3./u_resolution.y;
    return  smoothstep( func-blur, func, uv.y) - smoothstep( func, func+blur, uv.y);
}

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}


float hearfunc(float x){
    float h = 0.5*sin(x);
    return h*elasticOut(abs(sin(2.*u_time)))*sin(10.*x*PI);
}

void main(){
    // normalization
    vec2 st = gl_FragCoord.xy/u_resolution;
    st -= .5;
    
    // func
    float func = hearfunc(st.x);
    float c_func = plot_func(st, func);

    // normalize x
    st.x *= u_resolution.x/u_resolution.y;

    // scaling
    st /= max(.6*elasticOut(abs(sin(2.*u_time))), .2);

    // get the heart
    float blur = 20./u_resolution.y;
    float c = smoothstep(1., 1.+blur, 1.-heartSDF(st));
    float m_heart = c;

    // coloring the heart
    c *= 1.-length(st);
    vec3 color_heart = vec3(0.93, 0.11, 0.11) * c;

    vec3 color_func = vec3(1.) * c_func;
    vec3 color = mix(color_func, color_heart, m_heart);
    gl_FragColor = vec4(color, 1.0);
}