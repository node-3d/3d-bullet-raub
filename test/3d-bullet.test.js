'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');
const three = require('three');
const { init } = require('3d-core-raub');
const { init: initBullet } = require('..');

init();

const inited = initBullet({ three });

const {
	Shape, scene,
} = inited;

const initResults = [
	'Shape', 'scene', 'bullet',
];

const initedClasses = {
	Shape: {
		create() {
			return new Shape();
		},
		props: ['debug', 'mesh'],
	},
};


const tested = describe('Bullet 3D Inited', async () => {
	it('returns all init results', () => {
		initResults.forEach(
			(name) => assert.ok(
				typeof inited[name],
				`Init field "${name}" is missing.`,
			),
		);
	});
	
	Object.keys(initedClasses).forEach((c) => {
		it(`exports class "${c}"`, () => {
			assert.strictEqual(typeof inited[c], 'function');
		});
		
		const current = initedClasses[c];
		const instance = current.create();
		
		it(`is valid instance of ${c}`, () => {
			assert.ok(
				instance instanceof inited[c],
				`Can't instantiate class "${c}".`,
			);
		});
		
		it(`exposes properties of "${c}"`, () => {
			current.props.forEach((prop) => {
				assert.ok(
					typeof instance[prop] !== 'undefined',
					`Property "${c}.${prop}" not found.`,
				);
			});
		});
	});
});

(async () => {
	const interv = setInterval(() => scene.update(), 15);
	await tested;
	clearInterval(interv);
})();
