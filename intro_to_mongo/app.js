const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'tweets';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true }); //this is to hide the warning

//My first tweet
const myFirstTweet = {
    title: 'Deep Thoughts',
    body: 'Friends, I have been navel-gazing',
    author: 'Karolin'
}

// Use connect method to connect to the Server
client.connect((err) => {
    assert.equal(null, err);
    console.log('Connected successfully to Mongo server');

    let db = client.db(dbName);
    const collection = db.collection('tweets');
    collection.insertOne(myFirstTweet, (err, result) => {
        assert.equal(null, err);
        assert.equal(1, result.insertedCount);
        console.log('successfully insert a doc into collection');
        client.close(); //need to close db at the collection - async
    });


});

// setTimeout(()=>{ //use timeout to close the db connection
//     client.close();
// }, 5000);
