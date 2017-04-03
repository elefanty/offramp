var chai = require('chai');
var assert = chai.assert;

var utils = require('../lib/utils');

describe('returnArray', function() {
	it('passing in an object should return an array', function() {
		var obj = {};
		assert.isArray(utils.returnArray(obj));
	});
	it('passing in an array should return an array', function() {
		var arr = [];
		assert.isArray(utils.returnArray(arr));
	});
});
