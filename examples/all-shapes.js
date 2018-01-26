'use strict';

const { scene, screen } = require('./word/word_move');
const { three, bullet } = require('3d-core-raub');
const { Box, Sphere, Cylinder } = bullet;
const { getRandom } = require('./utils/utils');


const raycaster = new THREE.Raycaster();
const mouse = new three.Vector2();

screen.on('mousedown', e => {
	
	mouse.x = ( e.x / screen.w ) * 2 - 1;
	mouse.y = - ( e.y / screen.h ) * 2 + 1;
	
	raycaster.setFromCamera( mouse, screen.camera );
	const ray = raycaster.ray;
	
	const start = ray.origin;
	const end = ray.at(100000);
	
	const hit = scene.hit(start, end);
	
	console.log('all-shapes.js', hit.body, hit.body && hit.body.mass);
	if (hit.body && hit.body.mass) {
		
		hit.body.vell = [0, 100, 0];
	}
	
	
	
	// var ray = view.ray(scrX, scrY);
	// var hr = envScene.hit(ray.start, ray.end);

	// //var res111 = hr.pos+hr.norm;
	// //console.log('actor at:', hr.obj, hr.hit, hr.pos, hr.norm, res111)

	// var bpos;
	// if(hr.hit)
	// 	bpos = hr.pos.plus(hr.norm.times(sizePicker.result.length()*0.5));
	// else
	// 	bpos = view.camera.pos.plus(view.camera.dir.times(20));

	// //console.log('entity', shapePicker.result, massPicker.result, sizePicker.result, bpos, colorPicker.result)
	// var obj = result.createObject(null, {
	// 	rgb: colorPicker.result,
	// 	size: sizePicker.result,
	// 	pos: bpos,
	// 	m: massPicker.result,
	// 	type: shapePicker.result,
	// });

	// spawned(obj);
});


function getRandomPosition() {
	return {
		x: getRandom(-10, 10),
		y: getRandom(20, 2000),
		z: getRandom(-10, 10)
	};
}

function createCylinder() {
	new Cylinder({
		screen,
		scene,
		pos: getRandomPosition(),
		size: {
			radius: getRandom(0.5, 2),
			height: getRandom(5, 10)
		},
		mass: getRandom(0.3, 4)
	});
}

function createBox() {
	new Box({
		screen,
		scene,
		pos: getRandomPosition(),
		size: {
			x: getRandom(1, 5),
			y: getRandom(1, 5),
			z: getRandom(1, 5)
		},
		mass: getRandom(0.3, 4)
	});
}

function createSphere() {
	new Sphere({
		screen,
		scene,
		pos: getRandomPosition(),
		size: {
			radius: getRandom(2, 3)
		},
		mass: getRandom(0.3, 4),
		segments: 32
	});
}

for (let i = 0; i < 50; i++) {
	createBox();
	createCylinder();
	createSphere();
}
