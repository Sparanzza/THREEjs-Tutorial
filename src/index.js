var THREE = require('three');

var scene = new THREE.Scene();
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
// CAMERA
let camera = new THREE.PerspectiveCamera(
    35, WIDTH / HEIGHT, .1 ,10000);

let renderer , mesh, mesh2, lathe, planeMesh, geomPlane = null;

function main(){
    console.log('init');
    renderer = new THREE.WebGLRenderer(
        {
            canvas:document.getElementById('myCanvas'),
            antialias: true
        }
    );
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    
    // GEOMS

    // cube
    let geom = new THREE.BoxGeometry(100,100,100);
    let mat = new THREE.MeshLambertMaterial({
        color: 0xeaf1fc
    });
    mesh = new THREE.Mesh(geom , mat);
    mesh.position.set(150,0,-1000);

    // vertexs
    let geom2 = new THREE.Geometry();
    geom2.vertices.push(
        new THREE.Vector3(-10,10,0),
        new THREE.Vector3(-10,-10,0),
        new THREE.Vector3(10,-10,0),
    );
    geom2.faces.push( new THREE.Face3(0,1,2));
    let mat2 = new THREE.MeshLambertMaterial({
        color: 0xeaf1fc
    });
    mesh2 = new THREE.Mesh(geom2 , mat2);
    mesh2.position.set(0,0,-1000);

    geomPlane = new THREE.PlaneGeometry(10,10 ,32);
    planeMesh = new THREE.Mesh(geomPlane, mat);
    planeMesh.position.z = -100;


    //POINTS

    let points = []
    for (let i = 0; i < 10; i +=1){
        points.push( new THREE.Vector2( 5 + Math.sin(i*.1) * 40 , i * 2 ));
    }
    let geom3 = new THREE.LatheGeometry( points );
    let mat3 = new THREE.MeshLambertMaterial( { color: 0xffff00 } );
    lathe = new THREE.Mesh( geom3, mat3 );
    lathe.position.set(-100,0,-1000);

    // LIGHTS
    let ambientLight = new THREE.AmbientLight(0xffffff , 0.5);
    let spotLight =  new THREE.PointLight(0xffffff, 0.5);

    // scene.add(mesh);
    // scene.add(mesh2);
    // scene.add(lathe);
    scene.add(ambientLight);
    scene.add(spotLight);
    // scene.add(planeMesh);

    // RENDER
    render();
}
let delta = 0;
function render(){
    mesh.rotation.x += 0.01;
    mesh.rotation.z += 0.01;

    lathe.rotation.x += 0.01;
    lathe.rotation.z += 0.01;
    planeMesh.rotation.z += 0.01;
    // planeMesh.rotation.z += 0.01;

    delta+=0.1;
    geomPlane.vertices[0].x = -25 + Math.sin(delta)*5;
    geomPlane.verticesNeedUpdate = true;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

// MAIN 
main();