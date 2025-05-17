const mongoose = require('mongoose')
const intData = require('./data.js')
const Listing = require('../models/listing.js')

main()
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log(err)

    })






async function main() {
    await mongoose.connect('mongodb+srv://lovunaruto:H4lZJGlG8IV4pJbe@cluster0.ylfn76p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
}

const initDB = async () => {
    await Listing.deleteMany({})
    intData.data = intData.data.map((obj)=>({
        ...obj,
        owner:'6828a5e7e32f27068fef3cc0'
    }));
    await Listing.insertMany(intData.data);
    console.log('data')

};


initDB();
