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

describe('parsedRouteMobX', function() {
	it('should return a modifiedURL that is equal to currentPath', function() {
		var routePath = '/index/:id';
		var currPath = '/index/5';
		var parsedRouteMobX = utils.parsedRouteMobX(routePath, currPath, { params: '' });
		assert.equal(parsedRouteMobX, '/index/5');
	});
});