'use strict';
const { scene, screen } = require('./word/word');
const { Cylinder } = require('../firgures/figures');
const { getRandom } = require('./utils/utils');

function createFigure() {
	new Cylinder({
		screen,
		scene,
		pos: {
			x: getRandom(0, 30),
			y: getRandom(20, 150),
			z: getRandom(0, 10)
		},
		size: {
			radius: getRandom(1, 4),
			height: getRandom(10, 20)
		},
		mass: getRandom(3, 4)
	});
}

for (let i = 0; i < 50; i++) {
	createFigure();
}
