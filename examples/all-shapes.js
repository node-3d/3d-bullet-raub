'use strict';

const { scene, screen } = require('./word/word_move');
const { Box, Sphere, Cylinder } = require('3d-core-raub');
const { getRandom } = require('./utils/utils');


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
