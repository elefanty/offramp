const utils = {
	returnArray: (objectOrArray) => {
		return Array.isArray(objectOrArray) ? objectOrArray : [objectOrArray];
	}
};

module.exports = utils;
