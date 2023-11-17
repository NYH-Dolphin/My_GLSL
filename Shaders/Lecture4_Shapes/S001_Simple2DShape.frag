#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// uv: normalize uv map [0, 1]^2
// rect: left, right, down, up
float rectangle(vec2 uv, vec4 rect){
    float cl = smoothstep(rect.x , rect.x+.001, uv.x);
    float cr = smoothstep(rect.y ,rect.y-.001 , uv.x);
    float cd = smoothstep(rect.z, rect.z+.001, uv.y);
    float cu = smoothstep(rect.w, rect.w-.001, uv.y);
    float c = cl*cr*cd*cu;
    return c;
}


// uv: normalized uv map
// pos: offset with respect to the center
// r: radius of the circle
// blur: outside blur amount
float circle(vec2 uv, vec2 pos, float r, float blur)
{    
    float d = length(uv-pos);
    float c = smoothstep(r+blur, r, d);
    return c;
}


float triangle(vec2 uv, vec2 pos, int n, float size){
    uv -= pos;
    float a = atan(uv.x,uv.y)+PI;
    float r = TWO_PI/float(n);
    float d = cos(floor(.5+a/r)*r-a)*length(uv);
    float c = smoothstep(size, size-.005, d);
    return c;
}


float tirangle(vec2 uv){
    return 0.0;
}

void main(){
    // normalization
    vec2 uv = gl_FragCoord.xy/u_resolution;
    uv -= .5;
    uv.x *= u_resolution.x/u_resolution.y;

    float c_r = rectangle(uv, vec4(-.1, .1, -.1, .1)) - rectangle(uv, vec4(-.08, .08, -.08, .08));
    float c_c = circle(uv, vec2(-.4, .0), .1, .01) - circle(uv, vec2(-.4, .0), .08, .01);
    float c_t = triangle(uv, vec2(.4, -0.03), 3, .07) - triangle(uv, vec2(.4, -0.03), 3, .05);
    float c = c_r + c_c + c_t;
    vec3 color = c * vec3(1.,0., 0.);
    gl_FragColor = vec4(color, 1.0);
}