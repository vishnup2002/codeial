const express = require('express');
const app = express();
const port = 8000;

app.use('/',require('./routes/index'));

app.set('view engine','ejs');
app.set('views','./views')

app.listen(port,function(err){
    if (err){
        console.log(`Error : ${err}`);
        return;
    }

    console.log(`Server running on port : ${port}`);
});

