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


```typescript
import * as three from 'three';
import { init, addThreeHelpers } from '3d-core-raub';
import { init as initBullet } from '3d-qml-raub';

// Standard Node3D init
const {
	doc, Image: Img, gl,
} = init({
	isGles3: true, isWebGL2: true, autoEsc: true,
});
addThreeHelpers(three, gl);

// Initialize Bullet and fetch the helpers
const {
	Box, Ball, Roll, Caps, Scene, Body, bullet,
} = initBullet({
	three,
});
```

* See [TypeScript declarations](/index.d.ts) for more details.
* See [example](/examples/main.ts) for a complete setup.
