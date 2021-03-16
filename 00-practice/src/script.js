import './style.css';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = document.querySelector('.webgl');

const textureLoader = new THREE.TextureLoader();

const naveColorTexture = textureLoader.load('/naveColor.jpg');
const naveHoughnessTexture = textureLoader.load('/naveRoughness.jpg');
const naveMetalnessTexture = textureLoader.load('/naveMetalnness.jpg');
const naveNormalTexture = textureLoader.load('/naveNormal.jpg');

const pedraAmbientOcclusionTexture = textureLoader.load('/pedraAmbientOcclusion.jpg');
const pedraColorTexture = textureLoader.load('/pedraColor.jpg');
const pedraDisplacementTexture = textureLoader.load('/pedraDisplacement.jpg');
const pedraNormalTexture = textureLoader.load('/pedraNormal.jpg');
const pedraHoughnessTexture = textureLoader.load('/pedraRoughness.jpg');


const scene = new THREE.Scene();

const material = new THREE.MeshStandardMaterial();
material.map = naveColorTexture;
material.metalnessMap = naveMetalnessTexture;
material.roughnessMap = naveHoughnessTexture;
material.normalMap = naveNormalTexture;
material.normalScale.set(2.5, 2.5);
material.transparent = true;

const material2 = new THREE.MeshStandardMaterial();
material2.map = pedraColorTexture;
material2.aoMap = pedraAmbientOcclusionTexture;
material2.aoMapIntensity = 1;
material2.displacementMap = pedraDisplacementTexture;
material2.displacementScale = 0.05;
material2.roughnessMap = pedraHoughnessTexture;
material2.normalMap = pedraNormalTexture;
material2.normalScale.set(0.5, 0.5);
material2.transparent = true;

const box = new THREE.Mesh(
    new THREE.BoxGeometry(2.4,2.4,2.4),
    material2
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry( 5, 1.5, 16, 100 ),
    material
)

const icosahedron = new THREE.IcosahedronGeometry(0.5, 1);

scene.add(box, torus);

function objects() {

    for (var i = 0; i < 3000; i++) {

        const object = new THREE.Mesh(icosahedron, material2);

        object.position.x = Math.random() * 600 - 400;
        object.position.y = Math.random() * 600 - 400;
        object.position.z = Math.random() * 600 - 400;

        scene.add( object );
    }
}

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 2;
pointLight.position.z = 2;
scene.add(pointLight);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1.0, 1000);

camera.position.z = 13;

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

const clock = new THREE.Clock();

window.addEventListener('resize', () => {

    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
})

const animation = () => {

    let actualTiming = clock.getElapsedTime();

    box.rotation.y = actualTiming;

    torus.rotation.x = actualTiming;
    torus.rotation.y = actualTiming;

    camera.updateProjectionMatrix();

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(animation);
}

objects();
animation();
