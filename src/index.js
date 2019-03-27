var THREE = require('three');
var FRAGMENT = require('./shaders/fragmentShader').FRAGMENT;
var VERTEX = require('./shaders/vertexShader').VERTEX;

var scene = new THREE.Scene();
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
// CAMERA
let camera = new THREE.PerspectiveCamera(
    35, WIDTH / HEIGHT, .1 ,10000);
camera.position.z = 250;
var renderer = null;

function main(){
    // RENDERER
    renderer = new THREE.WebGLRenderer(
        {
            canvas:document.getElementById('myCanvas'),
            antialias: true
        }
    );
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.renderReverseSided = true;


    //MATERIALS
    material = new THREE.MeshLambertMaterial( {
        color: 0xEEEEEE,

    });

    // GEOMS
    boxGeom = new THREE.BoxGeometry( 32, 32, 32 );
    boxMesh = new THREE.Mesh( boxGeom, material );
    boxMesh.position.set(50,0,0);
    scene.add(boxMesh);

    floorGeom = new THREE.PlaneBufferGeometry( 400, 400, 320, 320 );
    floorMesh = new THREE.Mesh( floorGeom, material);
    floorMesh.position.set(0, -50,0);
    floorMesh.rotation.set( THREE.Math.degToRad(-90) ,0,0 );
    scene.add(floorMesh);

    // SET SHADOW MAP
    boxMesh.castShadow = true;
    boxMesh.receiveShadow = true;
    floorMesh.receiveShadow = true;

    // LIGHTS
    ambientLight =  new THREE.AmbientLight(0xFFFFFF, 0.1);
    scene.add(ambientLight);
    
    spotLight =  new THREE.SpotLight(0xEEEEFF, 2 , 1000);
    spotLight.position.set( 200, 200, 200 );
    spotLight.angle = Math.PI / 10;
    spotLight.penumbra = 0.01;
    spotLight.decay = 2;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    //create shadow
    //spotLight.shadow.bias = 0.001;
    scene.add(spotLight);
    
    lightHelper = new THREE.SpotLightHelper( spotLight );
	scene.add( lightHelper );

    // RENDER
    render();
}
var delta = 0;
function render() {
    delta +=0.002;
    camera.lookAt(boxMesh.position);

    camera.position.x = Math.sin(delta)*200;
    camera.position.z = Math.cos(delta)*200;

    boxMesh.rotation.z += 0.01;
    boxMesh.rotation.x += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

// MAIN 
main();