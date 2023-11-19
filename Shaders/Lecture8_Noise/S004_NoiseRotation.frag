#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

float random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    
    return -1.0 + 2.0 * fract( sin( dot( st.xy, vec2(12.9898,78.233) ) ) * 43758.5453123);
}

vec2 random2vec(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}


// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise1 (in vec2 st) {
    st += u_time;
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}


float noise2 (in vec2 st) {
    st += u_time;
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random2(i);
    float b = random2(i + vec2(1.0, 0.0));
    float c = random2(i + vec2(0.0, 1.0));
    float d = random2(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    float n =  mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
    return n*.5+.4;
}


// gradient noise
float noise3(vec2 st) {
    st += u_time;
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    float n =  mix( mix( dot( random2vec(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2vec(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2vec(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2vec(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
    return n*.5+.5;
}


float lines(in vec2 pos, float b){
    float scale = 10.0;
    pos *= scale;
    return smoothstep(0.0,.5+b*.5,abs((sin(pos.x*3.1415)+b*2.0))*.5);
}

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec2 pos = st.xy * 3.;

    // apply noise to translate
    pos += noise3(pos);
    // apply noise to rotation
    pos = rotate2d(noise3(pos)) * pos;
    // move horizontally
    pos.x += u_time;
    float c_line = lines(pos, .5);
    vec3 color_blue = vec3(0.14, 0.22, 0.45);
    vec3 color_white = vec3(0.78, 0.95, 0.93);
    vec3 color = mix(color_blue, color_white, c_line);
    gl_FragColor = vec4(color, 1.0);
}
