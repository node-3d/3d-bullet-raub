const { Screen, three, loop } = require('node-3d-ready-raub');
const { Scene, Body } = require('node-bullet-raub');

const { registerObserver } = require('../keyboard/keyboard');
const { UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW } = require('../keyboard/keys_constants');

const loadTexture = fileName => new THREE.TextureLoader().load(`../textures/${fileName}`);

//const spriteMap = loadTexture('texture_1.jpg');
const spriteMap = loadTexture('texture_1.jpg');
// const spriteMap = loadTexture('texture_3.jpg');
//-----------------------------------------------------------------------------------

const screen = new Screen();
screen.camera.position.z = 60;
screen.camera.position.y = 20;
screen.camera.up = new three.Vector3(0, 1, 0);
screen.camera.lookAt(new three.Vector3(0, 0, 0));

let dx = 0;
let dy = 0;
let dz = 0;

function game() {
	screen.camera.position.x += dx;
	screen.camera.position.y += dy;
	screen.camera.position.z += dz;
}
setInterval(game, 50);

registerObserver(
	UP_ARROW,
	() => {
		dz = -1;
	},
	() => {
		dz = 0;
	}
);

registerObserver(
	DOWN_ARROW,
	() => {
		dz = 1;
	},
	() => {
		dz = 0;
	}
);

registerObserver(
	LEFT_ARROW,
	() => {
		dx = -1;
	},
	() => {
		dx = 0;
	}
);

registerObserver(
	RIGHT_ARROW,
	() => {
		dx = 1;
	},
	() => {
		dx = 0;
	}
);

loop(screen);

const pgeo = new THREE.PlaneGeometry(100, 100, 4, 4);

//-----------------------------------------------------------------------------------
spriteMap.wrapS = THREE.RepeatWrapping;
spriteMap.wrapT = THREE.RepeatWrapping;
//spriteMap.anisotropy = 1;
spriteMap.repeat.set(8, 8);
//spriteMap.repeat.set(32, 32);
//spriteMap.generateMipmaps = true;
//spriteMap.needsUpdate = true;
var spriteMaterial = new THREE.MeshBasicMaterial({ map: spriteMap });
//-----------------------------------------------------------------------------------
const pmesh = new THREE.Mesh(pgeo, spriteMaterial);
screen.scene.add(pmesh);
pmesh.rotation.x = -Math.PI * 0.5;
//-----

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

module.exports.screen = screen;
module.exports.scene = scene;
