var THREE = require('three');

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

    mt = new THREE.MeshPhongMaterial( {
        color: 0x999999,
        specular: 0x0000ff,
        shininess:10,
        side: THREE.FrontSide,
        map: new THREE.TextureLoader().load('wood.jpg')
    });

    // GEOMS
    // g = new THREE.SphereGeometry( 48, 16, 16 );
    g = new THREE.BoxGeometry(40,40,40);
    m = new THREE.Mesh( g, mt );
    m.position.set(-100,0,-1000);

    g2 = new THREE.SphereGeometry( 32, 16, 16 );
    m2 = new THREE.Mesh( g2, mt );
    m2.position.set(100,0,-1000);

    // FLOOR
    let floorGeom = new THREE.PlaneGeometry(200,200,10,10);
    let floorMesh = new THREE.Mesh( floorGeom, mt);
    floorMesh.position.set(0, -10, -100);
    floorMesh.rotation.set( THREE.Math.degToRad(-90) ,0,0 );

    

    // LIGHTS
    let ambientLight = new THREE.AmbientLight(0xffffff , 0.5);
    let spotLight =  new THREE.PointLight(0xffffaa, 0.9);
    spotLight.position.set(0,100,100);

    
    scene.add( m );
    scene.add( m2 );
    scene.add( floorMesh );
    scene.add(ambientLight);
    scene.add(spotLight);

    // RENDER
    render();
}

function render(){
    m.rotation.z += 0.005;
    m.rotation.x += 0.005;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

// MAIN 
main();