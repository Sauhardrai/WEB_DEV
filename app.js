if (process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsmate = require('ejs-mate');
const ExpressError = require('./utile/expressError.js');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const listingsRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js')
const user= require('./models/user.js');
const passport = require("passport");
const localStrategy = require('passport-local');



// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs',ejsmate);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname , "/public")));

const db_url = process.env.ATLASDB_URL;


// Connect to MongoDB with debug
async function main() {
    try {
        await mongoose.connect(db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000 // 10 seconds
        });
        console.log('✅ MongoDB connected');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
    }
}

// Log connection events
mongoose.connection.on('connected', () => {
    console.log('✅ [Mongoose] Connection established');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ [Mongoose] Error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ [Mongoose] Disconnected from DB');
});

main();

const store = MongoStore.create(
    {mongoUrl: db_url,
        crypto:{
            secret: process.env.SECRET,
            
        },
        touchAfter: 24* 3600, 
    }
)

store.on('error',()=>{
    console.log("ERROR IN MONGO STORE" , err)
})

const sessionOption= {
    store,
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    Cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};





// set session

app.use(session(sessionOption));
app.use(flash());

// aunthefiction
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());




app.use((req,res,next)=>{
    res.locals.success= req.flash('success');
    res.locals.error= req.flash('error');
    res.locals.update= req.flash('update');
    res.locals.user = req.user;
    next();
});




// listings route 
app.use('/listings', listingsRouter);
// Review routes
app.use('/listings/:id/reviews', reviewRouter);

// user routes
app.use('/',userRouter);





// 404 Handler
app.use((req , res , next ) => {
    next(new ExpressError(404, 'Page Not Found!'));
});


// Global Error Handler
app.use((err, req , res , next) => {
    const { status = 500, message = 'Something went wrong!' } = err;
    console.log(err);
    res.status(status).render('error.ejs', {message});
});


// Start server
app.listen(8080, () => {
    console.log('🚀 Server is running on port 8080');
});
