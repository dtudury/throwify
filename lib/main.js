throwif = require('./throwif');
throwy = require('./throwy');

//something like fs.mkdir(path, [mode], callback)
module.exports = function throwify(nodeCallbackStyle) {
    return function () {
        var callback = Array.prototype.pop.call(arguments);
        if (typeof callback !== 'function') {
            throw new Error("callback must be last argument");
        }
        Array.prototype.push.call(arguments, throwy(callback));
        nodeCallbackStyle.apply(null, arguments);
    }
}

