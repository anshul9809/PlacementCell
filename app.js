require("dotenv").config();

const express = require('express');
const port = 5001;

// Create an express app
const app = express();
const cors = require('cors');
const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passpostLocalStrategy');
const MongoStore = require('connect-mongo');

const flash = require('connect-flash');
const flashmiddleware = require('./config/flashMessagesMiddleware');
app.use(express.urlencoded({extended:true}));
app.use(cors());


//setting the view engine as ejs
app.set("view engine", "ejs");
app.set("views", './views');

//to store session cookie in database
app.use(
    session({
      name: "PlacementCell",
      secret:process.env.SECRET_KEY, // secret key for encryption of cookies, change it everytime you deploy your application on a server
      saveUninitialized: false,
      resave: false,
      cookie:{
            maxAge: 1000*60*100
        },
        store: MongoStore.create(
            {
            mongoUrl:'mongodb+srv://mongo:mongo@anshulcluster.k7iipbc.mongodb.net/',
            autoRemove: 'disabled',
            mongooseConnection:db,
            collectionName:"sessions"
            },
            function(error){
            console.log(error || "connect mongodb setup is ok");
            }
        )
    })
);
  
//for Authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//setting the flash messages
app.use(flash());
app.use(flashmiddleware.setFlash);

//setting the route
app.use('/', require('./routes'));

//setting the server
app.listen(port, function (error) {
    if (error) {
      console.log(`Error in connecting with server: ${error}`);
    }
    console.log(`Successfully connecting with server ${port}`);
});
