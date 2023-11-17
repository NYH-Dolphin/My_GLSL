# Lecture4 Shapes

## 1. Rectangle

```glsl
#ifdef GL_ES
precision mediump float;
#endif

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

void main(){
    vec2 uv = gl_FragCoord.xy/u_resolution;
    float c = rectangle(uv, vec4(.3, .7, .3, .7));
    gl_FragColor = vec4(vec3(c), 1.0);
}
```

