'use strict';

const { Scene, Body, Joint, Trace } = require('node-bullet-raub');

const { Box, Sphere, Cylinder, Capsule } = require('./shapes');


module.exports = core => {
	
	if (core.bullet) {
		return;
	}
	
	core.bullet = {
		Scene, Body, Joint, Trace,
		Box, Sphere, Cylinder, Capsule,
	};
	
};
