'use strict';

const { init } = require('3d-core-raub');
const bullet3d = require('..');


const { three, bullet, Image, doc, Screen, loop } = init({ plugins: [bullet3d] });
const { Box, Ball, Roll, Caps, Scene, Body } = bullet;

const icon = new Image();
icon.src = __dirname + '/bullet.png';
icon.on('load', () => doc.icon = icon);

doc.title = 'All Shapes';

