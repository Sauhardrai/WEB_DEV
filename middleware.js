const Listing = require('./models/listing');
const Review = require('./models/Review');



module.exports.isLoggedIn =  (req, res, next) =>{
        if (!req.isAuthenticated()){
            req.session.redirectUrl = req.originalUrl;
               req.flash('error' , 'You must have to Login ')
              return  res.redirect('/login') 
        }
        next()
}; 


module.exports.saveRedirecturl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl= req.session.redirectUrl;
    }
    next()
};

module.exports.isOwner =async (req,res,next) =>{
    const { id } = req.params;
        let listing =await  Listing.findById(id);
        if (!listing.owner._id.equals(res.locals.user._id)){
                req.flash('error', 'You don"t have a Permission to edit')
                return res.redirect('/listings/' + id)
        }
    next() ; 
};

module.exports.isReviewAuthor =async (req,res,next) =>{
    const {id , reviewId } = req.params;
        let review = await Review.findById(reviewId)
        if (!review.author.equals(res.locals.user._id)){
                req.flash('error', 'You don"t have a Permission to Delete')
                return res.redirect('/listings/' + id)
        }
    next() ; 
};