var THREE = require('three');

var scene = new THREE.Scene();
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
let camera = new THREE.PerspectiveCamera(
    35, WIDTH / HEIGHT, .1 ,10000);

let renderer , mesh = null;


function main(){
    console.log('init');
    renderer = new THREE.WebGLRenderer(
        {
            canvas:document.getElementById('myCanvas'),
            antialias: true
        }
    );
    renderer.setClearColor(0x00ff00);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    
    let geom = new THREE.BoxGeometry(100,100,100);
    let mat = new THREE.MeshBasicMaterial();
    mesh = new THREE.Mesh(geom , mat);
    mesh.position.set(0,0,-1000);


    scene.add(mesh);

    requestAnimationFrame(render);


}

function render(){
    mesh.rotation.x += 0.1;
    mesh.rotation.z += 0.1;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

main();