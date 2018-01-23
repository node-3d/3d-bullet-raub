'use strict';
const { scene, screen } = require('./word/word_move');
const { Sphere } = require('../firgures/figures');
const { getRandom } = require('./utils/utils');

function createFigure() {
	new Sphere({
		screen,
		scene,
		pos: {
			x: getRandom(-5, 5),
			y: getRandom(20, 150),
			z: getRandom(-5, 5)
		},
		size: {
			radius: getRandom(2, 3)
		},
		mass: getRandom(3, 5),
		segments: 32
	});
}

for (let i = 0; i < 50; i++) {
	createFigure();
}
