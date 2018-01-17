'use strict';

const { Screen, three, loop } = require('node-3d-ready-raub');
const { Scene, Body } = require('node-bullet-raub');

const Box = require('./firgures/box');

const screen = new Screen();
screen.camera.position.z = 60;
screen.camera.position.y = 20;
screen.camera.up = new three.Vector3(0, 1, 0);
screen.camera.lookAt(new three.Vector3(0, 0, 0));

loop(screen);

const pgeo = new THREE.PlaneGeometry(200, 200, 4, 4);
const pmat = new THREE.MeshBasicMaterial({ color: 0x666666 });
const pmesh = new THREE.Mesh(pgeo, pmat);
screen.scene.add(pmesh);
pmesh.rotation.x = -Math.PI * 0.5;

const light = new three.AmbientLight(0x666666); // soft white light
screen.scene.add(light);

const pointLight = new three.PointLight(0xffffff, 1, 100000);
screen.scene.add(pointLight);
pointLight.position.x = 200;
pointLight.position.y = 2000;
pointLight.position.z = 500;

const scene = new Scene();
const _draw = screen.draw.bind(screen);
screen.draw = () => {
	scene.update();
	_draw();
};

const plane = new Body({ scene });
plane.type = 'plane';

for (let i = 0; i < 20; i++) {
	new Box({
		screen,
		scene,
		pos: {
			x: 5 * Math.random(),
			y: 20 + 5 * Math.random(),
			z: 5 * Math.random()
		},
		size: {
			x: 1 + Math.random(),
			y: 1 + Math.random(),
			z: 1 + Math.random()
		},
		mass: 1 + 2 * Math.random()
	});
}
