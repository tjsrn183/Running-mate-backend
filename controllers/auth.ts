import bcrypt from "bcrypt";
import passport from "passport"; 
import User from "../models/user";
import { ReqResNext } from "..";

const join=async({req,res,next}:ReqResNext)=>{
        const {email,nick,password}=req.body;
    try{
        const exUser=await User.findOne({where:{email}});
        if(exUser){