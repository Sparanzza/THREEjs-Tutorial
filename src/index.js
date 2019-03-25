var THREE = require('three');
var FRAGMENT = require('./shaders/fragmentShader').FRAGMENT;
var VERTEX = require('./shaders/vertexShader').VERTEX;

var scene = new THREE.Scene();
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
// CAMERA
let camera = new THREE.PerspectiveCamera(
    35, WIDTH / HEIGHT, .1 ,10000);

var g, mt, m;
let g2, mt2, m2;

var customUniforms = {
    delta: {value: 0}
};
   


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
    
    mt2 = new THREE.MeshStandardMaterial( {
        color: 0xBBBBBB,
        metalness:.5,
        roughness:0.1,
        side: THREE.FrontSide,
    });

    // mt = new THREE.LineDashedMaterial({
        //     dashSize:2,
        //     gapSize: 2
        // });
         
    mt = new THREE.ShaderMaterial({
        uniforms: customUniforms,
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT
    });
    // GEOMS
    // g = new THREE.SphereGeometry( 48, 16, 16 );
    g = new THREE.BoxBufferGeometry(100,100,100,10,10,10);
    m = new THREE.Mesh( g, mt );
    m.position.set(-100,0,0);

    g2 = new THREE.SphereGeometry( 64, 16, 16 );
    m2 = new THREE.Mesh( g2, mt2 );
    m2.position.set(100,0,0);

    // FLOOR
    let floorGeom = new THREE.PlaneGeometry(500,500,10,10);
    let floorMesh = new THREE.Mesh( floorGeom, mt2);
    floorMesh.position.set(0, -100,0);
    floorMesh.rotation.set( THREE.Math.degToRad(-90) ,0,0 );
    
    // LIGHTS
    let ambientLight = new THREE.AmbientLight(0xEAEAEA , 0.5);
    let spotLight =  new THREE.PointLight(0xFF88EA, 0.9);
    spotLight.position.set(0,100,100);
    
    var vertexDisplacement = new Float32Array( g.attributes.position.count);
    for(let i = 0; i < vertexDisplacement.length; i+=1 ) {
        vertexDisplacement[i] = Math.sin(i);
    }

    
    m.geometry.addAttribute('vertexDisplacement', new THREE.BufferAttribute(vertexDisplacement, 1));

    scene.add( m );
    scene.add( m2 );
    scene.add( floorMesh );
    scene.add(ambientLight);
    scene.add(spotLight);

    // RENDER
    render();
}

    function render() {

        delta += 0.1;

        //uniform
        m.mt.uniforms.delta.value = 0.5 + Math.sin(delta) * 0.5;

        //attribute
        for (var i = 0; i < vertexDisplacement.length; i ++) {
            vertexDisplacement[i] = 0.5 + Math.sin(i + delta) * 0.25;
        }
        m.geometry.attributes.vertexDisplacement.needsUpdate = true;


    	renderer.render(scene, camera);
    	requestAnimationFrame(render);
    }


// MAIN 
main();