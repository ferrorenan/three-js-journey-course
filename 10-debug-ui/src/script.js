import './style.css';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from 'gsap';
import * as dat from 'dat.gui';

/*
    Debug
 */
const gui = new dat.GUI({
    width: 500
});

function spin(){

}

const parameters = {
    color: 0xffff00,
    spin: () =>
    {
        gsap.to(mesh.rotation, {
            duration: 1,
            y: mesh.rotation.y + 10
        })
    }
};

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

const object = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: parameters.color,
});
const mesh = new THREE.Mesh(object, material);
scene.add(mesh);

//Debug
gui
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('Eixo Y')

//Aqui passamos as propriedades disponiveis no material
gui
    .add(mesh, 'visible')

//Aqui passamos as propriedades disponiveis no material
gui
    .add(material, 'wireframe')

gui
    .addColor(parameters, 'color')
    .onChange(() =>
    {
        material.color.set(parameters.color);
    })

gui
    .add(parameters, 'spin')

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener('resize', () => {

    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
});

// const clock = new THREE.Clock();

const tick = () => {

    // let actualTiming = clock.getElapsedTime();

    // mesh.rotation.y = actualTiming;
    // mesh.position.x = Math.sin(actualTiming);

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();
