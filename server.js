const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Endpoint to save test data
app.post('/save-test', (req, res) => {
    const testName = req.body.testTitle; // Using 'testTitle' as the file name
    const testData = JSON.stringify(req.body);
    const filePath = path.join(__dirname, 'tests', `${testName}.json`);

    fs.writeFile(filePath, testData, (err) => {
        if (err) {
            return res.status(500).send('Failed to save test data');
        }
        res.send('Test data saved successfully');
    });
});

// Endpoint to load test data
app.get('/load-test/:testTitle', (req, res) => {
    const testTitle = req.params.testTitle;
    const filePath = path.join(__dirname, 'tests', `${testTitle}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Failed to load test data');
        }
        res.send(JSON.parse(data));
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
