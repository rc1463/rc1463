/***********
 * triangle015.js
 * A square with orbit control
 * M. Laszlo
 * September 2019
 ***********/

let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();


function createScene() {
	let n = 10;     //number of sides for the cylinder
    let rd =  5.0;    //radius
    let ht = 8.0;     //height     
    let clr = 0x228B22;  //cylinder's color

    let axes = new THREE.AxesHelper(10);
    let cylinder_mesh = linedCylinder(n, rd, ht, clr);
    scene.add(cylinder_mesh);
    //scene.add(axes);
}


function linedCylinder(n, radius, height, color)
{

 //Creates a new cylinder object
 var new_geo = new THREE.CylinderGeometry(radius, radius, height,n,1,true);
 
//Creates material with user generated color and wireframe
 var material = new THREE.MeshBasicMaterial( {color: color, wireframe: true} );
 
//Creates mesh
 var cylinder = new THREE.Mesh(new_geo, material);
 
 //Returns mesh
 return cylinder;
}




function animate() {
	window.requestAnimationFrame(animate);
	render();
}


function render() {
    let delta = clock.getDelta();
    cameraControls.update(delta);
	renderer.render(scene, camera);
}


function init() {
	let canvasWidth = window.innerWidth;
	let canvasHeight = window.innerHeight;
	let canvasRatio = canvasWidth / canvasHeight;

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer({antialias : true, preserveDrawingBuffer: true});
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor(0x000000, 1.0);

	camera = new THREE.PerspectiveCamera( 40, canvasRatio, 1, 1000);
	camera.position.set(0, 0, 30);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
}


function addToDOM() {
	let container = document.getElementById('container');
	let canvas = container.getElementsByTagName('canvas');
	if (canvas.length>0) {
		container.removeChild(canvas[0]);
	}
	container.appendChild( renderer.domElement );
}


init();
createScene();
addToDOM();
render();
animate();

