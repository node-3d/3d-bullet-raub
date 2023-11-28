'use strict';

const bullet = require('bullet-raub');


module.exports = () => {
	return {
		bullet,
	};
};

const _init = () => {
	const { Scene } = bullet;
	const scene = new Scene();
	const Shape = require('./shape')({ scene });
	
	return {
		bullet, scene, Shape,
	};
};

let inited = null;
const init = () => {
	if (inited) {
		return inited;
	}
	inited = _init();
	return inited;
};

module.exports = { init };
