'use strict';

let config = require('./config.json');

let express = require('express');
let app = express();

let morgan = require('morgan');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

let mongoose = require('mongoose');
mongoose.connect(config.DB);

require('./models/card.model.js');

require ('./routes/routes.js')(app);

app.listen(config.PORT);
console.log('listening on port ' + config.PORT);
