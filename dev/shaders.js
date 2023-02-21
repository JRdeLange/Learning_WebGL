export const vertex_source = `
  precision highp float;
  attribute vec2 position;
  attribute vec4 color;
  attribute vec3 random_nrs;
  varying vec4 fragcolor;
  uniform float time;
  uniform vec2 mouse;


  void main() {
    // Correct the mouse position
    vec2 correct_mouse = vec2(mouse.x, -mouse.y);
    
    // Calculate vector to mouse
    vec2 vector = correct_mouse - position;
    float dist = length(vector);

    // Determine new position
    vec2 posxy = position;
    float react_distance = 0.6;

    // If the point is within the react distance
    if (dist < react_distance) {
      // Calculate movement scalar
      float movement_factor = (react_distance - dist) * (1.0/react_distance); 

      // Calculate random movement variance
      float random_variance = random_nrs.x / 10.0 + 0.1;

      // Calculate new postion
      posxy = posxy - normalize(vector) * movement_factor *  movement_factor * random_variance;
    }

    // Set new position
    gl_Position = vec4(posxy, 0.0, 1.0);

    // Size grows and shrinks using a sign with a random offset
    gl_PointSize = (sin(time + (random_nrs.x * 2.0 * 3.1415)) * 5.0) + 1.0;
    
    // Color is color
    fragcolor = color;
  }
`;

export const fragment_source = `
  precision highp float;
  varying vec4 fragcolor;
 
  void main() {
    vec2 color;
    color.x = mod(gl_FragCoord.x, 40.0) / 40.0;
    color.y = mod(gl_FragCoord.y, 40.0) / 40.0;
    gl_FragColor = fragcolor;
  }
`;