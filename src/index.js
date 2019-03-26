var THREE = require('three');
var FRAGMENT = require('./shaders/fragmentShader').FRAGMENT;
var VERTEX = require('./shaders/vertexShader').VERTEX;

var scene = new THREE.Scene();
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
// CAMERA
let camera = new THREE.PerspectiveCamera(
    35, WIDTH / HEIGHT, .1 ,10000);
camera.position.z = 550;
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


    //MATERIALS
    material = new THREE.MeshLambertMaterial( {
        color: 0xEEEEEE,
        side: THREE.DoubleSide,
    });

    // GEOMS
    boxGeom = new THREE.BoxGeometry( 64, 64, 64 );
    boxMesh = new THREE.Mesh( boxGeom, material );
    boxMesh.position.set(100,0,0);
    scene.add(boxMesh);

    floorGeom = new THREE.PlaneGeometry(1000,1000,100,100);
    floorMesh = new THREE.Mesh( floorGeom, material);
    floorMesh.position.set(0, -50,0);
    floorMesh.rotation.set( THREE.Math.degToRad(-90) ,0,0 );
    scene.add(floorMesh);

    // SET SHADOW MAP
    boxMesh.castShadow = true;
    floorMesh.receiveShadow = true;

    // LIGHTS
    ambientLight =  new THREE.AmbientLight(0xFFFFFF, 0.1);
    scene.add(ambientLight);
    
    spotLight =  new THREE.SpotLight(0xEEEEFF, 2 , 1000);
    spotLight.position.set( 200, 200, 100 );
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.01;
    spotLight.decay = 2;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    //create shadow
    //spotLight.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera(100,1,500,1000));
    //spotLight.shadow.bias = 0.001;

    scene.add(spotLight);
    
    lightHelper = new THREE.SpotLightHelper( spotLight );
	scene.add( lightHelper );



    /*
    // LIGHTS


*/

    // RENDER
    render();
}

function render() {
    boxMesh.rotation.z += 0.01;
    boxMesh.rotation.x += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

// MAIN 
main();