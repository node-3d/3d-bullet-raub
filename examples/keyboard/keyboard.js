const Observer = require('./observer/observer');

const downObserver = new Observer('keydown');
const upObserver = new Observer('keyup');

function registerObserver(keyCode, downFunciton, upFunciton) {
	if (downFunciton) {
		downObserver.registerObserver(keyCode, downFunciton);
	}

	if (upFunciton) {
		upObserver.registerObserver(keyCode, upFunciton);
	}
}

module.exports.registerObserver = registerObserver;
