const express = require('express');
const app = express();

const db = require('./models');

app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

db.sequelize.sync().then(() => {
    console.log("Database successfully connected!");
}).then(() => {
    app.listen(5000, () => {
        console.log("Server running on port 5000.");
    })
})

