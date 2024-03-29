import jwt from "jsonwebtoken";
// import {JWT_SECRET} from "../config.js";
// import { process.env.JWT_SECRET } from "process";

export const requireSignin=(req,res,next)=>{
    try{
    const decoded=jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
   req.user=decoded;//req.user._id
    next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({error:"Invalid or expired token"});
    }
};
