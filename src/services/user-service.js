const UserRepository=require('../repository/user-repository');

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
}

module.exports=UserService;