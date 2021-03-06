const { config: { dbBucketPassword } } = require('../config');
// Instantiate Couchbase and Ottoman
var couchbase = require('couchbase');
var ottoman = require('ottoman');

// Build my cluster object and open a new cluster
var myCluster = new couchbase.Cluster('db:8091?detailed_errcodes=1');
var myBucket = myCluster.openBucket('bikeShop', dbBucketPassword);
ottoman.store = new ottoman.CbStoreAdapter(myBucket, couchbase);
//ottoman.bucket=myBucket;

// Build my "schema" from my model files
require('./model/employee');
require('./model/customer');
require('./model/bike');

// Build the necessary indexes to function
ottoman.ensureIndices(function (err) {
  if (err) return console.error(err);
});
