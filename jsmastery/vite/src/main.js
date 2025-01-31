import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Get the canvas element
const canvas = document.getElementById('canvas');

// 1. Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#f0f0f0");

// 2. Add camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 3. Create and add dodecahedron object
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585' });
const dodecahedron = new THREE.Mesh(geometry, material);
scene.add(dodecahedron);

// 4. Create and add box object
const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
const boxMaterial = new THREE.MeshStandardMaterial({ color: '#b4b4b3', emissive: '#b4b4b3' });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = -1.5;
scene.add(box);

// 5. Add light
const light = new THREE.SpotLight(0x00679, 100);
light.position.set(1, 1, 1);
scene.add(light);

// 6. Create renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 7. Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

// 8. Render the scene
function animate() {
    requestAnimationFrame(animate);

    // Rotate objects
    dodecahedron.rotation.x += 0.01;
    dodecahedron.rotation.y += 0.01;
    box.rotation.y += 0.005;

    // Update controls
    controls.update();

    // Render the scene
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    // Update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
});