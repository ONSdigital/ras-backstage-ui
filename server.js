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
    let id = req.url.split('/').pop();

    if (id === 'c6467711-21eb-4e78-804c-1db8392f93fb') {
        res.sendFile(__dirname + '/' + staticFolder + '/mockData/collection-exercise-bres.json');
    } else {
        res.sendFile(__dirname + '/' + staticFolder + '/mockData/collection-exercise-another.json');
    }
});

app.get('/api/collection-instrument-bundles', (req, res) => {
    res.sendFile(__dirname + '/' + staticFolder + '/mockData/collection-instrument-bundles.json');
});

app.get('/api/surveys/:id', (req, res) => {
    let id = req.url.split('/').pop();

    if (id === 'cb0711c3-0ac8-41d3-ae0e-567e5ea1ef87') {
        res.sendFile(__dirname + '/' + staticFolder + '/mockData/survey-bres.json');
    } else {
        res.sendFile(__dirname + '/' + staticFolder + '/mockData/survey-another.json');
    }
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

// Used by ras-frontstage to obtain a list of cases (surveys)
app.get('/api/my-surveys/todo/:id', (req, res) => {
    res.sendFile(__dirname + '/' + staticFolder + '/mockData/my-surveys.json');
});

// Used by ras-frontstage to download a collection instrument spreadsheet
app.get('/api/collection-instruments/download/:id', (req, res) => {
    res.sendFile(__dirname + '/' + staticFolder + '/mockData/collection-instrument.xlsx');
});

// Used by ras-frontstage to get the file size of a collection instrument spreadsheet
app.get('/api/collection-instruments/collectioninstrument/id/:id', (req, res) => {
    // console.log('collection-instrument.json');
    res.sendFile(__dirname + '/' + staticFolder + '/mockData/collection-instrument.json');
});

// Used by ras-frontstage to upload a survey response
app.post('/api/collection-instruments/survey_responses/:id', function(req, res) {

    // Send response code or error message
    // res.status(200).json({
    //     code: '1001',
    //     text: 'Survey response successfully uploaded'
    // });

    // Error
    res.status(400).json({
        code: '1002',
        text: 'Error uploading survey response - the file is too large'
    });

    // res.status(400).json({
    //     code: '1003',
    //     text: 'Error uploading survey response - the file is not an Excel spreadsheet'
    // });

    // res.status(400).json({
    //     code: '1004',
    //     text: 'Error uploading survey response - the filename is too long'
    // });
    //
    // res.status(400).json({
    //     code: '1005',
    //     text: 'Error uploading survey response - malicious content detected'
    // });
});

// Used by ras-frontstage to validate an enrolment code
app.get('/api/iacs/:iac', (req, res) => {
    let iac = req.url.split('/').pop();

    if (iac === 'abcdef000001') {
        // active
        res.sendFile(__dirname + '/' + staticFolder + '/mockData/iac.json');
    } else if (iac === 'abcdef000000') {
        // inactive
        res.sendFile(__dirname + '/' + staticFolder + '/mockData/iac-inactive.json');
    } else {
        res.status(404).send('Not found');
    }
});
