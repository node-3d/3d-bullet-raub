'use strict';


const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;


const getRandom = (min, max) => Math.random() * (max - min) + min;


const getRandomPosition = () => ({
	x: getRandom(-10, 10),
	y: getRandom(20, 2000),
	z: getRandom(-10, 10)
});


module.exports = {
	
	getRandomInt,
	getRandom,
	getRandomPosition,
	
};
