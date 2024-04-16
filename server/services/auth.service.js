const httpStatus = require('http-status');
const { User } = require('../models/user');
const userService = require('./user.service');
const { ApiError } = require('../middleware/apiError');

const createUser = async(email,password)=>{
   try{
        if(await User.emailTaken(email)){
            // throw new Error('Sorry email taken')
            throw new ApiError(httpStatus.BAD_REQUEST,'Sorry email taken');
        }

        const user = new User({
            email,
            password
        });
        await user.save();
        return user;
   } catch(error){
        throw error;
   }
}

const genAuthToken = (user) => {
    const token = user.generateAuthToken();
    return token;
}

const signInWithEmailAndPassword = async(email,password)=>{
    try {
        const user = await userService.findUserByEmail(email);
        if(!user){
            // throw new Error('Sorry BAD email');
            throw new ApiError(httpStatus.BAD_REQUEST,'Sorry BAD email')
        }
        /// validate password
        if(!(await user.comparePassword(password))){
            //throw new Error('Sorry BAD password');
            throw new ApiError(httpStatus.BAD_REQUEST,'Sorry BAD password')
        }
        return user;
    } catch(error){
        throw error;
    }
}


module.exports = {
    createUser,
    genAuthToken,
    signInWithEmailAndPassword
}
