'use strict';


module.exports = core => {
	
	if (core.bullet.Shape) {
		return;
	}
	
	const { three, bullet, Vec3, Color } = core;
	const { Body } = bullet;
	
	
	class Shape {
		
		constructor(opts) {
			
			this._screen = opts.screen;
			this._three  = this._screen.three;
			
			this._pos  = new Vec3(opts.pos || [0, 0, 0]);
			this._size = new Vec3(opts.size || [1, 1, 1]);
			this._mass = opts.mass || 1;
			
			this._visible = true;
			
			this._mesh = this._build(opts);
			
			this.screen.scene.add(this._mesh);
			
			this._mesh.position.set(this._pos.x, this._pos.y, this._pos.z);
			
			if (opts.color) {
				if (opts.color instanceof Color) {
					this.color = opts.color;
				} else {
					this.color = new Color(opts.color);
				}
			} else {
				this.color = new Color(0xFFFFFF);
			}
			
			
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
		
		
		get three() { return this._three; }
		
		
		get screen() { return this._screen; }
		set screen(v) { v = v; } // dummy setter, for convinience of passing Drawable as opts
		
		
		get mat() { return this._mesh.material; }
		get geo() { return this._mesh.geometry; }
		get mesh() { return this._mesh; }
		
		
		get visible() { return this._visible; }
		set visible(v) {
			this._visible = v;
			this._mesh.visible = this._visible;
		}
		
		
		get pos() { return this._pos.xy; }
		set pos(p) {
			
			this._pos.copy(p);
			
			this._mesh.position.x = this._pos.x;
			this._mesh.position.y = this._pos.y;
			this._mesh.position.z = this._pos.z;
		}
		
		
		get color() { return this._color; }
		set color(v) {
			this._color = v;
			
			if (this.mat) {
				if (this.mat.color) {
					this.mat.color.setHex( this._color.toHex() );
				}
				if (this.mat.opacity) {
					this.mat.opacity = this._color.a;
				}
			}
		}
		
		
		_build(opts) {
			return new this.three.Mesh(this._geo(opts), this._mat(opts));
		}
		
		
		_geo() {
			return new three.BoxGeometry(1, 1, 1);
		}
		
		
		updateGeo() {
			this._mesh.geometry = this._geo(this);
			this._mesh.geometry.needsUpdate = true;
		}
		
		
		_mat(opts) {
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
