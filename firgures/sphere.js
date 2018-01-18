'use strict';

const { three } = require('node-3d-ready-raub');
const { Body } = require('node-bullet-raub');

class Sphere {
	constructor(opts) {
		const { screen, scene } = opts;

		const pos = opts.pos || { x: 0, y: 0, z: 0 };
		const size = opts.size || { x: 1, y: 1, z: 1 };
		const mass = opts.mass || 1;

		const geometry = new three.SphereGeometry(size.x, size.y, size.z);
		const material = new three.MeshLambertMaterial({
			color: Math.round(0xffffff * Math.random())
			// map: new THREE.TextureLoader().load('TODO'),
		});
		const mesh = new three.Mesh(geometry, material);
		screen.scene.add(mesh);

		mesh.position.set(pos.x, pos.y, pos.z);

		const body = new Body({ scene: opts.scene });

		body.type = 'ball';
		body.pos = pos;
		body.size = { x: opts.size.x + 1, y: 4, z: 5 };
		body.mass = mass;

		body.on('update', ({ pos, quat }) => {
			mesh.position.set(pos.x, pos.y, pos.z);
			mesh.quaternion.set(quat.x, quat.y, quat.z, quat.w);
		});
	}
}

module.exports = Sphere;
