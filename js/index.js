'use strict';

const { Scene, Body, Joint, Trace } = require('node-bullet-raub');


module.exports = core => {
	
	Object.assign(core.bullet, { Scene, Body, Joint, Trace });
	
	require('./box')(core);
	require('./cylinder')(core);
	require('./sphere')(core);
	require('./capsule')(core);
	
};
