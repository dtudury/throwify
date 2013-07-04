var assert = require('assert');
var domain = require('domain');
var mocha = require('mocha');
var throwify = require('../index.js');


function goodCallback(done) {
    return function () {
        done();
    }
}

function badCallback(done) {
    return function () {
        done(new Error());
    }
}



describe('throwify', function () {
    describe('error to throw', function () {
        it('should throw when callback in first position is called with error',
            function (done) {
                var nodeCallbackStyleWithError = function(callback) {
                    process.nextTick(function() {
                        callback(new Error('node style error'));
                    });
                };
                var simpleStyleWithThrow = throwify(nodeCallbackStyleWithError);
                var d = domain.create();
                d.on('error', goodCallback(done));
                d.run(function() {
                    simpleStyleWithThrow(badCallback(done));
                });
            }
        );
        it('should throw when callback in second position is called with error',
            function (done) {
                var nodeCallbackStyleWithError = function(a, callback) {
                    process.nextTick(function() {
                        callback(new Error('node style error'));
                    });
                };
                var simpleStyleWithThrow = throwify(nodeCallbackStyleWithError);
                var d = domain.create();
                d.on('error', goodCallback(done));
                d.run(function() {
                    simpleStyleWithThrow(badCallback(done));
                });
            }
        );
        it('should throw when callback in third position is called with error',
            function (done) {
                var nodeCallbackStyleWithError = function(a, b, callback) {
                    process.nextTick(function() {
                        callback(new Error('node style error'));
                    });
                };
                var simpleStyleWithThrow = throwify(nodeCallbackStyleWithError);
                var d = domain.create();
                d.on('error', goodCallback(done));
                d.run(function() {
                    simpleStyleWithThrow(badCallback(done));
                });
            }
        );
    });
    describe('reroute arguments', function () {
        it('should call the function with no arguments when the only argument was a possible exception',
            function (done) {
                var nodeCallbackStyleWithoutArguments = function(callback) {
                    process.nextTick(function() {
                        callback(null);
                    });
                };
                var simpleStyleWithThrow = throwify(nodeCallbackStyleWithoutArguments);
                var d = domain.create();
                d.on('error', badCallback(done));
                d.run(function() {
                    simpleStyleWithThrow(goodCallback(done));
                });
            }
        );
        it('should call the function with arguments without possible exception',
            function (done) {
                var nodeCallbackStyleWithArguments = function(callback) {
                    process.nextTick(function() {
                        callback(null, 1, 2);
                    });
                };
                var simpleStyleWithThrow = throwify(nodeCallbackStyleWithArguments);
                var d = domain.create();
                d.on('error', badCallback(done));
                d.run(function() {
                    simpleStyleWithThrow(function(a, b) {
                        assert.equal(a, 1);
                        assert.equal(b, 2);
                        done();
                    });
                });
            }
        );
    });
});

