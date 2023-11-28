'use strict';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as three from 'three';
import { init, addThreeHelpers } from '3d-core-raub';
import { init as initBullet } from '3d-bullet-raub';


const __dirname = dirname(fileURLToPath(import.meta.url));

const {
	doc, Image: Img, gl, loop,
} = init({
	isGles3: true,
	isWebGL2: true,
	autoEsc: true,
	autoFullscreen: true,
});

addThreeHelpers(three, gl);

const { Shape } = initBullet();

const icon = new Img(__dirname + '/bullet.png');
icon.on('load', () => { doc.icon = (icon as unknown as typeof doc.icon); });
doc.title = 'Bullet';


const scene = new three.Scene();
scene.fog = new three.FogExp2( 0x000000, 0.0007 );

const cameraPerspective = new three.PerspectiveCamera(90, doc.w / doc.h, 1, 2000);
cameraPerspective.position.z = 1000;

const renderer = new three.WebGLRenderer();
renderer.setPixelRatio(doc.devicePixelRatio);
renderer.setSize(doc.w, doc.h);

doc.on('resize', () => {
	cameraPerspective.aspect = doc.w / doc.h;
	cameraPerspective.updateProjectionMatrix();
	renderer.setSize(doc.w, doc.h);
});







const update = () => {
	
	renderer.render(scene, cameraPerspective);
};

loop(() => update());
