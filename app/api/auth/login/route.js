import HrAuth from "../../../../models/AuthModel/auth";
import dbConnect from "../../../../utils/Dbconnect/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export const POST=async(req)=>{
  await dbConnect()
  try {
    const body=await req.json()
    const {email,password}=body
    if(!email || !password){
     return NextResponse.json({
       success:false,
      message:" missing emar or password"
     })
    }
    //checking by email
    const user=await HrAuth.findOne({email})
    if(!user){
      return NextResponse.json({
        success:false,
        message:"there is no user in this email"
      })
    }
    //matching password
    const isMatchPassword=await bcrypt.compare(password,user.password)
    if(!isMatchPassword){
      return NextResponse.json({
      success:false,
      message:"this password is not matched"
      })
    }
    //creating token
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    return NextResponse.json({
      success:true,
      message:"user logged successfully",
      token,
      user:{id:user._id, name:user.name, email:user.email, category:user.category}
    })
  } catch (error) {
    console.error("there is something wrong",error)
  }
}

