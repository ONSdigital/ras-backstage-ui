// Set up Express server
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let ejs = require('ejs');

app.set('port', (process.env.PORT || 8050));
app.set('view engine', 'html');
app.set('views', 'src');
app.engine('html', ejs.renderFile);

let staticFolder = '.';
app.use(express.static(staticFolder));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let server = app.listen(app.get('port'), () => {
    console.log('Express server running on http://localhost:' + server.address().port);
});

// Mock data endpoints
app.get('/api/collectionexercises/:id', (req, res) => {
    res.sendFile(__dirname + '/' + staticFolder + '/mockData/collection-exercise.json');
});

app.get('/api/collection-instrument-bundles', (req, res) => {
    res.sendFile(__dirname + '/' + staticFolder + '/mockData/collection-instrument-bundles.json');
});

app.get('/api/surveys/:id', (req, res) => {
    res.sendFile(__dirname + '/' + staticFolder + '/mockData/survey.json');
});

app.get('/api/cases/partyid/:id', (req, res) => {
    res.sendFile(__dirname + '/' + staticFolder + '/mockData/cases.json');
});

app.get('/api/party-api/respondents/id/:id', (req, res) => {
    res.sendFile(__dirname + '/' + staticFolder + '/mockData/party-respondent.json');
});

app.get('/api/party-api/businesses/id/:id', (req, res) => {
    res.sendFile(__dirname + '/' + staticFolder + '/mockData/party-business.json');
});


// code below returns end of a url:
// let id = req.url.split('/').pop();
