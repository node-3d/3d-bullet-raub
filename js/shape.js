'use strict';

const { Body } = require('bullet-raub');


const _init = ({ scene }) => {
	class Shape extends Body {
		
		constructor(opts) {
			const { scene: sceneOpts, mesh } = opts;
			const sceneFinal = sceneOpts || scene;
			super({ ...opts, scene: sceneFinal });
			
			this.mesh = mesh || null;
			if (mesh) {
				const pos = this.pos;
				mesh.position.set(pos.x, pos.y, pos.z);
			}
			
			this.on('update', ({ pos, quat }) => {
				if (this.mesh) {
					this.mesh.position.set(pos.x, pos.y, pos.z);
					this.mesh.quaternion.set(quat.x, quat.y, quat.z, quat.w);
				}
			});
			
			this.on('destroy', () => {
				if (this.mesh) {
					this.mesh.visible = false;
				}
			});
		}
	}
	
	return Shape;
};

let inited = null;
const init = (opts) => {
	if (inited) {
		return inited;
	}
	inited = _init(opts);
	return inited;
};

module.exports = init;
