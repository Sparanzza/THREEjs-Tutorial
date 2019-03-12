var THREE = require('three');

var scene = new THREE.Scene();

function main(){
    console.log('init');

    var renderer = new THREE.WebGLRenderer(
        {
            canvas:document.getElementById('myCanvas'),
            antialias: true
        }
    );
    renderer.setClearColor(0x00ff00);
    renderer.setPixelRatio()
}

main();