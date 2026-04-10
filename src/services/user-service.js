const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');

const UserRepository=require('../repository/user-repository');
const {JWT_KEY}=require('../config/serverConfig');

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

    //for plain sign in process
    async signIn(email,plainpassword){
        try {
            // step 1: fetch the user by email from database
            const user= await this.userRepository.getByEmail(email);
            //step 2: compare the password
            const passwordMatch=this.checkPassword(plainpassword,user.password);
            if(!passwordMatch){
                console.log('Password does not match');
                throw {error:'Incorrect Password'};
            }
            //step 3: if password matches then create a token and send to user
            const newJWT=this.createToken({email:user.email,id:user.id});
            return newJWT;
        } catch (error) {
            console.log('Something is wrong is User-repo layer');
            throw error;
        }
    }

    //If the JWT token is valid for 1 day but user have already deleted the account within 1 day then what will happen to the JWT token
    async isAuthenticated(token){
        try {
            const reponse=this.verifyToken(token);
            if(!reponse){
                throw {error:'Invalid Token'};
            }
            const user=this.userRepository.getById(reponse.id);
            if(!user){
                throw {error:'No user found for this token'};
            }
            return user.id;
        } catch (error) {
            console.log('Something is wrong is User-repo layer');
            throw error;
        }
    }


    //Creating  a function for jwt tokens
    createToken(user){
        try {
            const result=jwt.sign(user,JWT_KEY,{expiresIn:'1d'});
            return result;
        } catch (error) {
            console.log('Something is wrong is Token creation');
            throw error;
        }
    }
    //This function is used to verify the token which is created by the createToken function
    verifyToken(token){
        try {
            const response=jwt.verify(token,JWT_KEY);
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
    //encrypting the password will get from repository layer

}

module.exports=UserService;