import './style.css'
import * as THREE from 'three'

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({
    color: 0x44f822
});
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.y = 1;
//mesh.position.y = - 0.1;
// mesh.scale.x = 2;
// mesh.scale.z = 2;
scene.add(mesh);

const geometry2 = new THREE.PlaneGeometry( 2, 2, 52 );
const material2 = new THREE.MeshBasicMaterial({
    color: 0xff0000
})
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.rotation.x = 300;
mesh2.position.y = -1;
mesh2.position.z = -1
scene.add(mesh2);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
//camera.lookAt(mesh2.position.x);

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

window.addEventListener('resize', () => {

    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
})

renderer.render(scene, camera);

