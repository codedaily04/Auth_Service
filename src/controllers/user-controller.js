const UserService=require('../services/user-service');

const userservice=new UserService();

const create=async (req,res)=>{
    try {
        const response=await userservice.create({
            email: req.body.email,
            password:req.body.password
        });
        return res.status(201).json({
            message:"Successfully Created a user",
            success:true,
            data:response,
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500),json({
            message:"Something went wrong in the controller-layer",
            data:{},
            success:false,
            err:error
        })
    }
}

module.exports={
    create
}