const express =require('express');
const router= express.Router();
const warpasync = require ('../utile/warpasync.js')
// const {userSchema} = require('../schema.js')
const ExpressError = require('../utile/expressError.js')
const user = require('../models/user.js');
const passport = require('passport');
const { saveRedirecturl } = require('../middleware.js');
const usercontroller = require('../controllers/user.js')

router.get('/signup' , usercontroller.signupRender);

router.post('/signup', warpasync(usercontroller.signupDb));

router.get('/login' ,usercontroller.loginRender);

router.post('/login', saveRedirecturl ,passport.authenticate('local',{failureRedirect: '/login', failureFlash: true}),warpasync(usercontroller.loginDb));

router.get('/logout',usercontroller.logOut);



module.exports= router;

