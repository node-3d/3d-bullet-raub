'use strict';

const bullet = require('bullet-raub');


const _init = (opts = {}) => {
	const { three } = opts;
	const { Scene } = bullet;
	const scene = new Scene();
	
	const Shape = require('./shape')({ scene, three });
	
	return {
		bullet, scene, Shape,
	};
};

let inited = null;
const init = (opts) => {
	if (inited) {
		return inited;
	}
	inited = _init(opts);
	return inited;
};

module.exports = { init };
