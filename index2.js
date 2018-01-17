'use strict';

const { Screen, three, loop } = require('node-3d-ready-raub');
const { Scene, Body } = require('node-bullet-raub');

const Cone = require('./firgures/cone');
const Box = require('./firgures/cone');

//-----------------------------------------------------------------------------------
// Don't work
//var spriteMap = new THREE.TextureLoader().load(__dirname + '/textures/sprite.png');
//var spriteMap = new THREE.TextureLoader().load(__dirname + '/textures/sprite2.png');
//var spriteMap = new THREE.TextureLoader().load(__dirname + '/textures/texture3.gif');

var spriteMap = new THREE.TextureLoader().load(__dirname + '/textures/crate.gif');
//-----------------------------------------------------------------------------------

const screen = new Screen();
screen.camera.position.z = 60;
screen.camera.position.y = 20;
screen.camera.up = new three.Vector3(0, 1, 0);
screen.camera.lookAt(new three.Vector3(0, 0, 0));

loop(screen);

const pgeo = new THREE.PlaneGeometry(200, 200, 4, 4);

//-----------------------------------------------------------------------------------
// Don't work
//const pmat = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });

// work
// var spriteMaterial = new THREE.MeshBasicMaterial({ map: spriteMap });
spriteMap.wrapS = THREE.RepeatWrapping;
spriteMap.wrapT = THREE.RepeatWrapping;
var spriteMaterial = new THREE.ShaderMaterial({
	
	blending   : 'additive',
	depthTest  : true,
	transparent: false,
	uniforms : { tex: { type: 't' , value: spriteMap } },
	
	vertexShader  : `
		
		varying vec3 varPos;
		
		void main() {
			
			vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
			gl_Position = projectionMatrix * mvPosition;
			varPos = gl_Position.xyz;
			
		}
		
	`,
	fragmentShader: `
		
		uniform sampler2D tex;
		
		varying vec3  varPos;
		
		void main() {
			
			
			
			const float stride = 4.0;
			const float multiplier = 2.0 / stride;
			
			float whiteX = pow(multiplier * abs(mod(varPos.x, stride) -2.0), 20.0);
			float whiteY = pow(multiplier * abs(mod(varPos.y, stride) -2.0), 20.0);
			vec4 white = vec4(max(whiteX, whiteY));
			
			// Uncomment for texture
			// vec4 tcolor = texture2D(tex, varPos.xy * 0.1);
			// vec4 color = clamp(tcolor + white, vec4(0.0), vec4(1.0));
			// gl_FragColor = color;
			
			gl_FragColor = white;
			
		}
		
	`,
	
});
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

//console.log('plane', plane.getAabb());

for (let i = 0; i < 20; i++) {
	//const size1 = 4 * Math.random();
	//const size2 = 64 * Math.random();
	new Cone({
		screen,
		scene,
		pos: {
			x: 20 * Math.random(),
			y: 20 + 5 * Math.random(),
			z: 5 * Math.random()
		},
		size: {
			x: 2,
			y: 5,
			z: 16
		},
		mass: 1 + 2 * Math.random()
	});
}
