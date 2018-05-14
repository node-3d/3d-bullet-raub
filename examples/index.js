'use strict';

const core3d = require('3d-core-raub');
const bullet3d = require('3d-bullet-raub');

const { getRandom, getRandomPosition } = require('./utils/random');
const { screen, scene } = require('./utils/world');


bullet3d(core3d);


const { three, bullet, Image, doc } = core3d;
const { Box, Sphere, Cylinder, Capsule } = bullet;


const icon = new Image();
icon.src = __dirname + '/bullet.ico';
icon.on('load', () => doc.icon = icon);

doc.title = 'All Shapes';


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


const createCylinder = () => new Cylinder({
	...getCommonOpts(),
	radius: getRandom(0.5, 2),
	height: getRandom(5, 10),
});


const createBox = () => new Box({
	...getCommonOpts(),
	size: { x: getRandom(1, 5), y: getRandom(1, 5), z: getRandom(1, 5) },
});


const createSphere = () => new Sphere({
	...getCommonOpts(),
	radius: getRandom(2, 3),
});


const createCapsule = () => new Capsule({
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
