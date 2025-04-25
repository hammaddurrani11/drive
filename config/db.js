const mongoose = require('mongoose');

const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('Connected to Database');
    })
}

module.exports = connectToDB