'use strict';

const { Scene, Body, Joint, Trace } = require('bullet-raub');


module.exports = core => {
	
	Object.assign(core.bullet, { Scene, Body, Joint, Trace });
	
	require('./shape')(core);
	
	require('./box')(core);
	require('./roll')(core);
	require('./ball')(core);
	require('./caps')(core);
	
};
