// Set up Express server
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let ejs = require('ejs');

app.set('port', (process.env.PORT || 8000));
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
app.get('/api/collection-exercise/:id', (req, res) => {
    res.sendFile(__dirname + '/' + staticFolder + '/mockData/collection-exercise.json');
});

app.get('/api/collection-exercises', (req, res) => {
    res.sendFile(__dirname + '/' + staticFolder + '/mockData/collection-exercises.json');
});

app.get('/api/collection-instrument-bundles', (req, res) => {
    res.sendFile(__dirname + '/' + staticFolder + '/mockData/collection-instrument-bundles.json');
});

app.get('/api/surveys', (req, res) => {
    res.sendFile(__dirname + '/' + staticFolder + '/mockData/surveys.json');
});
