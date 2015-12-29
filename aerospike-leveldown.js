var aerospike = require('aerospike');
var status = aerospike.status;
var util = require('util');
var AbstractLevelDOWN = require('./').AbstractLevelDOWN;

// constructor, passes through the 'location' argument to the AbstractLevelDOWN constructor
function AerospikeLevelDOWN (location) {
    AbstractLevelDOWN.call(this, location)
}
// our new prototype inherits from AbstractLevelDOWN
util.inherits(AerospikeLevelDOWN, AbstractLevelDOWN);

AerospikeLevelDOWN.prototype._open = function (options, callback) {
    this._client = aerospike.client({
        hosts: [ { addr: options.address, port: options.port } ]
    });
    function connect_cb(err, client) {
        if (err.code == status.AEROSPIKE_OK) {
            console.log("Aerospike Connection Success")
        }
    }
    this._client.connect(connect_cb);
    process.nextTick(function () { callback(null, this) }.bind(this))
};

AerospikeLevelDOWN.prototype._put = function (key, value, options, callback) {
    var aero_key = aerospike.key('test','demo','_' + key);
    var bins = {'value': value};
    var metadata = { ttl: 10000, gen: 1};
    this._client.put(aero_key, bins, metadata, function(err, key){
    });
    process.nextTick(callback)
};

AerospikeLevelDOWN.prototype._get = function (key, options, callback) {
    var aero_key = aerospike.key('test','demo','_' + key);

    this._client.get(aero_key, function(err, rec, meta) {
        console.log(rec.value);
        if ( err.code != status.AEROSPIKE_OK ) {
            return process.nextTick(function () { callback(new Error('NotFound')) })
        } else {
            return process.nextTick(function () {
                callback(null, rec.value)
            });
        }
    });
};

AerospikeLevelDOWN.prototype._del = function (key, options, callback) {
    var aero_key = aerospike.key('test','demo','_' + key);

    client.remove(aero_key, function (err, key) {
        if (err.code !== status.AEROSPIKE_OK) {
            console.log("error %s",err.message);
        }
        process.nextTick(callback)
    });
};

module.exports = AerospikeLevelDOWN
