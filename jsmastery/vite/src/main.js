import * as THREE from 'three';

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
const material = new THREE.MeshBasicMaterial({ color: '#468585' });
const dodecahedron = new THREE.Mesh(geometry, material);
scene.add(dodecahedron);

// 4. Create and add box object
const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
const boxMaterial = new THREE.MeshBasicMaterial({ color: '#b4b4b3' });
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

// 7. Render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
