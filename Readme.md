## ThreeJS Getting Started

![treejs](./images/three-js.png)

## Table of Contents

- [ThreeJS Getting Started](#threejs-getting-started)
- [Table of Contents](#table-of-contents)
- [Installations](#installations)
  - [Install Node.js](#install-nodejs)
  - [Install NPM](#install-npm)
  - [Create a New Project and Install Vite](#create-a-new-project-and-install-vite)
  - [Install Three.js via Command Line](#install-threejs-via-command-line)
  - [How to View Your Site Locally](#how-to-view-your-site-locally)
  - [Crafting Your HTML Structure](#crafting-your-html-structure)
  - [Setting Up Your Canvas Background via CSS](#setting-up-your-canvas-background-via-css)
- [Dive into JavaScript Magic](#dive-into-javascript-magic)
  - [Laying the Foundations of Your Scene](#laying-the-foundations-of-your-scene)
  - [Materializing Your First 3D Object](#materializing-your-first-3d-object)
  - [Introducing Lights and Advanced Materials](#introducing-lights-and-advanced-materials)
  - [Animate Your Virtual World](#animate-your-virtual-world)
  - [Helpers](#helpers)
  - [Adding Illumination Helpers](#adding-illumination-helpers)
  - [Visual Reference with Grid Helper](#visual-reference-with-grid-helper)
  - [Enhancing Interactivity with Orbit Controls](#enhancing-interactivity-with-orbit-controls)
  - [Setting the Scene Background](#setting-the-scene-background)
  - [Texture Mapping](#texture-mapping)
  - [Texture Mapping](#texture-mapping-1)
  - [Animating the Texture-Mapped Object](#animating-the-texture-mapped-object)
  - [Normal Texture Mapping](#normal-texture-mapping)
  - [Visual Result](#visual-result)

## Installations

Before embarking on our journey to create a captivating 3D website, we must set up our environment with Node.js and npm using the command line.

For an optimal coding experience, especially when working extensively with JavaScript, consider using JetBrains' WebStorm, though this tutorial initially references VS Code as the editor of choice.

> **Note from Dr. B (2023-10-18):** 
> This tutorial originally utilized VS Code as the preferred code editor. If you encounter any VS Code references, please interpret them in the context of WebStorm.

### Install Node.js

Node.js is the heartbeat of the JavaScript ecosystem, empowering developers to build scalable network applications.

To verify if Node.js is already installed on your system, access your Command Line.

```bash
node -v
```

### Install NPM

With Node.js in place, it's time to acquaint ourselves with the Node Package Manager (NPM) — the backbone of the Node.js community. Through NPM, developers around the world share their Node.js modules, enabling us to do extraordinary things with JavaScript, such as building 3D websites. To get started, we'll need to install NPM via the command line.

Check if NPM is already installed on your machine:

```bash
npm -v
```

If it returns a version number, you're good to go. If not, install it with this command:
```bash
npm install -g npm
```
Congratulations, your machine is now equipped for project creation!


### Create a New Project and Install Vite
Now, forge an empty project directory, then initialize your project with Vite:

```bash
npm init vite@latest
```
The command line will offer prompts to guide you through:

Name your project.
Choose the "vanilla" option when asked for the framework.
Select "JavaScript" for the language.

![Starting new project](./images/init.png)

If you encounter any issues with the arrow keys on Windows, switching to Windows PowerShell or the Windows Terminal and navigating to your project folder to re-enter the commands should resolve the problem.

After creating your project, navigate into it and install dependencies:

```bash
cd three-js-tutorial
npm install
```

### Install Three.js via Command Line
Ensure you're at the root of your Vite project directory, then run:

```bash
npm install --save three
```

This command incorporates Three.js into your project. You'll notice the appearance of node_modules, package.json, and package-lock.json.

>> Caution:
The node_modules directory, along with package.json and package-lock.json, are critical to your project. They're managed by NPM, so avoid altering them to prevent any cosmic-level catastrophes.


### How to View Your Site Locally
Three.js, like many other JavaScript libraries, has dependencies that require local server rendering. Here's how to view your project:

```bash
npm run dev
```
![Running locally](./images/run.png)

Navigate to https://localhost:5173 to preview your app.

Keep in mind, the npm run dev command will refresh your browser automatically with every code change.

To stop your local server, use `CTRL + C` (or `CMD + C` on Mac) and confirm with `y` when prompted to terminate the process.

---

### Crafting Your HTML Structure

To give life to your 3D creation, a minimal HTML structure is essential:

1. A `<canvas>` element identified by an `id` to serve as the foundation where your 3D models will be displayed.
2. A `<script>` tag with the `type="module"` attribute, pointing to your main JavaScript file (`main.js`), which will house the 3D rendering logic.
3. An optional `<main>` container if you wish to overlay any textual content over your 3D scene.

Upon setting up your Vite project, `index.html`, `main.js`, and `style.css` are at your disposal for modifications.

Adjust your `index.html` to reflect the following structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Virtual Realm Showcase</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <canvas class="three-canvas"></canvas>
    <script type="module" src="./main.js"></script>
</body>
</html>
```

### Setting Up Your Canvas Background via CSS
Direct your attention to the `style.css` file located within the same directory as your `index.html`. You’ll establish the `<canvas>` element's appearance with the following CSS:

```css
.three-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
};
```

This configuration will ensure that the `<canvas>` fills the entire viewport, creating an immersive backdrop for the 3D experience we're about to construct.

## Dive into JavaScript Magic

Embark on the JavaScript journey by initiating your `main.js` file with an import statement for the Three.js library:

```javascript
import * as THREE from 'three';
```

### Laying the Foundations of Your Scene
`Three.js` documentation is your guide as you configure the stage for your virtual escapade. You'll need:

1. A scene to house your objects.
2. A camera to view the scene.
3. A renderer to project your graphics.

Create these foundational components in JavaScript:

```javascript
// Scene initialization
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer configuration, targeting the canvas from our HTML
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#three-canvas'),
});
```

To visualize the scene, direct the renderer to pair it with the camera:

```javascript
renderer.render(scene, camera);
```

Optimize and position your scene with these methods:

```javascript
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-10);
```

### Materializing Your First 3D Object
`Three.js` objects are crafted using geometry, material, and mesh. Declare constants for these:
```javascript
// Defining a cube geometry
const geometry = new THREE.BoxGeometry(12, 12, 12);

// Choosing a vibrant color for the cube material
const material = new THREE.MeshStandardMaterial({ color: 0x1E90FF });

// Merging geometry and material to form the mesh
const cube = new THREE.Mesh(geometry, material);

// Incorporating the cube into our scene
scene.add(cube);
```

Alter the cube's position and rotation like this:

```javascript
Copy code
cube.position.z = -20;
cube.position.x = -2;

cube.rotation.x = Math.PI / 4; // 45 degrees
cube.rotation.y = Math.PI / 4;
```

### Introducing Lights and Advanced Materials

`Three.js` offers an array of materials and textures. Experiment with an Icosahedron and a MeshPhongMaterial:

```javascript
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
Illuminate your scene with lights:
```

```javascript
// Point light that emits light in all directions
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5, 5, 5);

// Ambient light to softly illuminate the scene without strong shadows
const ambientLight = new THREE.AmbientLight(0x404040);

scene.add(pointLight, ambientLight);
```

### Animate Your Virtual World
Craft an animation loop for perpetual motion:

```javascript
function animate() {
    requestAnimationFrame(animate);
    
    // Cube transformation
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    
    // Icosahedron transformation
    icosahedron.rotation.x -= 0.01;
    icosahedron.rotation.y -= 0.01;
    
    // Render the scene from the perspective of the camera
    renderer.render(scene, camera);
}

// Commence the animation
animate();
```

![First view](./images/first-view.png)
Congratulations! Your Three.js scene should be a symphony of rotating geometries, bathed in the glow of virtual lights.

### Helpers

In this section, we'll enhance the visual feedback within our Three.js environment by introducing various helpers and controls. These tools are invaluable for debugging and navigating your 3D world.

### Adding Illumination Helpers

To ensure our objects are brightly lit and easily visible, we'll add a helper to visualize the position and extent of our lights:

```javascript
// Helpers for better visualization

const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);
```

### Visual Reference with Grid Helper

A Grid Helper will render a grid that represents the floor plane and can help with scaling and positioning objects:

```javascript
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);
```

### Enhancing Interactivity with Orbit Controls

Three.js provides a way to interact with the scene using the mouse, through Orbit Controls:

```javascript
// Importing OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Activating Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
```

Remember to update the controls within the animation loop to ensure smooth interaction:

```javascript
function animate() {
  requestAnimationFrame(animate);
  
  // Object transformations
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  
  icosahedron.rotation.z -= 0.02;
  icosahedron.rotation.y -= 0.02;
  
  // Updating controls for interactivity
  controls.update();
  
  renderer.render(scene, camera);
}

animate();
```

### Setting the Scene Background

Personalize your scene with a cosmic backdrop. Store your chosen high-resolution image in the project directory and utilize Three.js's texture loader:

```javascript
// Scene background with a space texture
const spaceTexture = new THREE.TextureLoader().load('images/space_background.jpg');
scene.background = spaceTexture;
```

When you implement these enhancements and refresh your application, you'll notice a more dynamic and responsive 3D world. Your objects will be clearly visible, lit up by the lighting helpers, and set against a vivid background that sets the mood for your virtual scene. Enjoy navigating your scene with the new orbit controls, which will allow you to explore every angle of your creation.

![Background updated view](./images/bg-updated.png)


### Texture Mapping
Texture mapping and normal mapping are techniques that add richness and realism to your 3D objects. Let's go through each step to apply these mappings to your objects in Three.js.

### Texture Mapping

Firstly, you'll want to apply a simple texture to an object. Here's how you can do it:

1. Save your texture image in your `/images` directory.
2. Load the texture using `THREE.TextureLoader`.
3. Apply the texture to the material of your object.

```javascript
// Load the smiley texture
const smileTexture = new THREE.TextureLoader().load('images/smile.jpg');

// Sphere geometry
const sphereGeometry = new THREE.SphereGeometry(10, 32, 32);

// Material with texture
const smileMaterial = new THREE.MeshBasicMaterial({ map: smileTexture });

// Sphere mesh
const smileMesh = new THREE.Mesh(sphereGeometry, smileMaterial);
scene.add(smileMesh);
```

### Animating the Texture-Mapped Object

Add some rotation to the texture-mapped object within the `animate` function:

```javascript
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
```

![Texture mapping](./images/texture-mapping.png)

### Normal Texture Mapping

For a more complex texture like a normal map, which simulates lighting on a textured surface:

1. Generate or find a normal map texture.
2. Load it as you did with the smile texture.
3. Apply it to the `normalMap` property of the `MeshStandardMaterial`.

```javascript
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

// Torus mesh
const torusKnot = new THREE.Mesh(torusGeo, torusMaterial);
torusKnot.position.y = 20;
scene.add(torusKnot);
```
### Visual Result

After applying these textures and normal maps, you'll see your objects textured with the images you've chosen. The sphere will have a smiley face wrapped around it, and the torus knot will have a detailed surface that reacts to light, making it look bumpy and shiny due to the roughness and metalness properties.

![Knot](./images/knott.png)

---
![final ui](./images/final-look.png)