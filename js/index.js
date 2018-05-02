'use strict';

const { Scene, Body, Joint, Trace } = require('bullet-raub');


module.exports = core => {
	
	Object.assign(core.bullet, { Scene, Body, Joint, Trace });
	
	require('./shape')(core);
	
	require('./box')(core);
	require('./cylinder')(core);
	require('./sphere')(core);
	require('./capsule')(core);
	
};
