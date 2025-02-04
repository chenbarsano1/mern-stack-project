// define how our user documents should look
import mongoose from "mongoose";

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

export default mongoose.model('User', userSchema)