// Author: @patriciogv
// Title: 4 cells DF

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st -= .5;
    st.x *= u_resolution.x/u_resolution.y;


    vec3 color = vec3(.0);

    // Cell positions
    vec2 point[5];
    point[0] = vec2(0.3,.3);
    point[1] = vec2(-0.2,-.4);
    point[2] = vec2(-.2,0.4);
    point[3] =  vec2(0.3,-0.26);

    vec2 mouse_pos = u_mouse/u_resolution;
    mouse_pos -= .5;
    mouse_pos.x *= u_resolution.x/u_resolution.y;
    point[4] = mouse_pos;

    float m_dist = 2.;  // minimum distance

    // Iterate through the points positions
    for (int i = 0; i < 5; i++) {
        float dist = distance(st, point[i]);

        // Keep the closer distance
        m_dist = min(m_dist, dist);
    }

    float m_mask = m_dist==1.?1.:0.;
    

    // Draw the min distance (distance field)
    color += m_dist;
    
    color += vec3(smoothstep(.05, .02, length(st-point[0])));
    color += vec3(smoothstep(.05, .02, length(st-point[1])));
    color += vec3(smoothstep(.05, .02, length(st-point[2])));
    color += vec3(smoothstep(.05, .02, length(st-point[3])));
    color += vec3(smoothstep(.05, .02, length(st-point[4])));

    // Show isolines
    color += smoothstep(.1, .8,abs(sin(30.0*(m_dist- .03*u_time))));
    color = 1.-color;
    color = mix(vec3(0.498, 0.7451, 0.9137), vec3(0.1765, 0.1765, 0.5569), color.x);
    color = mix(color,vec3(0.498, 0.7451, 0.9137), m_mask);

    gl_FragColor = vec4(color,1.0);
}
