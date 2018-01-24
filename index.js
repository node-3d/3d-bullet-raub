'use strict';


module.exports = core => {
	
	if (core.bullet) {
		return;
	}
	
	core.bullet = {};
	
	require('./js')(core);
	
};
