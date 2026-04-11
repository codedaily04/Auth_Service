const UserService=require('../services/user-service');
const {response}=require('express');
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

    const signin = async (req,res)=>{
        try {
            const response=await userservice.signIn(req.body.email,req.body.password);
            return res.status(200).json({
                message:"Successfully signed in",
                success:true,
                data:response,
                err:{}
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message:"Something went wrong in the controller-layer",
                data:{},
                success:false,
                err:error
            });
        }
    }

    const isAuthenticated=async (req,res)=>{
        try {
           const token=req.headers['x-access-token'];
           const reponse = userservice.verifyToken(token);
           return res.status(200).json({
                message:"User is authenticated and token is valid",
                success:true,
                data:reponse,
                err:{}
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message:"Something went wrong in the controller-layer",
                data:{},
                success:false,
                err:error
            });
        }
    }

const isAdmin=async (req,res)=>{
    try {
        const response = await userservice.isAdmin(req.body.id);
        return res.status(200).json({
            message:"User is Admin",
            success:true,
            data:response,
            err:{}
        });
     } catch (error) {
         console.log(error);
         return res.status(500).json({
             message:"Something went wrong in the controller-layer",
             data:{},
             success:false,
             err:error
         });
     }
}

module.exports={
    create,
    signin,
    isAuthenticated,
    isAdmin
}