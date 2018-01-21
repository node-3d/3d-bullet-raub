'use strict';
const { scene, screen } = require('./word/word');
const { Capsule } = require('../firgures/figures');
const { getRandom } = require('./utils/utils');

function createFigure() {
	new Capsule({
		screen,
		scene,
		pos: {
			x: getRandom(0, 20),
			y: getRandom(20, 25),
			z: getRandom(0, 5)
		},
		size: {
			x: 2,
			y: 32,
			z: 32
		},
		mass: getRandom(1, 2)
	});
}

for (let i = 0; i < 30; i++) {
	createFigure();
}
