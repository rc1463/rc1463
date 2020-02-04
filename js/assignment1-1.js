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
    let n = 8;
    let inner = new THREE.Color(0xFFD700);
    let outer = new THREE.Color(0x781c2e);
    let axes = new THREE.AxesHelper(10);
    let polygon_mesh = regularPolygonGeometry(n, inner, outer);
    scene.add(polygon_mesh);
    scene.add(axes);

}


function regularPolygonGeometry(n , innerColor, outerColor)
{ 
   var new_geo = new THREE.Geometry();
   //new_geo.vertices.push( new THREE.Vector3(0,0,0));
	
	//Creates vertices
	for ( var vt = 0 ; vt < n; vt++ )
	{
		// Rotates counterclockwise around 90 degrees
		var angle = (Math.PI/2) + (vt / n) * 2 * Math.PI;

		var x = 2 * Math.cos( angle );
		var y = 2 * Math.sin( angle );
		
        //Stores the vertex location
        new_geo.vertices.push( new THREE.Vector3(x,y,0));
	}
    
    //Saves colors for each vertex of each face
    for ( var i = 0; i< n-2; i++) {	
    new_geo.faces.push( new THREE.Face3(0,i+1,i+2));   
    new_geo.faces[i].vertexColors[0] = new THREE.Color(innerColor);
    new_geo.faces[i].vertexColors[1] = new THREE.Color(outerColor);
    new_geo.faces[i].vertexColors[2] = new THREE.Color(outerColor);
    }


 var material = new THREE.MeshBasicMaterial( {vertexColors:THREE.VertexColors, side:THREE.DoubleSide} );
 var polygon = new THREE.Mesh(new_geo, material);
 return polygon;
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

