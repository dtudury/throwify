
module.exports = function throwy(callback) {
    return function () {
        var error = Array.prototype.shift.call(arguments);
        throwif(error);
        callback.apply(null, arguments);
    }
}
