const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'tweets';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true }); //this is to hide the warning

// Use connect method to connect to the Server
client.connect((err) => {
    assert.equal(null, err);
    console.log('Connected successfully to Mongo server');

    let db = client.db(dbName);
    const collection = db.collection('tweets');

    collection.findOneAndUpdate({
        title: 'Vespa'
    }, {
        $set: {
            sponsored: true
        } // when we don't specify returnOrigin, it by default return the original doc (before update)
    }, (err, doc) => {
        assert.equal(err, null);
        console.log(doc);
        client.close();
    });

});

// setTimeout(()=>{ //use timeout to close the db connection
//     client.close();
// }, 5000);
