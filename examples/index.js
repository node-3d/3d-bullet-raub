'use strict';

const core3d = require('3d-core-raub');
const bullet3d = require('3d-bullet-raub');

bullet3d(core3d);


const { three, bullet, Image, doc, Screen, loop } = core3d;
const { Box, Ball, Roll, Caps, Scene, Body } = bullet;


const icon = new Image();
icon.src = __dirname + '/bullet.ico';
icon.on('load', () => doc.icon = icon);

doc.title = 'All Shapes';


const spriteMap = new three.TextureLoader().load('textures/texture_1.jpg');


const getRandom = (min, max) => Math.random() * (max - min) + min;

const getRandomPosition = () => ({
	x: getRandom(-10, 10),
	y: getRandom(20, 2000),
	z: getRandom(-10, 10)
});


const screen = new Screen();
screen.camera.position.z = 60;
screen.camera.position.y = 20;
screen.camera.up = new three.Vector3(0, 1, 0);
screen.camera.lookAt(new three.Vector3(0, 0, 0));

let dx = 0;
let dy = 0;
let dz = 0;


const F_KEY = 70;
const UP_ARROW = 87;
const DOWN_ARROW = 83;
const LEFT_ARROW = 65;
const RIGHT_ARROW = 68;

screen.on('keydown', e => {
	
	if (e.keyCode === F_KEY) {
		if (e.ctrlKey && e.shiftKey) {
			screen.mode = 'windowed';
		} else if (e.ctrlKey && e.altKey) {
			screen.mode = 'fullscreen';
		} else if (e.ctrlKey) {
			screen.mode = 'borderless';
		}
	}
	
	if (e.keyCode === UP_ARROW) {
		dz = -0.2;
	} else if (e.keyCode === DOWN_ARROW) {
		dz = 0.2;
	} else if (e.keyCode === LEFT_ARROW) {
		dx = -0.2;
	} else if (e.keyCode === RIGHT_ARROW) {
		dx = 0.2;
	}
	
});

screen.on('keyup', e => {
	
	if (e.keyCode === UP_ARROW || e.keyCode === DOWN_ARROW) {
		dz = 0;
	} else if (e.keyCode === LEFT_ARROW || e.keyCode === RIGHT_ARROW) {
		dx = 0;
	}
	
});

loop(() => {
	screen.camera.position.x += dx;
	screen.camera.position.y += dy;
	screen.camera.position.z += dz;
	screen.draw();
});


const pgeo = new three.PlaneGeometry(100, 100, 4, 4);

//-----------------------------------------------------------------------------------

spriteMap.wrapS = three.RepeatWrapping;
spriteMap.wrapT = three.RepeatWrapping;
//spriteMap.anisotropy = 1;
spriteMap.repeat.set(8, 8);
//spriteMap.repeat.set(32, 32);
//spriteMap.generateMipmaps = true;
//spriteMap.needsUpdate = true;
var spriteMaterial = new three.MeshBasicMaterial({ map: spriteMap });

//-----------------------------------------------------------------------------------

const pmesh = new three.Mesh(pgeo, spriteMaterial);
screen.scene.add(pmesh);
pmesh.rotation.x = -Math.PI * 0.5;
//-----


const light = new three.AmbientLight(0x666666); // soft white light
screen.scene.add(light);


const pointLight = new three.PointLight(0xffffff, 1, 100000);
screen.scene.add(pointLight);
pointLight.position.x = 200;
pointLight.position.y = 2000;
pointLight.position.z = 500;


const scene = new Scene();
const _draw = screen.draw.bind(screen);
screen.draw = () => {
	scene.update();
	_draw();
};


const plane = new Body({ scene });
plane.type = 'plane';
screen.plane = plane;


const raycaster = new three.Raycaster();
const mouse = new three.Vector2();


screen.on('mousedown', e => {
	
	mouse.x = ( e.x / screen.w ) * 2 - 1;
	mouse.y = -( e.y / screen.h ) * 2 + 1;
	
	raycaster.setFromCamera( mouse, screen.camera );
	const ray = raycaster.ray;
	
	const start = ray.origin;
	const end = ray.at(100000);
	
	const { body } = scene.hit(start, end);
	
	if (body && body.mass) {
		if (e.button === 0) {
			body.vell = [0, 100 * Math.random(), 0];
		} else if (e.button === 1) {
			body.destroy();
		}
	}
	
});


const getCommonOpts = () => ({
	screen,
	scene,
	pos: getRandomPosition(),
	mass: getRandom(0.3, 4),
	color: Math.floor(0xFFFFFF) * Math.random(),
});


const createCylinder = () => new Roll({
	...getCommonOpts(),
	radius: getRandom(0.5, 2),
	height: getRandom(5, 10),
});


const createBox = () => new Box({
	...getCommonOpts(),
	size: { x: getRandom(1, 5), y: getRandom(1, 5), z: getRandom(1, 5) },
});


const createSphere = () => new Ball({
	...getCommonOpts(),
	radius: getRandom(2, 3),
});


const createCapsule = () => new Caps({
	...getCommonOpts(),
	radius: getRandom(0.5, 2),
	height: getRandom(5, 10),
});


for (let i = 0; i < 40; i++) {
	
	createBox();
	
	createCylinder();
	
	createCapsule();
	
	createSphere();
	
}
