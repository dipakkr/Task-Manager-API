import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique : true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
});

UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id : user._id.toString()}, 'hellogithub');
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
    
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user;
}

// This Middleware will be used just before saving
UserSchema.pre('save', async function(next){
    
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('User', UserSchema); 

export default User;