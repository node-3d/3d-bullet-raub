'use strict';
const { scene, screen } = require('./word/word');
const { Sphere } = require('../firgures/figures');
const { getRandom } = require('./utils/utils');

function createFigure() {
	new Sphere({
		screen,
		scene,
		pos: {
			x: getRandom(0, 30),
			y: getRandom(20, 150),
			z: getRandom(0, 10)
		},
		size:{
			radius: getRandom(2, 3)
		}
		mass: getRandom(3, 5),
		segments: 32
	});
}

for (let i = 0; i < 50; i++) {
	createFigure();
}
