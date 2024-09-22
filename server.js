const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit', (req, res) => {
    const { doubt, subject } = req.body;
    const newEntry = { doubt, subject };

    fs.readFile('doubts.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error writing to file');
        }

        const jsonData = JSON.parse(data || '[]'); 
        jsonData.push(newEntry); 

        fs.writeFile('doubts.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Error writing to file');
            }
            res.status(200).send('Doubt submitted successfully!');
        });
    });
});

app.listen(PORT, () => {
});