'use strict';

const { three } = require('node-3d-ready-raub');
const { Body } = require('node-bullet-raub');

class Cylinder {
	constructor(opts) {
		const { screen, scene } = opts;

		const pos = opts.pos || { x: 0, y: 0, z: 0 };
		const size = opts.size || { radius: 1, height: 5 };
		const mass = opts.mass || 1;
		const radialSegments = opts.radialSegments || 32;

		const geometry = new three.CylinderGeometry(size.radius, size.radius, size.height, radialSegments);
		const material = new three.MeshLambertMaterial({
			color: Math.round(0xffffff * Math.random())
			// map: new THREE.TextureLoader().load('TODO'),
		});
		const mesh = new three.Mesh(geometry, material);
		screen.scene.add(mesh);

		mesh.position.set(pos.x, pos.y, pos.z);

		const body = new Body({ scene: opts.scene });

		body.type = 'roll';
		body.pos = pos;
		const diameter = size.radius * 2;
		body.size = { x: diameter, y: size.height, z: diameter };
		body.mass = mass;

		body.on('update', ({ pos, quat }) => {
			mesh.position.set(pos.x, pos.y, pos.z);
			mesh.quaternion.set(quat.x, quat.y, quat.z, quat.w);
		});
	}
}

module.exports = Cylinder;
