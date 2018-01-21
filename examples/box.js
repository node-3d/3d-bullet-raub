'use strict';
const { scene, screen } = require('./word/word');
const { Box } = require('../firgures/figures');
const { getRandom } = require('./utils/utils');

function createFigure() {
	new Box({
		screen,
		scene,
		pos: {
			x: getRandom(0, 5),
			y: getRandom(20, 25),
			z: getRandom(0, 5)
		},
		size: {
			x: getRandom(1, 3),
			y: getRandom(1, 3),
			z: getRandom(1, 3)
		},
		mass: getRandom(1, 2)
	});
}

for (let i = 0; i < 30; i++) {
	createFigure();
}
