const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passpostLocalMangoose = require('passport-local-mongoose');

const userShcema= new Schema({
    email: {
        type: String,
        required: true
    },
    
});

userShcema.plugin(passpostLocalMangoose);

module.exports= mongoose.model('user',userShcema);
