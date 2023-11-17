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


float blinnWyvillCosineApproximation(float x){
  float x2 = x*x;
  float x4 = x2*x2;
  float x6 = x4*x2;
  float fa = ( 4.0/9.0);
  float fb = (17.0/9.0);
  float fc = (22.0/9.0);
  float y = fa*x6 - fb*x4 + fc*x2;
  return y;
}

float doubleCubicSeat(float x, vec2 pos){
  
  float epsilon = 0.00001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  float min_param_b = 0.0;
  float max_param_b = 1.0;
  float a = pos.x;
  float b = pos.y;
  a = min(max_param_a, max(min_param_a, a));  
  b = min(max_param_b, max(min_param_b, b)); 

  float y = 0.;
  if (x <= a){
    y = b - b*pow(1.0-x/a, 3.0);
  } else {
    y = b + (1.0-b)*pow((x-a)/(1.0-a), 3.0);
  }
  return y;
}

float doubleCubicSeatWithLinearBlend (float x, float a, float b){
  float epsilon = 0.00001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  float min_param_b = 0.0;
  float max_param_b = 1.0;
  a = min(max_param_a, max(min_param_a, a));  
  b = min(max_param_b, max(min_param_b, b)); 
  b = 1.0 - b; //reverse for intelligibility.
  
  float y = 0.;
  if (x<=a){
    y = b*x + (1.-b)*a*(1.-pow(1.-x/a, 3.0));
  } else {
    y = b*x + (1.-b)*(a + (1.-a)*pow((x-a)/(1.-a), 3.0));
  }
  return y;
}


float doubleOddPolynomialSeat (float x, float a, float b, float n){
  float epsilon = 0.00001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  float min_param_b = 0.0;
  float max_param_b = 1.0;
  a = min(max_param_a, max(min_param_a, a));  
  b = min(max_param_b, max(min_param_b, b)); 

  float p = 2.*n + 1.;
  float y = 0.;
  if (x <= a){
    y = b - b*pow(1.-x/a, p);
  } else {
    y = b + (1.-b)*pow((x-a)/(1.-a), p);
  }
  return y;
}


float quadraticThroughAGivenPoint (float x, float a, float b){
  float epsilon = 0.00001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  float min_param_b = 0.0;
  float max_param_b = 1.0;
  a = min(max_param_a, max(min_param_a, a));  
  b = min(max_param_b, max(min_param_b, b)); 
  
  float A = (1.-b)/(1.-a) - (b/a);
  float B = (A*(a*a)-b)/a;
  float y = A*(x*x) - B*(x);
  y = min(1.,max(0.,y)); 
  
  return y;
}


float doublePolynomialSigmoid (float x, float n){
  
  float y = 0.;

  if (mod(n, 2.) == 0.){ 
    // even polynomial
    if (x<=0.5){
      y = pow(2.0*x, n)/2.0;
    } else {
      y = 1.0 - pow(2.*(x-1.), n)/2.0;
    }
  } 
  
  else { 
    // odd polynomial
    if (x<=0.5){
      y = pow(2.0*x, n)/2.0;
    } else {
      y = 1.0 + pow(2.0*(x-1.), n)/2.0;
    }
  }

  return y;
}

void main() {
    // normalization
    vec2 uv = gl_FragCoord.xy/u_resolution;
    float x = uv.x;
    float y = uv.y;


    // try different functions!
    /////////////////////////////////////////////////////////
    float func = doublePolynomialSigmoid(x, 6.0);
    /////////////////////////////////////////////////////////




    float c_func = plot_func(uv, func);
    vec3 color_func = vec3(c_func) * vec3(1.0,0.0,0.0);

    vec3 color_bright = vec3(func);

    vec3 color = mix(color_bright, color_func, c_func);
    gl_FragColor = vec4(color,1.0);
}
