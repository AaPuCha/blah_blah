const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to database
mongoose.connect(config.database);

//successful connection
mongoose.connection.on('connected', () =>{
    console.log('Connected to database' + config.database);
});

//on error
mongoose.connection.on('error', () =>{
    console.log('Connetion Error' + err);
});


const app = express();

const users = require('./routes/users');

const port = 3000;

//cors middleware

app.use(cors());

//set static Folder
app.use(express.static(path.join(__dirname,'public')));

//body parser middleware

app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


require('./config/passport')(passport);

app.use('/users',users);

app.get('/', (req, res ) => {
    res.send('Fallback')
});

app.listen(port ,() =>{
    console.log('Server started on port '+port);
});