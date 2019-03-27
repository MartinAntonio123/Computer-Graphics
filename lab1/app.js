// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 6;
//camera.position.set(0,0,10) poner la posicion en x=0, y=0, z=0
///camera.lookAt(0,0,0)
// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a Cube Mesh with basic material
var geometry_cube = new THREE.BoxGeometry( 1, 1, 1 );
var material_cube = new THREE.MeshBasicMaterial();
material_cube.color= new THREE.Color(0,255,0);
var cube = new THREE.Mesh( geometry_cube, material_cube );
material_cube.wireframe=true;
// Add cube to Scene
scene.add( cube );

var geometry_tetra = new THREE.TetrahedronGeometry( 1, 1 );
var material_tetra = new THREE.MeshBasicMaterial();
material_tetra.color= new THREE.Color(255,0,0);
var tetra = new THREE.Mesh( geometry_tetra, material_tetra );
material_tetra.wireframe=true;
// Add cube to Scene
scene.add( tetra);

var geometry_torus = new THREE.TorusGeometry( 1, .3, 16, 100 );
var material_torus = new THREE.MeshBasicMaterial();
material_torus.color= new THREE.Color(0,0,255);
var torus = new THREE.Mesh( geometry_torus, material_torus );
material_torus.wireframe=true;
// Add cube to Scene
scene.add(torus);

var geometry_cone = new THREE.ConeGeometry( 1, 2, 32 );
var material_cone = new THREE.MeshBasicMaterial();
material_cone.color= new THREE.Color(0,100,105);
var cone = new THREE.Mesh( geometry_cone, material_cone );
material_cone.wireframe=true;
// Add cube to Scene
scene.add(cone);

tetra.position.x-=2;
cube.position.x+=2;
torus.position.y+=2;
cone.position.y-=2;
// Render Loop
var render = function () {
  requestAnimationFrame( render );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  tetra.rotation.x += 0.01;
  tetra.rotation.y += 0.01;
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  cone.rotation.x += 0.01;
  cone.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
};

render();
