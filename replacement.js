var aerospike = require('aerospike');
var status = aerospike.status;
var util = require('util'), AbstractLevelDOWN = require('./').AbstractLevelDOWN;

// constructor, passes through the 'location' argument to the AbstractLevelDOWN constructor
function FakeLevelDOWN (location) {
    AbstractLevelDOWN.call(this, location)
}
// our new prototype inherits from AbstractLevelDOWN
util.inherits(FakeLevelDOWN, AbstractLevelDOWN);

FakeLevelDOWN.prototype._open = function (options, callback) {
    this._client = aerospike.client({
        hosts: [ { addr: '127.0.0.1', port: 3000 } ]
    });
    function connect_cb(err, client) {
        if (err.code == status.AEROSPIKE_OK) {
            console.log("Aerospike Connection Success")
        }
    }
    this._client.connect(connect_cb);
    process.nextTick(function () { callback(null, this) }.bind(this))
};

FakeLevelDOWN.prototype._put = function (key, value, options, callback) {
    var aero_key = aerospike.key('test','demo','_' + key);
    var bins = {'value': value};
    var metadata = { ttl: 10000, gen: 1};
    this._client.put(aero_key, bins, metadata, function(err, key){
    });
    process.nextTick(callback)
};

FakeLevelDOWN.prototype._get = function (key, options, callback) {
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

FakeLevelDOWN.prototype._del = function (key, options, callback) {
    var aero_key = aerospike.key('test','demo','_' + key);

    client.remove(aero_key, function (err, key) {
        if (err.code !== status.AEROSPIKE_OK) {
            console.log("error %s",err.message);
        }
        process.nextTick(callback)
    });
};


var levelup = require('levelup');
var db = levelup('/who/cares/', {
    db: function (location) { return new FakeLevelDOWN(location) }
});
db.put('foo', 'bar', function (err) {
    if (err) throw err;
    db.get('foo', function (err, value) {
        if (err) throw err;
        console.log('Got foo =', value)
    })
});