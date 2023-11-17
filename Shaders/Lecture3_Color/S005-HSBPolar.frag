#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st -= .5;
    st.x *= u_resolution.x/u_resolution.y;

    // Use polar coordinates instead of cartesian
    float angle = atan(st.y,st.x)+u_time;
    float radius = length(st)*2.0;

    // circle ring mask
    float m_circle = smoothstep(.5-0.01, .5, length(st));

    // Map the angle (-PI to PI) to the Hue (from 0 to 1)
    // and the Saturation to the radius
    vec3 color = hsb2rgb(vec3((angle/TWO_PI)+0.5, radius, 1.));

    color = mix(color, vec3(1.), m_circle);

    gl_FragColor = vec4(color,1.0);
}
