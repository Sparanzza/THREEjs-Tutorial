var THREE = require('three');
var FRAGMENT = require('./shaders/fragmentShader').FRAGMENT;
var VERTEX = require('./shaders/vertexShader').VERTEX;

var scene = new THREE.Scene();
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
// CAMERA
let camera = new THREE.PerspectiveCamera(
    35, WIDTH / HEIGHT, .1 ,10000);

    let g, mt, m;
    let g2, mt2, m2;


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
    
    // mt = new THREE.MeshStandardMaterial( {
    //      color: 0x999999,
    //      specular: 0x0000ff,
    //      metalness:.5,
    //      roughness:0.1,
    //      side: THREE.FrontSide,
    //  });

    // mt = new THREE.LineDashedMaterial({
        //     dashSize:2,
        //     gapSize: 2
        // });
        
    var uniforms = {
        delta:{ value:0 }
    }
    mt = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT
    });
    // GEOMS
    // g = new THREE.SphereGeometry( 48, 16, 16 );
    g = new THREE.BoxGeometry(64,64,64);
    m = new THREE.Mesh( g, mt );
    m.position.set(-100,0,0);

    g2 = new THREE.SphereGeometry( 64, 16, 16 );
    m2 = new THREE.Mesh( g2, mt );
    m2.position.set(100,0,0);

    // FLOOR
    let floorGeom = new THREE.PlaneGeometry(500,500,10,10);
    let floorMesh = new THREE.Mesh( floorGeom, mt);
    floorMesh.position.set(0, -100,0);
    floorMesh.rotation.set( THREE.Math.degToRad(-90) ,0,0 );
    
    // LIGHTS
    let ambientLight = new THREE.AmbientLight(0xEAEAEA , 0.5);
    let spotLight =  new THREE.PointLight(0xEAEAEA, 0.9);
    spotLight.position.set(0,100,100);
    
    
    scene.add( m );
    scene.add( m2 );
    scene.add( floorMesh );
    scene.add(ambientLight);
    scene.add(spotLight);

    var vertexDisplacement = new Float32Array( g.attributes.position.count);
    for(let i = 0; i < vertexDisplacement.length; i++) {
        vertexDisplacement[i] = Math.sin(i);
    }

    // RENDER
    render();
}

function render(){
    m.rotation.z += 0.005;
    m.rotation.x += 0.005;
    camera.position.z -= 0.5;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}


// MAIN 
main();