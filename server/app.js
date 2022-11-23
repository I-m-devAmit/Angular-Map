const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true}));
const cors = require('cors');
const userRouter = require('./routers/user');
const itemRouter = require('./routers/item');
const cartRouter = require('./routers/cart');
require("./db/mongoose");


const port = 2000; //PORT NUMBER
app.use(cors());    
app.use(express.json());
app.use(userRouter);
app.use(itemRouter);
app.use(cartRouter);


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT ,PATCH , DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

const expressApp = express();
expressApp.use(cors({
    origin: ['http://localhost:4200'],
    "methods": "GET,PUT,POST",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    credentials: true
}));

app.use(express.static(__dirname + 'public'));
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

