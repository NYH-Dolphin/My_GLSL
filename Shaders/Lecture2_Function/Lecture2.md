# Lecture2 Draw Functions

## 1. Normalize UV Coordinates

In the beginning of the `main()` function. We usually **normalize** the our uv coordination:

<img src="./Lecture2.assets/image-20231116224029781.png" alt="image-20231116224029781" style="zoom:50%;" />

```glsl
// normalization
vec2 uv = gl_FragCoord.xy/u_resolution;
```
- This actually normalize our `uv.x` and `uv.y` $ \in [0, 1]$, which is easy for calculation
    - `uv.x` is the horizontal part
    - `uv.y` is the vertical part 
- The normalization is essentially the last step of **view transformation** in computer graphics' rasterization

## 2. Basic Function

We are going to visualize the normalized value of the x coordinate `uv.x` in two ways
1. **Brightness**: observe the gradient from black to white
2. **Line**: Plot a red line

If you want the result to be distinctive, make sure the range of the `func` variable $\in [0, 1]$

### Plot the Function Line
```glsl
/*
uv: normalized uv map
fun: explicit function (line)
output
 1: this part is in the range of the function
 0: this part is not in the range of the function
*/
float plot_func(vec2 uv, float func) {
    float blur = 2./u_resolution.y;    
    return smoothstep(func-blur, func, uv.y) 
    - smoothstep(func, func+blur, uv.y);
}
```
- Notice that, this function is really just subtracting a smaller part from a larger part. It is suitable only for explicit functions, not for implicit or parametric functions

### Plot the Brightness
```glsl
// Plot y changed base on x
vec3 color_bright = vec3(func);
```
### Script

```glsl

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

/*
uv: uv map
fun: function
output 1 to represent there this is in the range of the function, else output 0
*/
float plot_func(vec2 uv, float func) {
    // blur amount is relative to the resolution
    float blur = 2./u_resolution.y;    
    return  smoothstep( func-blur, func, uv.y) -
          smoothstep( func, func+blur, uv.y);
}

void main() {
    // normalization
    vec2 uv = gl_FragCoord.xy/u_resolution;

    // extract the x variable
    float x = uv.x;
    float y = uv.y;

    // try different functions!
    /////////////////////////////////////////////////////////
    float func = x ;
    // func = x*x;
    // func = pow(x,5.0);
    // func = smoothstep(0.1,0.9,x);
    // func = smoothstep(0.2,0.5,x) - smoothstep(0.5,0.8,x);
    // func = sin(15.*x)/2.+.5;
    // func = mod(x, .5);
    // func = fract(3.*x);
    // func = ceil(x);
    // func = floor(x);
    // func = sign(x*2.-1.);
    // func = abs(2.*(x-.5));
    // func = clamp(x*x*2., 0., 1.);
    // func = min(0., x);
    // func = max(0., x);
    /////////////////////////////////////////////////////////

    // Plot a line
    float c_func = plot_func(uv, func);
    vec3 color_func = vec3(c_func) * vec3(1.0,0.0,0.0);

    // Plot y changed base on x
    vec3 color_bright = vec3(func);

    // here we mix the color_bright and color_func
    vec3 color = mix(color_bright, color_func, c_func);
    gl_FragColor = vec4(color,1.0);
}

```
The result looks like this. You can uncomment different function to see what they look like.
<img src="./Lecture2.assets/image-20231116230104170.png" alt="image-20231116230104170" style="zoom: 60%;" />

### Common Functions
