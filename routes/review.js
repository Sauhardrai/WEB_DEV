const express = require('express');
const router = express.Router({mergeParams: true});
const warpasync = require ('../utile/warpasync.js')
const {reviewSchema} = require('../schema.js')
const ExpressError = require('../utile/expressError.js')
const Listing = require('../models/listing.js'); // Adjust path if needed
const Review = require('../models/Review.js')
const {isLoggedIn, isReviewAuthor} = require('../middleware.js')
const reviewcontroller = require('../controllers/review.js')



const validatereview= (req , res , next) =>{
    let {error}= reviewSchema.validate(req.body);
    if (error){
        let errmsg= error.details.map((el)=>el.message).join(',');
        throw new ExpressError (400,errmsg);
    }else {
        next()
    };
};


// Review Route
// post Route
router.post('/',isLoggedIn, validatereview , warpasync(reviewcontroller.postReview));

//delete route review

router.delete('/:reviewId',isLoggedIn,isReviewAuthor, warpasync(reviewcontroller.delete));


module.exports = router;