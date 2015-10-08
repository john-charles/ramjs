var rewire = require('rewire');
var ram = rewire('./');
var Promise = require('bluebird');

describe('ram', function () {
    function successfulHandler() {
        return new Promise(function (resolve, reject) {
            resolve('win');
        });
    }
    function failingHandler() {
        return new Promise(function (resolve, reject) {
            reject('fail');
        });
    }
    var counter = 0;
    var attempts = 5;
    function faultyHandler() {
        return new Promise(function (resolve, reject) {
            if (counter++ < 4) {
                // will fail four times
                reject('fault');
            } else {
                // then succeed
                resolve('win');
                counter = 0;
            }
        });
    }
    var validOptions = {
        handler: successfulHandler
    };
    var invalidOptions = {};

    it('should be a function', function () {
        expect(ram).toEqual(jasmine.any(Function));
    });
    it('should return a function', function () {
        expect(ram(validOptions)).toEqual(jasmine.any(Function));
    });
    it('should throw if no handler is specified in the options', function () {
        expect(function () { ram(invalidOptions); }).toThrow();
    });
    describe('returned function', function () {
        var rammed = ram(validOptions);
        it('should return a promise/thenable', function () {
            expect(rammed() instanceof Promise).toEqual(true);
            expect(rammed().then).toEqual(jasmine.any(Function));
        });
    });
});
