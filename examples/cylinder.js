'use strict';
const { scene, screen } = require('./word/word');
const { Cylinder } = require('../firgures/figures');
const { getRandom } = require('./utils/utils');

function createFigure() {
	new Cylinder({
		screen,
		scene,
		pos: {
			x: getRandom(0, 20),
			y: getRandom(20, 25),
			z: getRandom(0, 5)
		},
		size: {
			x: 3,
			y: 20,
			z: 30
		},
		mass: 1 + 2 * Math.random()
	});
}

for (let i = 0; i < 30; i++) {
	createFigure();
}
