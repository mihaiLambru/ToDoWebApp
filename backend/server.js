const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const PORT = 8000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./app/routes/index')(app, {});

app.listen(PORT, () => { console.log('Server listening on port ' + PORT); });
