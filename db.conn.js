const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = "mongodb://localhost:27017";
const dbName = "jimmy";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, }); 
let dbConnection; 
module.exports = { 
    connectToServer: function (callback) {
        client.connect(function(err) { 
            assert.equal(null, err); 
            dbConnection = client.db(dbName); 
            console.log("Connected to DB");
            return callback(); 
        }); 
    }, 
    getDb: function () { 
        return dbConnection; 
    }, 
};
