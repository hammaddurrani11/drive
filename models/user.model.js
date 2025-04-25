const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [3, 'Username must be atleast 3 characters long']
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        minlength: [13, 'Email must be atleast 13 characters long']
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: [5, 'Password must be atleast 5 characters long']
    }
})

const user = mongoose.model('user', userSchema);
module.exports = user