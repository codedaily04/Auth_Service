const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');

const UserRepository=require('../repository/user-repository');
const {JWT_Key}=require('../config/serverConfig');

class UserService{
    constructor(){
        this.userRepository=new UserRepository();
    }
    //This Function is mainly used to create the new Sign up data.
    async create(data){
        try {
            const user=await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log('Something is wrong is User-repo layer');
            throw error;
        }
    }
    //Creating  a function for jwt tokens
    createToken(user){
        try {
            const result=jwt.sign(user,JWT_Key,{expiresIn:'1d'});
            return result;
        } catch (error) {
            console.log('Something is wrong is Token creation');
            throw error;
        }
    }
    //This function is used to verify the token which is created by the createToken function
    verifyToken(token){
        try {
            const response=jwt.verify(token,JWT_Key);
            return response;
        } catch (error) {
            console.log('Something is wrong is Token verification');
            throw error;
        }
    }
    //checking the password is correct or not
    checkPassword(userInputPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPassword,encryptedPassword);
        } catch (error) {
            console.log('Something is wrong is password comparison');
            throw error;
        }
    }   

}

module.exports=UserService;