// Author @patriciogv - 2015
// Title: Mosaic

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}


float circle(vec2 st, vec2 pos, float r)
{  
    float blur = 10./u_resolution.y; // blur is based on the y-resolution! this is because we normalize resolution.x based on y
    float d = length(st-pos);
    float c = smoothstep(r+blur, r, d);
    return c;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st = mix(vec2((st.x*u_resolution.x/u_resolution.y)-(u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y,st.y), 
             vec2(st.x,st.y*(u_resolution.y/u_resolution.x)-(u_resolution.y*.5-u_resolution.x*.5)/u_resolution.x), 
             step(u_resolution.x,u_resolution.y));

    st *= 10.0; // Scale the coordinate system by 10
    
    
    float c_c = circle(fract(st), vec2(.5, .5), .3);

    // Assign a random value based on the integer coord
    vec2 ipos = floor(st);  // get the integer coords, change a lit
    vec2 fpos = fract(st);  // get the fractional coords
    vec3 color = vec3(random(ipos), random(ipos+floor(u_time)), random(ipos+3.*floor(u_time)));
    color *= c_c;

    gl_FragColor = vec4(color,1.0);
}
