const express = require('express');
const router = express.Router();
const warpasync = require ('../utile/warpasync.js');
const {listingSchema} = require('../schema.js');
const ExpressError = require('../utile/expressError.js');
const Listing = require('../models/listing.js');
const {isLoggedIn, isOwner} = require('../middleware.js');

const listingcontroller = require('../controllers/listing.js')


const validatelisting= (req , res , next) =>{
    let {error}= listingSchema.validate(req.body);
    if (error){
        let errmsg= error.details.map((el)=>el.message).join(',');
        throw new ExpressError (400,errmsg);
    }else {
        next()
    };
};



// Index Route
router.get('/',warpasync(listingcontroller.index));

// Create new listing route
router.get("/new",isLoggedIn, listingcontroller.renderNew); 

// Create Listing
router.post('/create',isLoggedIn,validatelisting, warpasync(listingcontroller.createNew));

// Edit Form
router.get('/edit/:id',isLoggedIn,isOwner, warpasync(listingcontroller.renderEdit));

// Update Listing
router.put('/update/:id',isLoggedIn , isOwner ,validatelisting, warpasync(listingcontroller.update));

// Delete Route 

router.delete('/:id',isLoggedIn,isOwner, warpasync(listingcontroller.delete));


// Show single listing
router.get('/:id', warpasync(listingcontroller.show));


module.exports = router;