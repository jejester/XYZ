const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());

//Routers
const postsRouter = require('./routes/Posts');
app.use('/posts', postsRouter);

//Connects to the database then starts the server
db.sequelize.sync().then(() => {
    console.log("Database successfully connected!");
}).then(() => {
    app.listen(5000, () => {
        console.log("Server running on port 5000.");
    });
});

