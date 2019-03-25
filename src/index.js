var THREE = require('three');
var FRAGMENT = require('./shaders/fragmentShader').FRAGMENT;
var VERTEX = require('./shaders/vertexShader').VERTEX;

var scene = new THREE.Scene();
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
// CAMERA
let camera = new THREE.PerspectiveCamera(
    35, WIDTH / HEIGHT, .1 ,1000);

var g, mt, m;
let g2, mt2, m2;

var customUniforms = {
    delta: {value: 0}
};
var renderer;


var delta = 0;

function main(){
    renderer = new THREE.WebGLRenderer(
        {
            canvas:document.getElementById('myCanvas'),
            antialias: true
        }
    );
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    camera.position.z = 1000;

    //MATERIALS
    // material = new THREE.MeshBasicMaterial( {color: 0xffff00} );

    // material = new THREE.MeshLambertMaterial( {
    //     color: 0xff0000,
    //     transparent: true,
    //     opacity:1,
    //     wireframe: true,
    //     wireframeLinewidth: 6,
    //     wireframeLinecap: 'round',
    //     wireframeLinejoin: 'round'
    // });

    // material = new THREE.MeshNormalMaterial( {
    //      color: 0xff0000,
    //      transparent: true,
    //      opacity:1,
    //      wireframeLinewidth: 6,
    //      wireframeLinecap: 'round',
    //      wireframeLinejoin: 'round'
    //  });

    // mt = new THREE.MeshLambertMaterial( {
    //     color: 0xfafafa,
    //     side: THREE.FrontSide
    // });

    // mt = new THREE.MeshPhongMaterial( {
    //     color: 0x999999,
    //     specular: 0x0000ff,
    //     shininess:10,
    //     side: THREE.FrontSide,
    //     map: new THREE.TextureLoader().load('wood.jpg'),
    //     normalMap : new THREE.TextureLoader().load('wood.jpg')
    // });
    
    mt = new THREE.MeshStandardMaterial( {
        color: 0xBBBBBB,
        metalness:.5,
        roughness:0.1,
        side: THREE.FrontSide,
    });

    // mt = new THREE.LineDashedMaterial({
        //     dashSize:2,
        //     gapSize: 2
        // });
         
    // mt = new THREE.ShaderMaterial({
    //     uniforms: customUniforms,
    //     vertexShader: VERTEX,
    //     fragmentShader: FRAGMENT
    // });
    // GEOMS

    g = new THREE.SphereGeometry( 64, 16, 16 );
    m = new THREE.Mesh( g, mt );
    m.position.set(100,0,0);

    // FLOOR
    let floorGeom = new THREE.PlaneGeometry(5000,5000,10,10);
    let floorMesh = new THREE.Mesh( floorGeom, mt);
    floorMesh.position.set(0, -100,0);
    floorMesh.rotation.set( THREE.Math.degToRad(-90) ,0,0 );
    
    // LIGHTS
    let ambientLight = new THREE.AmbientLight(0xEAEAEA , 0.5);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    

    let spotLight =  new THREE.PointLight(0xFF88EA, 0.9);
    spotLight.position.set(0,100,0);
    spotLight.target = m2;
    spotLight.castShadow = true;
    spotLight.shadow = new THREE.LightShadow(
        new THREE.PerspectiveCamera(100,1,500,1000)
        );
    spotLight.shadow.bias = 0.001;
    spotLight.shadow.mapSize.width = 2048 * 2;
    spotLight.shadow.mapSize.height = 2048 * 2;

    m.castShadow = true;
    floorMesh.receiveShadow = true;

    

 
    scene.add( m );
    scene.add( m2 );
    scene.add( floorMesh );
    scene.add(ambientLight);
    scene.add(spotLight);

    // RENDER
    render();
}

    function render() {

    	renderer.render(scene, camera);
    	requestAnimationFrame(render);
    }


// MAIN 
main();