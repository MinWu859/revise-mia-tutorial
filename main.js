import * as THREE from 'three';

// Scene initialization
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer configuration, targeting the canvas from our HTML
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#three-canvas'),
});

renderer.render(scene, camera);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-10);


// Defining a cube geometry
const geometry = new THREE.BoxGeometry(12, 12, 12);

// Choosing a vibrant color for the cube material
const material = new THREE.MeshStandardMaterial({ color: 0x1E90FF });

// Merging geometry and material to form the mesh
const cube = new THREE.Mesh(geometry, material);

// Incorporating the cube into our scene
scene.add(cube);

cube.position.z = -20;
cube.position.x = -2;

cube.rotation.x = Math.PI / 4; // 45 degrees
cube.rotation.y = Math.PI / 4;

// Geometry for a new shape
const icosahedronGeometry = new THREE.IcosahedronGeometry(7);

// Setting up a material that responds to light
const phongMaterial = new THREE.MeshPhongMaterial({ color: 0xFFD700 });

// Creating the mesh for the icosahedron
const icosahedron = new THREE.Mesh(icosahedronGeometry, phongMaterial);

// Adding the new object to the scene
scene.add(icosahedron);

// Positioning the icosahedron
icosahedron.position.z = -5;
icosahedron.position.x = 20;


// Point light that emits light in all directions
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5, 5, 5);

renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;

// Ambient light to softly illuminate the scene without strong shadows
const ambientLight = new THREE.AmbientLight(0x404040);

scene.add(pointLight, ambientLight);



// Helpers for better visualization

const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);


const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);


// Importing OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Activating Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);

// function animate() {
//   requestAnimationFrame(animate);
  
//   // Object transformations
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
  
//   icosahedron.rotation.z -= 0.02;
//   icosahedron.rotation.y -= 0.02;
  
//   // Updating controls for interactivity
//   controls.update();
  
//   renderer.render(scene, camera);
// }

// animate();


// Scene background with a space texture
const spaceTexture = new THREE.TextureLoader().load('images/space_background.jpg');
scene.background = spaceTexture;


// Load the smiley texture
const smileTexture = new THREE.TextureLoader().load('images/smile.jpg');

// Sphere geometry
const sphereGeometry = new THREE.SphereGeometry(10, 32, 32);

// Material with texture
const smileMaterial = new THREE.MeshBasicMaterial({ map: smileTexture });

// Sphere mesh
const smileMesh = new THREE.Mesh(sphereGeometry, smileMaterial);
scene.add(smileMesh);

function animate() {
  requestAnimationFrame(animate);
  
  // Rotations
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  smileMesh.rotation.y += 0.05; // This will rotate the sphere with the smile texture
  
  // Update controls
  controls.update();
  
  renderer.render(scene, camera);
}

animate();

// Load the normal map texture
const normalTexture = new THREE.TextureLoader().load('images/normals/textureNormal.png');

// Torus geometry
const torusGeo = new THREE.TorusKnotGeometry(5, 1, 250, 5, 9, 15);

// Material with normal map
const torusMaterial = new THREE.MeshStandardMaterial({
    normalMap: normalTexture,
    roughness: 0,
    metalness: 0.8
});

const torusKnot = new THREE.Mesh(torusGeo, torusMaterial);
torusKnot.position.y = 20;
scene.add(torusKnot);