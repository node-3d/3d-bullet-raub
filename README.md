# Node.js 3D Bullet

This is a part of [Node3D](https://github.com/node-3d) project.

[![NPM](https://badge.fury.io/js/3d-bullet-raub.svg)](https://badge.fury.io/js/3d-bullet-raub)
[![ESLint](https://github.com/node-3d/3d-bullet-raub/actions/workflows/eslint.yml/badge.svg)](https://github.com/node-3d/3d-bullet-raub/actions/workflows/eslint.yml)
[![Test](https://github.com/node-3d/3d-bullet-raub/actions/workflows/test.yml/badge.svg)](https://github.com/node-3d/3d-bullet-raub/actions/workflows/test.yml)

```console
npm i -s 3d-bullet-raub
```

Bullet physics plugin for Node.js 3D Core

![Example](examples/screenshot.jpg)

This plugin provides the `Shape` class to simplify the common use cases with Three.js and
Bullet Physics addon.

 * Can display debug shapes.
 * Updates mesh pose from physics engine.
 * Removes meshes when the body is destroyed.
 * `Shape` extends `Body` and works with `scene.hit()/scene.trace()`.

```ts
import * as three from 'three';
import { init, addThreeHelpers } from '3d-core-raub';
import { init as initBullet } from '3d-bullet-raub';

const { gl, loop, Screen } = init();
addThreeHelpers(three, gl);
const { scene, Shape } = initBullet({ three });

const screen = new Screen({ three });

const plane = new Shape({
	sceneThree: screen.scene,
	color: 0xface8d,
	type: 'plane',
	debug: 'solid',
});

const box = new Shape({
	sceneThree: screen.scene,
	pos: [0, 10, 0], // use { xyz } or [xyz]
	mass: 3,
	debug: 'solid',
	color: 0xbeefed,
	size: { x: 3, y: 2, z: 1 }, // use { xyz } or [xyz]
});

loop(() => {
	scene.update();
	screen.draw();
});
```

* See [TypeScript declarations](/index.d.ts) for more details.
* See [example](/examples/main.ts) for a complete setup.
