const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operation');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';


MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);

  console.log('connected coreectly to serverr');

  const db = client.db(dbname);//connect to database

  dboper.insertDocument(db, { name: "Vadonut", description: "Test" },
    "dishes", (result) => {
      console.log("Insert Document:\n", result.ops);

      dboper.findDocument(db, "dishes", (docs) => {
        console.log("Found Documents:\n", docs);

        dboper.updateDocument(db, { name: "Vadonut" },
          { description: "Updated Test" }, "dishes",
          (result) => {
            console.log("Updated Document:\n", result.result);

            dboper.findDocument(db, "dishes", (docs) => {
              console.log("Found Updated Documents:\n", docs);

              db.dropCollection("dishes", (result) => {
                console.log("Dropped Collection: ", result);

                client.close();
              });
            });
          });
      });
    });
});