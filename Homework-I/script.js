import * as THREE from 'three';
import gsap from 'gsap';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene").appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1.5, 18, 18); 
const material = new THREE.MeshBasicMaterial({ 
    color: 0xff4500, 
    wireframe: true 
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 7; 
camera.position.x = 2; 


const startTime = Date.now();

function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = (Date.now() - startTime) / 1000;

    sphere.rotation.y = elapsedTime; 

    renderer.render(scene, camera);
}

animate();
