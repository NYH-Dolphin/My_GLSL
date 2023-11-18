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

void main(){
    // normalization (well, this normalization is super good)
    vec2 st = gl_FragCoord.xy/u_resolution;
    st = mix(vec2((st.x*u_resolution.x/u_resolution.y)-(u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y,st.y), 
             vec2(st.x,st.y*(u_resolution.y/u_resolution.x)-(u_resolution.y*.5-u_resolution.x*.5)/u_resolution.x), 
             step(u_resolution.x,u_resolution.y));

    // draw the shape
    float c_r = rectangle(st, vec4(.4, .6, .4, .6)) - rectangle(st, vec4(.42, .58, .42, .58));
    float c_c = circle(st, vec2(.2, .5), .1, .01) - circle(st, vec2(.2, .5), .08, .01);
    float c_t = triangle(st, vec2(.8, .47), 3, .07) - triangle(st, vec2(.8, .47), 3, .05);
    float c = c_r + c_c + c_t;
    vec3 color = c * vec3(1.,0., 0.);
    gl_FragColor = vec4(vec3(color), 1.0);
}