
import { NextResponse } from "next/server";
import cloudinary from "../../../utils/Cloudinary/cloudinary";
export const POST=async(req)=>{
    try {
        const data=await req.formData()
        const file=data.get("file")
        const arrayBuffer=await file.arrayBuffer()
        const buffer=Buffer.form(arrayBuffer)
        const uploadResult=await new Promise((resolve,reject)=>{
       cloudinary.uploader.upload_stream({},(err,result)=>{
        if(err) reject(err)
        else resolve(result)
       }).end(buffer)
        })
        return NextResponse.json({
            success:true,
            message:"image is uploaded"
        })
    } catch (error) {
      return NextResponse.json({
        success:false,
        message:"image is not uploaded"
      })   
    }
}