'use strict';


module.exports = core => {
	
	if (core.bullet.Capsule) {
		return;
	}
	
	const { three, bullet, Vec3 } = core;
	const { Shape } = bullet;
	
	
	class Capsule extends Shape {
		
		constructor(opts) {
			
			super(opts);
			
			const radius = opts.radius || 1;
			const height = opts.height || 1;
			
			this._size = new Vec3(opts.size || [radius * 2, height, radius * 2]);;
			this._body.size = this._size;
			
			this._segments = opts.segments || 32;
			this._body.type = 'caps';
			
		}
		
		
		_geo(opts) {
			
			const radius   = opts.radius || 1;
			const height   = opts.height || 1;
			const size     = new Vec3(opts.size || [radius * 2, height, radius * 2]);
			const segments = opts.segments || 32;
			
			const cylinder = new three.CylinderGeometry(size.x * 0.5 , size.z * 0.5, size.y, segments);
			const sphere1  = new three.SphereGeometry(size.x * 0.5, segments, segments);
			const sphere2  = new three.SphereGeometry(size.x * 0.5, segments, segments);
			
			const cylinderMesh = new THREE.Mesh(cylinder);
			const sphereMesh1 = new THREE.Mesh(sphere1);
			const sphereMesh2 = new THREE.Mesh(sphere2);
			
			sphereMesh1.position.y = size.y / 2;
			sphereMesh2.position.y = -size.y / 2;
			
			const singleGeometry = new THREE.Geometry();
			
			cylinderMesh.updateMatrix();
			sphereMesh1.updateMatrix();
			sphereMesh2.updateMatrix();
			singleGeometry.merge(cylinderMesh.geometry, cylinderMesh.matrix);
			singleGeometry.merge(sphereMesh1.geometry, sphereMesh1.matrix);
			singleGeometry.merge(sphereMesh2.geometry, sphereMesh2.matrix);
			
			return singleGeometry;
			
		}
		
	}
	
	
	bullet.Capsule = Capsule;
	
};
