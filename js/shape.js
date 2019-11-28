'use strict';


module.exports = core => {
	
	if (core.bullet.Shape) {
		return;
	}
	
	const { three, bullet, Vec3, Color, Drawable } = core;
	const { Body } = bullet;
	
	
	class Shape extends Drawable {
		
		constructor(opts) {
			
			super(opts);
			
			this._pos = new Vec3(opts.pos || [0, 0, 0]);
			this._size = new Vec3(opts.size || [1, 1, 1]);
			this._mass = opts.mass || 1;
			
			this._mesh.position.set(this._pos.x, this._pos.y, this._pos.z);
			
			this._body = new Body({ scene: opts.scene });
			
			this._body.pos = this._pos;
			this._body.size = this._size;
			this._body.mass = this._mass;
			
			this._body.on('update', ({ pos, quat }) => {
				this._mesh.position.set(pos.x, pos.y, pos.z);
				this._mesh.quaternion.set(quat.x, quat.y, quat.z, quat.w);
			});
			
			this._body.on('destroy', () => this.remove());
			
		}
		
		
		get pos() { return this._pos.xyz; }
		set pos(p) {
			
			this._pos.copy(p);
			
			this._mesh.position.x = this._pos.x;
			this._mesh.position.y = this._pos.y;
			this._mesh.position.z = this._pos.z;
		}
		
		
		_geo() {
			return new three.BoxGeometry(1, 1, 1);
		}
		
		
		updateGeo(opts) {
			this._mesh.geometry = this._geo(opts);
			this._mesh.geometry.needsUpdate = true;
		}
		
		
		_mat() {
			return new this.three.MeshLambertMaterial({
				transparent: false,
				side       : this.three.DoubleSide,
				depthWrite : true,
				depthTest  : true,
			});
		}
		
		
		remove() {
			this.screen.scene.remove(this._mesh);
		}
		
	}
	
	
	bullet.Shape = Shape;
	
};
