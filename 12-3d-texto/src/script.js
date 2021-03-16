import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

//Axes helper
const axesHelper = new THREE.AxesHelper();
//scene.add(axesHelper);

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/teste1.jpeg');

const fontsLoader = new THREE.FontLoader()

fontsLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        const textGeometry = new THREE.TextGeometry(
            'Creative FrontEnd',{
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        // textGeometry.computeBoundingBox();
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5
        // )

        textGeometry.center();

        const material = new THREE.MeshMatcapMaterial({
            matcap: matcapTexture
        });
        //textMaterial.wireframe = true;
        const text = new THREE.Mesh(textGeometry, material);
        scene.add(text);

        const donutGeometry = new THREE.TorusGeometry(0.33, 0.2, 20, 45);

        for(let i = 0; i < 130; i++){

            const meshDonut = new THREE.Mesh(donutGeometry, material);

            meshDonut.position.x = (Math.random() - 0.5) * 10;
            meshDonut.position.y = (Math.random() - 0.5) * 10;
            meshDonut.position.z = (Math.random() - 0.5) * 10;

            meshDonut.rotation.x = Math.random() * Math.PI;
            meshDonut.rotation.Y = Math.random() * Math.PI;

            const scale1 = Math.random();
            meshDonut.scale.set(scale1, scale1, scale1);

            scene.add(meshDonut);
        }
    }
)

const material = new THREE.MeshBasicMaterial();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();

window.addEventListener('resize', () => {

    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

const animate = () => {

    const elapsedTime = clock.getElapsedTime();

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(animate);
}

animate();
