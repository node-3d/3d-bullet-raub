'use strict';

const { scene, screen } = require('./word/word_move');
const { three, bullet, Image, doc } = require('3d-core-raub');
const { Box, Sphere, Cylinder } = bullet;
const { getRandom } = require('./utils/utils');


const icon = new Image();
icon.src = __dirname + '/bullet.ico';
icon.on('load', () => doc.icon = icon);

doc.title = 'All Shapes';


const raycaster = new THREE.Raycaster();
const mouse = new three.Vector2();

screen.on('mousedown', e => {
	
	mouse.x = ( e.x / screen.w ) * 2 - 1;
	mouse.y = - ( e.y / screen.h ) * 2 + 1;
	
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


function getRandomPosition() {
	return {
		x: getRandom(-10, 10),
		y: getRandom(20, 2000),
		z: getRandom(-10, 10)
	};
}

function createCylinder() {
	new Cylinder({
		screen,
		scene,
		pos: getRandomPosition(),
		size: {
			radius: getRandom(0.5, 2),
			height: getRandom(5, 10)
		},
		mass: getRandom(0.3, 4)
	});
}

function createBox() {
	new Box({
		screen,
		scene,
		pos: getRandomPosition(),
		size: {
			x: getRandom(1, 5),
			y: getRandom(1, 5),
			z: getRandom(1, 5)
		},
		mass: getRandom(0.3, 4)
	});
}

function createSphere() {
	new Sphere({
		screen,
		scene,
		pos: getRandomPosition(),
		size: {
			radius: getRandom(2, 3)
		},
		mass: getRandom(0.3, 4),
		segments: 32
	});
}

for (let i = 0; i < 50; i++) {
	createBox();
	createCylinder();
	createSphere();
}
