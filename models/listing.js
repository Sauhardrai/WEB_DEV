const mongoose = require('mongoose');
const review = require('./Review');

const Schema = mongoose.Schema;

const listingSchima = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: Object,
    price: { type:Number , default:10} ,
    location: String,
    country:String  ,

    review:[ {
        type: Schema.Types.ObjectId,
        ref:"Review"
    }],

    owner:{
        type: Schema.Types.ObjectId,
        ref:'user'

    }
    

}
)

// mongoose middlewere
listingSchima.post('findOneAndDelete', async (listing ) =>{
        if (listing){
            await review.deleteMany({_id:{$in: listing.review}});
        };
});

const Listing = mongoose.model("Listing", listingSchima);
module.exports= Listing;