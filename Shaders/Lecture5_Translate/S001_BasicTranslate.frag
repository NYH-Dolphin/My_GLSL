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

mat2 scale(vec2 _scale){
    return mat2(1./_scale.x,0.0,
                0.0,1./_scale.y);
}


mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main(){
    // normalization (well, this normalization is super good)
    vec2 st = gl_FragCoord.xy/u_resolution;
    st = mix(vec2((st.x*u_resolution.x/u_resolution.y)-(u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y,st.y), 
             vec2(st.x,st.y*(u_resolution.y/u_resolution.x)-(u_resolution.y*.5-u_resolution.x*.5)/u_resolution.x), 
             step(u_resolution.x,u_resolution.y));
    
    // a basic rotation process
    st -= vec2(0.5);
    st =  rotate2d( u_time*PI ) * st;
    st += vec2(0.5);

    // a basic scaling translation
    st -= vec2(0.5);
    st = scale( vec2(0.5*sin(u_time) +1.) ) * st;
    st += vec2(0.5);
    
    // a really simple translation calculation
    vec2 translate = vec2(.35*sin(u_time), .35*cos(u_time));
    st += translate;

    // draw the shape 
    float c_r = rectangle(st, vec4(.4, .6, .4, .6));
    vec3 color = c_r * vec3(1.,1., 1.);
    gl_FragColor = vec4(vec3(color) + vec3(st.x, st.y, 0.), 1.0);
}