'use strict';

const { Body } = require('bullet-raub');


const _init = ({ scene, three }) => {
	class Shape extends Body {
		
		constructor(opts = {}) {
			const { sceneBullet, sceneThree, mesh, debug, color, ...rest } = opts;
			const sceneFinal = sceneBullet || scene;
			super({ ...rest, scene: sceneFinal });
			
			this._meshDebug = null;
			this._sceneBullet = sceneBullet || scene;
			this._sceneThree = sceneThree || null;
			this._color = color || 0xb7fffa;
			
			this.mesh = mesh || null;
			
			// This will init the debug mesh if any
			this.debug = debug || null;
			
			this.on('update', ({ pos, quat }) => this._follow(pos, quat));
			
			this.on('destroy', () => {
				if (!this._mesh) {
					return;
				}
				this._mesh.visible = false;
				if (this._sceneThree) {
					this._sceneThree.remove(this._mesh);
				}
			});
			
			this.on('size', () => this._resetDebugMesh());
			this.on('type', () => this._resetDebugMesh());
		}
		
		get debug() { return this._debug; }
		set debug(v) {
			// In ctor, will init from `undefined` to something or `null`
			if (this._debug === v) {
				return;
			}
			
			if (v && v !== 'solid' && v !== 'wire') {
				console.warn('Option `debug` must be "solid" or "wire", if set.');
				console.trace();
				this._debug = null;
			} else {
				this._debug = v || null;
			}
			
			this._resetDebugMesh();
		}
		
		get mesh() { return this._mesh; }
		set mesh(v) {
			if (this._mesh === v) {
				return;
			}
			
			this._mesh = v || null;
			
			if (!this._mesh) {
				return;
			}
			
			const pos = this.pos;
			const quat = this.quat;
			this._mesh.position.set(pos.x, pos.y, pos.z);
			this._mesh.quaternion.set(quat.x, quat.y, quat.z, quat.w);
		}
		
		_follow(pos, quat) {
			if (this._mesh) {
				this._mesh.position.set(pos.x, pos.y, pos.z);
				this._mesh.quaternion.set(quat.x, quat.y, quat.z, quat.w);
			}
			if (this._meshDebug) {
				this._meshDebug.position.set(pos.x, pos.y, pos.z);
				this._meshDebug.quaternion.set(quat.x, quat.y, quat.z, quat.w);
			}
		}
		
		_resetDebugMesh() {
			// In any case, remove the old mesh
			if (this._meshDebug) {
				this._meshDebug.visible = false;
				this._sceneThree.remove(this._meshDebug);
				this._meshDebug = null;
			}
			
			if (!this._debug) {
				return;
			}
			
			if (!this._sceneThree) {
				console.warn('Option `sceneThree` is required for `debug` to work.');
				console.trace();
				this._debug = null;
				return;
			}
			
			if (!three) {
				console.warn('Init option `three` is required to create a debug mesh.');
				console.trace();
				return;
			}
			
			const size = this.size;
			
			let geo = null;
			if (!this.type || this.type === 'box') {
				geo = new three.BoxGeometry(size.x, size.y, size.z);
			} else if (this.type === 'ball') {
				geo = new three.IcosahedronGeometry(size.x * 0.5, 2);
			} else if (this.type === 'roll') {
				geo = new three.CylinderGeometry(size.x * 0.5 , size.x * 0.5, size.y, 16);
			} else if (this.type === 'pill') {
				geo = new three.CapsuleGeometry(size.x * 0.5, size.y, 2, 16);
			} else if (this.type === 'plane') {
				geo = new three.PlaneGeometry(1000, 1000, 4, 4);
				geo.rotateX(-Math.PI * 0.5);
			}
			
			if (!geo) {
				console.warn(`Could not create a debug mesh for shape "${this.type}".`);
				console.trace();
				return;
			}
			
			const mesh = new three.Mesh(geo, Shape.debugMaterial.clone());
			mesh.material.color = new three.Color(this._color);
			mesh.castShadow = true;
			this._sceneThree.add(mesh);
			this._meshDebug = mesh;
			
			if (this._debug === 'wire') {
				mesh.material.wireframe = true;
			}
			
			const pos = this.pos;
			const quat = this.quat;
			mesh.position.set(pos.x, pos.y, pos.z);
			mesh.quaternion.set(quat.x, quat.y, quat.z, quat.w);
		}
	}
	
	Shape.debugMaterial = null;
	if (three) {
		Shape.debugMaterial = new three.MeshStandardMaterial({ color: 0xb7fffa });
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
