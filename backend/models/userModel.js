// define how our user documents should look
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true, 
        unique: true // can't signup twice with the same email
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method - creates a static method on our user model
userSchema.statics.signup = async function(email, password) {
    // validation 
    if(!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }


    // using 'this' because we don't have the User model yet
    const exists = await this.findOne({email})
    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})
    return user

}

// static login method (using 'function' and not an arrow so we can use 'this')
userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})
    if (!user) {
        throw Error('Incorrect email')
    }

    // passing the plaintext password, and the hashed user password
    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        throw Error('Incorrect password')
    }

    return user
}

export default mongoose.model('User', userSchema)