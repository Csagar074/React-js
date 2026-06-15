require('dotenv').config();
const express = require('express');

const morgan = require('morgan');
const cors = require('cors');

require('./config/db.config');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', require('./routes/'));

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server is not started..", err);
        return;
    }

    console.log("Server is started...");
});