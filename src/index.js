
import * as THREE from 'three';

const WIDTH = innerWidth;
const HEIGHT = innerHeight;

// Create WebGL Renderer
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, WIDTH / HEIGHT, .1 ,10000);
scene.background = new THREE.Color(0x001155);



//CUBE
let geometry = new THREE.BoxGeometry( 1, 1, 1 );
let material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
let cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
camera.lookAt (cube.position);

//LIGHTS
//create Directional light
let directionalLight = new THREE.DirectionalLight(0xffffff , 1 );
directionalLight.target = cube;
directionalLight.castShadow = true;
scene.add(directionalLight);
//create ambient light
let ambientLight = new THREE.AmbientLight(0xffffff , .3);
scene.add(ambientLight);

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    camera.position.z += 0.01;
    renderer.render( scene, camera );
	requestAnimationFrame( animate );
}

animate();
