// Author @patriciogv - 2015

#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

mat2 scale(vec2 _scale){
    return mat2(1./_scale.x,0.0,
                0.0,1./_scale.y);
}


mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float exponentialIn(float t) {
  return t == 0.0 ? t : pow(2.0, 10.0 * (t - 1.0));
}
float quarticOut(float t) {
  return pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
}

float circle(vec2 st, vec2 pos, float r)
{  
    // a basic rotation process
    st -= vec2(0.5);
    st =  rotate2d( u_time*PI ) * st;
    st += vec2(0.5);

    // a basic scaling translation
    st -= vec2(0.5);
    st = scale( vec2(quarticOut(0.5*sin(u_time)+0.5))) * st;
    st += vec2(0.5);

    float blur = 10./u_resolution.y; // blur is based on the y-resolution! this is because we normalize resolution.x based on y
    float d = length(st-pos);
    float c = smoothstep(r+blur, r, d);
    return c;
}


void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    st = mix(vec2((st.x*u_resolution.x/u_resolution.y)-(u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y,st.y), 
             vec2(st.x,st.y*(u_resolution.y/u_resolution.x)-(u_resolution.y*.5-u_resolution.x*.5)/u_resolution.x), 
             step(u_resolution.x,u_resolution.y));

    st *= 5.0;      // Scale up the space by 5
    st = fract(st); // Wrap around 1.0

    // Now we have 9 spaces that go from 0-1
    float c_c = circle(st, vec2(.5, .5), .4)-circle(st, vec2(.5, .5), .3);
    vec3 color = vec3(c_c);

	gl_FragColor = vec4(color,1.0);
}
