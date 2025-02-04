import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'

const createToken = (_id) => {
    // the _id is part of the payload of the token
    // and then we pass in the secret 
    // and expiresIn which means the user will remain logged in for 3 days
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// login user
export const loginUser = async (req, res) => {
    res.json({mssg: 'login user'})
}

// signup user
export const signupUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.signup(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}