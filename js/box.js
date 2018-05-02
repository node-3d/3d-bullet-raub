'use strict';


module.exports = core => {
	
	if (core.bullet.Box) {
		return;
	}
	
	const { three, bullet, Vec3 } = core;
	const { Shape } = bullet;
	
	
	class Box extends Shape {
		
		_geo(opts) {
			const size = new Vec3(opts.size || [1, 1, 1]);
			return new three.BoxGeometry(size[0], size[1], size[2]);
		}
		
	}
	
	
	bullet.Box = Box;
	
};
