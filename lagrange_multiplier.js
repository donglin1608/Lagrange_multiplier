let k = 0;
let speed = 0.02;
let range = 2;

function setup() {
  createCanvas(800, 600, WEBGL); // Create a 3D canvas
}

function draw() {
  background(240);
  
  // Set up camera rotation for a dynamic view
  rotateX(PI / 3);
  rotateZ(frameCount * 0.005);

  // Draw the cone-like surface (using an approximation)
  push();
  noFill();
  stroke(0, 150, 255, 150);
  strokeWeight(1);
  for (let z = -5; z < 5; z += 0.1) {
    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += 0.1) {
      let x = cos(angle) * sqrt(z * z);
      let y = sin(angle) * sqrt(z * z);
      vertex(x * 20, y * 20, z * 20);
    }
    endShape(CLOSE);
  }
  pop();

  // Animate the plane value for k
  k = range * sin(frameCount * speed); // Oscillating k value
  
  // Draw the plane
  push();
  translate(0, 0, k * 100);
  fill(150, 150, 255, 50);
  noStroke();
  plane(300, 300);
  pop();
  
  // Draw the level curve intersection
  push();
  stroke(255, 0, 0);
  strokeWeight(2);
  noFill();
  beginShape();
  let radius = map(abs(k), 0, range, 50, 100); // Example: adjust radius based on k
  let tangentX, tangentY;
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;
    vertex(x, y, k * 100);
    if (abs(angle - PI / 2) < 0.1) { // Find a point on the level curve to draw the tangent line
      tangentX = x;
      tangentY = y;
    }
  }
  endShape(CLOSE);
  pop();

  // Draw the tangent line on the level curve
  push();
  translate(0, 0, k * 100);
  stroke(0);
  strokeWeight(2);
  line(tangentX - 20, tangentY - 20, tangentX + 20, tangentY + 20); // Tangent line at the level curve
  
  // Draw the label for k value on the tangent line
  fill(0);
  textSize(12);
  textAlign(CENTER);
  text('k', tangentX, tangentY - 30);
  pop();

  // Draw the Lagrange multiplier formula on the left of the graph
  push();
  translate(-width / 2 + 20, -height / 2 + 20, 0);
  fill(30); // Darker light black color for better visibility
  textSize(20);
  textAlign(LEFT);
  text('ℒ(x, y, z, λ) = f(x, y, z) - λ ⋅ g(x, y, z)', 0, 0);
  pop();
}
