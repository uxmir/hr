import dbConnect from "../../../utils/Dbconnect/db";
import ProfileHr from "../../../models/ProfileModel/Profile";
import { NextResponse } from "next/server"; 
export const GET=async()=>{
    await dbConnect()
    try {
      const allprofileData=await ProfileHr.find()
      if(!allprofileData){
        return NextResponse.json({
            success:false,
            message:"data is not got"
        })
      }
      return NextResponse.json({
        success:true,
        message:'all data is here',
        allprofileData
      })  
    } catch (error) {
      return NextResponse.json({
        success:"false",
        message:"data is not found"
      })  
    }
}