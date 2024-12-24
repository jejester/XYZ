const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');

//Allows to receive json
app.use(express.json());

//Enables CORS
app.use(cors());

//Routers
const postsRouter = require('./routes/Posts');
app.use('/posts', postsRouter);
const commentsRouter = require('./routes/Comments');
app.use('/comments', commentsRouter);
const usersRouter = require('./routes/Users');
app.use('/auth', usersRouter);

//Connects to the database then starts the server
db.sequelize.sync().then(() => {
    console.log("Database successfully connected!");
}).then(() => {
    app.listen(5000, () => {
        console.log("Server running on port 5000.");
    });
});

