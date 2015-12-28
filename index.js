/* Copyright (c) 2014 Shimon Schwartz, MIT License */

var AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN;
var aerospike = require('aerospike');
var status = aerospike.status;

function AerospikeDOWN(location) {
    if (!(this instanceof AerospikeDOWN)) {
        return new AerospikeDOWN(location);
    }

    AbstractLevelDOWN.call(this, location);
}

AerospikeDOWN.prototype = Object.create(AbstractLevelDOWN.prototype, {
    constructor: {
        configurable: true,
        enumerable: true,
        value: AerospikeDOWN,
        writable: true
    },

    _client: null,

    _open: function(options, callback) {
        this._client = aerospike.client({
            hosts: [ { addr: '127.0.0.1', port: 3000 } ]
        });
        function connect_cb(err, client) {
            if (err.code != status.AEROSPIKE_OK) {
                return process.nextTick(function () {
                    callback(new Error('Aerospike connection failed'))
                })
            }
        }
        this._client.connect(connect_cb);
        process.nextTick(function () { callback(null, this) }.bind(this))
    },

    _close: function(callback) {
        this._client = null;
        process.nextTick(callback)
    },

    _get: function(key, options, callback) {
        var aero_key = aerospike.key('test','demo','_' + key);

        this._client.get(aero_key, function(err, rec, meta) {
            console.log(rec.value);
            if ( err.code != status.AEROSPIKE_OK ) {
                return process.nextTick(function () {
                    callback(new Error('NotFound'))
                })
            } else {
                return process.nextTick(function () {
                    callback(null, rec.value)
                });
            }
        });
    },

    _put: function(key, value, options, callback) {
        var aero_key = aerospike.key('test','demo','_' + key);
        var bins = {'value': value};
        var metadata = { ttl: 10000, gen: 1};
        this._client.put(aero_key, bins, metadata, function(err, key){
            if (err.code !== status.AEROSPIKE_OK) {
                return process.nextTick(function() {
                    callback(new Error('Failed to insert ' + key + ': ' + err.message))
                });
            }
        });
        process.nextTick(callback)
    },

    _del: function(key, options, callback) {
        var aero_key = aerospike.key('test', 'demo', '_' + key);

        this._client.remove(aero_key, function(err, key) {
            if (err.code !== status.AEROSPIKE_OK) {
                return process.nextTick(function() {
                    callback(new Error('Failed to remove ' + key + ': ' + err.message))
                });
            }
            process.nextTick(callback)
        });
    },

    _batch: function(array, options, callback) {
        throw new Error('batch() not implemented');
    }
});

module.exports.AerospikeDOWN = AerospikeDOWN;
