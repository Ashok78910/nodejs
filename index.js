<<<<<<< HEAD
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
=======
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const dishrouter =  require('./routs/dishrouter');
app.use('/dishes', dishrouter); 

const leaderRouter =  require('./routs/leaderRouter');
app.use('/leaders', leaderRouter);

const promotionRouter =  require('./routs/promotionRouter');
app.use('/promotions', promotionRouter);



const hostname = 'localhost';
const port = 3000;





app.use(morgan('dev'));
app.use(bodyParser.json());





app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('content-type', 'text/html');
    res.end('<html><body><h1>this is an express server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`serevre runing at http:\\${hostname}:${port}`);
})
>>>>>>> origin/master
