throwify
========

for these throwier times... (or at least for versions of node that include domains)

[![build status](https://secure.travis-ci.org/dtudury/throwify.png)](http://travis-ci.org/dtudury/throwify)

# example

turn a node-style (exception ...rest) callback into a (...rest) callback that throws

``` js
var throwify = require('throwify');
var fs = require('fs');

var stat = throwify(fs.stat);

stat('some/file', function(stats) {
    //do something with stats object
});

```

#why?

handling node-style error callbacks injects complexity into almost everything you'll write.
often it's convenient and possible to wrap a discrete chunk of code in a domain and localize
the exception handling there.
