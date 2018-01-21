'use strict';
const { scene, screen } = require('./word/word_mipmapping');
const { Cylinder } = require('../firgures/figures');
const { getRandom } = require('./utils/utils');

function createFigure() {
	new Cylinder({
		screen,
		scene,
		pos: {
			x: getRandom(-5, 5),
			y: getRandom(20, 150),
			z: getRandom(-5, 5)
		},
		size: {
			radius: getRandom(1, 3),
			height: getRandom(3, 10)
		},
		mass: getRandom(3, 4)
	});
}

for (let i = 0; i < 50; i++) {
	createFigure();
}
