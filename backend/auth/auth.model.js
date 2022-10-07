const mongoose = require('mongoose');
//mongoose.set(useCreateIndex, true);

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
},  {
    timestamps:true
    }
);

module.exports = userSchema;

