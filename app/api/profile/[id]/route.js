import dbConnect from "../../../../utils/Dbconnect/db";
import ProfileHr from "../../../../models/ProfileModel/Profile";
import { NextResponse } from "next/server";
import { profile } from "console";

//deleting data
export const DELETE = async (req, { params }) => {
  await dbConnect();
  try {
    const { id } = await params;
    const deleteProfile = await ProfileHr.findByIdAndDelete(id);
    if (!deleteProfile) {
      return NextResponse.json({
        success: false,
        message: "data is not deleted",
      });
    }
    return NextResponse.json({
      success: true,
      message: "profiledata is deleted",
      deleteProfile,
    });
  } catch (error) {
    console.error("data is not deleted", error);
  }
};

export const PUT = async (req, { params }) => {
  await dbConnect();
  try {
    const { id } = await params;
    const body =  await req.json();
    const updatedProfile = await ProfileHr.findByIdAndUpdate(id,body,{new:true});
    if (!updatedProfile) {
      return NextResponse.json({
        success: false,
        message: "data is not updated",
      });
    }
    return NextResponse.json({
      success: true,
      message: "profiledata is updated",
      updatedProfile,
    });
  } catch (error) {
    console.error("data is not updated", error);
  }
};
