var aerospike = require('aerospike');
var status = aerospike.status;
var util = require('util');
var AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN;

function AerospikeLevelDOWN (location) {
    AbstractLevelDOWN.call(this, location)
}
util.inherits(AerospikeLevelDOWN, AbstractLevelDOWN);

function getAeroKey(key, options) {
    if(options.namespace == undefined) {
        process.nextTick(function () {
            callback(new Error('Missing namespace option - '
                + 'where should I'
                + ' save the data?'))
        })
    }
    if(options.set == undefined) {
        process.nextTick(function () {
            callback(new Error('Missing set option - where in '
                + options.namespace + ' '
                + 'should I save the data?'))
        })
    }
    return aerospike.key(options.namespace, options.set,'_' + key);
}

function getMetaData(options) {
    var metadata = {};
    if(options.ttl != undefined) {
        metadata.ttl = options.ttl;
    }
    if(options.gen != undefined) {
        metadata.gen = options.gen
    }
    return metadata
}

AerospikeLevelDOWN.prototype._open = function (options, callback) {
    this._client = aerospike.client({
        hosts: [{
                addr: options.address,
                port: options.port
        }]
    });
    function connect_cb(err, client) {
        if (err.code !== status.AEROSPIKE_OK) {
            process.nextTick(function () {
                callback(new Error('Failed to open db, aerospike says: ' + err.message))
            })
        }
    }
    this._client.connect(connect_cb);
    process.nextTick(function () { callback(null, this) }.bind(this))
};

AerospikeLevelDOWN.prototype._put = function (key, value, options, callback) {
    this._client.put(
        getAeroKey(key, options),
        {'value': value},
        getMetaData(options),
        function(err, key){}
    );
    process.nextTick(callback)
};

AerospikeLevelDOWN.prototype._get = function (key, options, callback) {
    this._client.get(getAeroKey(key, options), function(err, rec, meta) {
        if (err.code !== status.AEROSPIKE_OK ) {
            return process.nextTick(function () {
                callback(new Error('NotFound'))
            })
        } else {
            return process.nextTick(function () {
                callback(null, {value: rec.value, meta})
            });
        }
    });
};

AerospikeLevelDOWN.prototype._del = function (key, options, callback) {
    this._client.remove(getAeroKey(key, options), function (err, key) {
        if (err.code !== status.AEROSPIKE_OK) {
            return process.nextTick(function () {
                callback(new Error('Could not remove %s', key))
            })
        }
        process.nextTick(callback)
    });
};

module.exports = AerospikeLevelDOWN;
