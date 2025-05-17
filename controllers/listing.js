const Listing = require('../models/listing');


module.exports.index = async (req, res) => {
        const allListings = await Listing.find({});
        res.render('listings/index.ejs', { allListings });
    
};

module.exports.renderNew = (req, res) => {
    res.render('listings/new.ejs');
};


module.exports.createNew = async (req, res) => {
    
        const newListing = new Listing(req.body.listings);
        newListing.owner=req.user._id;
        await newListing.save();
        req.flash('success', "New Listing Created!")
        res.redirect('/listings');

};


module.exports.renderEdit= async (req, res) => {
        const { id } = req.params;
        const data = await Listing.findById(id);
        if (!data){
                req.flash('error', "Listing you requested for does not exist")
                res.redirect('/listings')
        };
        res.render('listings/update.ejs', { data });
};

module.exports.update = async (req, res) => {
        const { id } = req.params;
        const updateData = req.body.listings;
        await Listing.findByIdAndUpdate(id, updateData);
        req.flash('update', " Listing updated!")
        res.redirect('/listings/' + id);
  
};


module.exports.delete = async (req, res)=>{
        let {id} = req.params;
     await Listing.findByIdAndDelete(id);
     req.flash('success', "Listing is Deleted!")
     res.redirect('/listings');
};

module.exports.show = async (req, res) => {
        const { id } = req.params;
        const data = await Listing.findById(id).populate({path: 'review',
        populate: {
            path: 'author',
            model: 'user'
        }}).populate('owner');
        
        if (!data){
                req.flash('error', "Listing you requested for does not exist")
                res.redirect('/listings')
        };
        res.render('listings/show.ejs', { data });
    
};