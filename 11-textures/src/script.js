import './style.css';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = document.querySelector('.webgl');

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
    console.log('start');
}

loadingManager.onLoad = () => {
    console.log('load');
}

loadingManager.onProgress = () => {
    console.log('progress');
}

loadingManager.onError = () => {
    console.log('error');
}

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load('/minecraft.png');
const ambientOclusionTexture  = textureLoader.load('/ambientOcclusion.jpg')
const heightTexture = textureLoader.load('/height.png');
const normalTexture = textureLoader.load('/normal.jpg');
const roughnessTexture = textureLoader.load('/roughneess.jpg');
const alphaTexture = textureLoader.load('/alpha.png');

// colorTexture.rotation = Math.PI / 4;
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

/*
    Quando usamos minFilter e nearestFilter precisamos desativar o generateMipMaps
    para ganharmos mais performance
 */
colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

const scene = new THREE.Scene();

const object = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    map: colorTexture
});
const mesh = new THREE.Mesh(object, material);
scene.add(mesh);

const sizes = {

    width: window.innerWidth,
    height: window.innerHeight
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);

window.addEventListener('resize', () => {

    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;

    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);

    renderer.render(scene, camera);
})

const clock = new THREE.Clock();

const tick = () => {

    let actualTiming = clock.getElapsedTime();

    // mesh.rotation.y = actualTiming;
    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();
