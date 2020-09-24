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
