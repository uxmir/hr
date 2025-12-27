import dbConnect from "../../../utils/Dbconnect/db";
import ProfileHr from "../../../models/ProfileModel/Profile";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
//creating data
export const POST = async (req) => {
  await dbConnect();
  try {
    //tokenvalidation
    const token=req.headers.get("authorization")?.split(" ")[1];
    if(!token){
      return NextResponse.json({
        success:false,
        message:"token not found"
      })
    }
    //decoded token
    const decoded=jwt.verify(token, process.env.JWT_SECRET)
    const body = await req.json();
    const {
      professional_name,
      designation,
      employe_id,
      job_type,
      experience,
      salary,
      email,
      phone_number,
    } = body;
    //data validation
    if (
      !professional_name ||
      !designation ||
      !employe_id ||
      !job_type ||
      !experience ||
      !salary ||
      !email ||
      !phone_number
    ) {
      return NextResponse.json({
        success: false,
        message: "data is misssng",
      });
    }
    //creating data
    const profile = await ProfileHr.create({
      user:new mongoose.Types.ObjectId(decoded.id),
      professional_name,
      designation,
      employe_id,
      job_type,
      experience,
      salary,
      email,
      phone_number,
    });
    return NextResponse.json({
        success:true,
        message:"profile data is created",
        profile
    })
  } catch (error) {
    console.error("profile data is not created", error);
  }
};
//gettting data by userToken
export const GET=async(req)=>{
  await dbConnect()
  try {
    const token=req.headers.get("authorization").split(" ")[1]
    if(!token){
      return NextResponse.json({
        success:false,
        message:"token is not found in backend"
      })
    }
    //decodedtoken
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const getProfile=await ProfileHr.find({user:new mongoose.Types.ObjectId(decoded.id)})
    return NextResponse.json({
      success:true,
      message:"profile data is found in backend",
      getProfile
    })
  } catch (error) {
    console.error("data is not found",error)
  }
}