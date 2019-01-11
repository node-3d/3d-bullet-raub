'use strict';

module.exports = core => {
	
	if (core.bullet.Ball) {
		return;
	}
	
	const { three, bullet, Vec3 } = core;
	const { Shape } = bullet;
	
	
	class Ball extends Shape {
		
		constructor(opts) {
			
			super(opts);
			
			const radius = opts.radius || 1;
			
			this._size = new Vec3(opts.size || [radius * 2, radius * 2, radius * 2]);
			this._body.size = this._size;
			
			this._segments = opts.segments || 32;
			this._body.type = 'ball';
			
		}
		
		
		_geo(opts) {
			
			const radius = opts.radius || 1;
			const size = new Vec3(opts.size || [radius * 2, radius * 2, radius * 2]);
			const segments = opts.segments || 32;
			
			return new three.SphereGeometry(size.x * 0.5, segments, segments);
			
		}
		
	}
	
	
	bullet.Ball = Ball;
	
};
