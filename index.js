const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const db = require('./config/mongoose');


//for accessing static files
app.use(express.static('./assets'));

//for using Layouts
app.use(expressLayouts);

//setting up route
app.use('/',require('./routes/index'));


//extracting link and script tags
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');


//running our express server
app.listen(port,function(err){
    if (err){
        console.log(`Error : ${err}`);
        return;
    }

    console.log(`Server running on port : ${port}`);
});

