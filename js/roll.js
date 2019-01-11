'use strict';


module.exports = core => {
	
	if (core.bullet.Roll) {
		return;
	}
	
	const { three, bullet, Vec3 } = core;
	const { Shape } = bullet;
	
	
	class Roll extends Shape {
		
		constructor(opts) {
			
			super(opts);
			
			const radius = opts.radius || 1;
			const height = opts.height || 1;
			
			this._size = new Vec3(opts.size || [radius * 2, height, radius * 2]);
			this._body.size = this._size;
			
			this._segments = opts.segments || 32;
			this._body.type = 'roll';
			
		}
		
		
		_geo(opts) {
			
			const radius   = opts.radius || 1;
			const height   = opts.height || 1;
			const size     = new Vec3(opts.size || [radius * 2, height, radius * 2]);
			const segments = opts.segments || 32;
			
			return new three.CylinderGeometry(size.x * 0.5 , size.z * 0.5, size.y, segments);
			
		}
		
	}
	
	
	bullet.Roll = Roll;
	
};
