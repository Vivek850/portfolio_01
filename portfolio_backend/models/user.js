const mongoose = requrie('mongoose');

const userSchema = new mongoose.schema({
    name:{
        type: String,
        require: true,
    },
    email:{
    type: String,
    retuired: true,
    unique: true,
    },
    password:{
    type: String,
    required: true,
    }
},
{timestamps:true});

const User = mongoose.model('user', userSchema);

module.exports = User;