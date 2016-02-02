var MongoClient = require('mongodb').MongoClient;

Dao = function(db) {
  
  this.coll = db.collection('users');

  this.addUser = function(user,callback) {
    this.coll.insertOne(user, function(err, r) {
        if (err) throw err;
	callback(r.insertedCount);
    });
  };

  this.addMultiplyUsers = function(users,callback) {
    this.coll.insertMany(users, function(err, r) {
        if (err) throw err;
	callback(r.insertedCount);
    });
  };

  this.listUsers = function(user,callback) {
    this.coll.find(user).toArray(function(err,docs){
        if(err) throw err;
        callback(docs);
    });
  };

  this.removeUsers = function(user, callback) {
    this.coll.deleteMany(user,{},function(err,doc){
       if(err) throw err;
       callback(doc);
    });
  };

  this.upsert = function(user,no, callback) {
    this.coll.updateOne(user, {$set:no}, {upsert:true}, function(err, r) {
       if(err) throw err;
        callback(doc);
    });
  };

  this.mapReduce = function(callback) {
    var map = function() {
       emit(this.status, this.price);
    }; 
    var reduce = function(keyCustId, valuesPrices) {
       return Array.sum(valuesPrices);
  };

  this.coll.mapReduce(map, reduce,{out: "map_reduce_example", verbose:true}, 
      function(err,collSaida,stats) {
	if(err) throw err;
         collSaida.find().toArray(function(err, results) {
           callback(results);
        });
      }
   );
  };
 
};

exports.Dao = Dao;


