# Lecture3 Color
> https://thebookofshaders.com/06/

## 1. Define the Color
If you are familiar with object oriented programming paradigms you've probably noticed that we have been accessing the data inside the vectors like any regular C-like `struct`.

```glsl
vec3 red = vec3(1.0,0.0,0.0);
red.x = 1.0;
red.y = 0.0;
red.z = 0.0;
```
### Access through Different Names
Defining color using an x, y and z notation can be confusing and misleading. Therefore, there are other ways to access this same information, but with different names. 

```glsl
vec4 vector;
vector[0] = vector.r = vector.x = vector.s;
vector[1] = vector.g = vector.y = vector.t;
vector[2] = vector.b = vector.z = vector.p;
vector[3] = vector.a = vector.w = vector.q;
```

### Swizzle
The properties can be combined in any order you want, which makes it easy to cast and mix values.

```glsl
vec3 yellow, magenta, green;

// Making Yellow
yellow.rg = vec2(1.0);  // Assigning 1. to red and green channels
yellow[2] = 0.0;        // Assigning 0. to blue channel

// Making Magenta
magenta = yellow.rbg;   // Assign the channels with green and blue swapped

// Making Green
green.rgb = yellow.bgb; // Assign the blue channel of Yellow (0) to red and blue channels
```

## 2. Mixing Color

### Basic Mix
[mix()](https://registry.khronos.org/OpenGL-Refpages/gl4/html/mix.xhtml) function let you mix two values in percentages.

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

void main() {
    vec3 color = vec3(0.0);

    float pct = abs(sin(u_time));

    // Mix uses pct (a value from 0-1) to
    // mix the two colors
    color = mix(colorA, colorB, pct);

    gl_FragColor = vec4(color,1.0);
}

```

### Channel Mix
The `mix()` function has more to offer. 

Instead of a single float, we can pass a variable type that matches the two first arguments, in our case a `vec3`. 

By doing that we gain control over the mixing percentages of each individual color channel, r, g and b.

```glsl
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.x);

    // pct.r = smoothstep(0.1,.8, st.x);
    // pct.g = sin(st.x*PI*.3);
    // pct.b = pow(st.x,0.2);

    color = mix(colorA, colorB, pct);

    // Plot transition lines for each channel
    color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

    gl_FragColor = vec4(color,1.0);
}
```
- Uncomment line number 25 and watch what happens
- Then try uncommenting lines 26 and 27
- Remember that the lines visualize the amount of `colorA` and `colorB` to mix per channel.

## 3. RGB and HSB
There are different ways to organize color besides by red, green and blue channels.


HSB stands for 
- Hue
- Saturation
- Brightness (or Value)

Each value range from $[0, 1]$. It is a more intuitive and useful organization of colors.following code.

## 4. Easing Function

Robert Penner developed a series of popular shaping functions for computer animation known as [easing functions](https://easings.net/).

- For easing functions implemented by glsl, check: https://github.com/glslify/glsl-easings and http://glslify.github.io/glsl-easings/
- The following script are copied from this [link](https://thebookofshaders.com/edit.php#06/easing.frag). Replace the easing functions and test different effects

