var rewire = require('rewire');
var index = rewire('./');

describe('index', function () {
    it('should exist', function () {
        expect(index).toEqual(jasmine.any(Function));
    });
});
