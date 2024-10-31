import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 8, 15);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("canvas") });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const grassMaterial = new THREE.MeshBasicMaterial({ color: "green" });
const roadMaterial = new THREE.MeshBasicMaterial({ color: "gray" });
const whitebbuild = new THREE.MeshBasicMaterial({ color: "white" });
const limebbuild = new THREE.MeshBasicMaterial({ color: "lime" });

const groundGrass = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), grassMaterial);
groundGrass.rotation.x = -Math.PI / 2;
scene.add(groundGrass);

const roadVertical = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 20), roadMaterial);
roadVertical.rotation.x = -Math.PI / 2;
roadVertical.position.set(0, 0.01, 0);
scene.add(roadVertical);

const roadLeftTop = new THREE.Mesh(new THREE.PlaneGeometry(4, 2), roadMaterial);
roadLeftTop.rotation.x = -Math.PI / 2;
roadLeftTop.position.set(-2, 0.01, 7);
scene.add(roadLeftTop);

const roadLeftmiddle = new THREE.Mesh(new THREE.PlaneGeometry(10, 2), roadMaterial);
roadLeftmiddle.rotation.x = -Math.PI / 2;
roadLeftmiddle.position.set(-5, 0.01, 2);
scene.add(roadLeftmiddle);

const roadRight = new THREE.Mesh(new THREE.PlaneGeometry(10, 2), roadMaterial);
roadRight.rotation.x = -Math.PI / 2;
roadRight.position.set(5, 0.10, -2);
scene.add(roadRight);

const roadLeftBottom = new THREE.Mesh(new THREE.PlaneGeometry(4, 2), roadMaterial);
roadLeftBottom.rotation.x = -Math.PI / 2;
roadLeftBottom.position.set(-2, 0.01, -5);
scene.add(roadLeftBottom);

function createBuilding(x, z, material, width, height, depth, rotationY = 0) {
    const building = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    building.position.set(x, height / 2, z);
    building.rotation.y = rotationY;
    scene.add(building);
}

createBuilding(-6, 7, whitebbuild, 4, 1, 5);
createBuilding(-5, -6, limebbuild, 3, 2, 8);
createBuilding(6, -6, whitebbuild, 6, 2, 5);

const sphereMaterial = new THREE.MeshBasicMaterial({ color: "black" });
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), sphereMaterial);
sphere.position.set(0, 0.5, 0);
scene.add(sphere);

gsap.to(sphere.position, {
    duration: 10,
    repeat: -1,
    ease: "linear",
    keyframes: [
        { x: 0, z: 4 },         
        { x: -1, z: 7 },        
        { x: -6, z: 7 },        
        { x: -1, z: 7 },      
        { x: 0, z: 4 }, 
        { x: 0, z: -5 },        
        { x: -4, z: -5 },      
        { x: -5, z: -6 },       
        { x: -4, z: -5 },       
        { x: 0, z: -5 },
        { x: 0, z: -3 },       
        { x: 2, z: -3 },         
        { x: 5, z: -3 },         
        { x: 6, z: -6 },       
        { x: 5, z: -3 },        
        { x: 2, z: -3 },       
        { x: 0, z: -3 },  
        { x: 0, z: 0 },        
    ],
});



window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();
