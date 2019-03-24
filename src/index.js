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

    // mt = new THREE.MeshPhongMaterial( {
    //     color: 0x999999,
    //     specular: 0x0000ff,
    //     shininess:10,
    //     side: THREE.FrontSide,
    //     map: new THREE.TextureLoader().load('wood.jpg'),
    //     normalMap : new THREE.TextureLoader().load('wood.jpg')
    // });
    // mt = new THREE.MeshStandardMaterial( {
    //     color: 0x999999,
    //     specular: 0x0000ff,
    //     metalness:.5,
    //     roughness:0.3,
    //     side: THREE.FrontSide,
    // });
    mt = new THREE.LineDashedMaterial({
        dashSize:2,
        gapSize: 2
    });

    // GEOMS
    // g = new THREE.SphereGeometry( 48, 16, 16 );
    g = new THREE.BoxGeometry(64,64,64);
    m = new THREE.Line( g, mt );
    m.position.set(-100,0,-1000);

    g2 = new THREE.SphereGeometry( 64, 16, 16 );
    m2 = new THREE.Line( g2, mt );
    m2.position.set(100,0,-1000);

    // FLOOR
    let floorGeom = new THREE.PlaneGeometry(200,200,10,10);
    let floorMesh = new THREE.Line( floorGeom, mt);
    floorMesh.position.set(0, -20, -200);
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
    camera.position.z += 1;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

// MAIN 
main();