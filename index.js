const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//for accessing static files
app.use(express.static('./assets'));

app.use(express.urlencoded({extended:true}));

//parsing cookies
app.use(cookieParser());

//for using Layouts
app.use(expressLayouts);


//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));





//extracting link and script tags
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name : 'ToDo',
    secret: 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
        },
        store : MongoStore.create(
            {
                mongoUrl : 'mongodb://localhost/codeial_development',
                autoRemove:'disabled'
            },
            function(err){
                console.log(err||'connect mongo-db setup ok');
            }
        )
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//setting up route
app.use('/',require('./routes/index'));


//running our express server
app.listen(port,function(err){
    if (err){
        console.log(`Error : ${err}`);
        return;
    }

    console.log(`Server running on port : ${port}`);
});

