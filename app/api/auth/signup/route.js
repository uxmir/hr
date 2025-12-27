import { NextResponse } from "next/server";
import HrAuth from "../../../../models/AuthModel/auth";
import dbConnect from "../../../../utils/Dbconnect/db";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";
export const POST = async (req) => {
  await dbConnect();
  try {
    const body = await req.json();
    const { name, email, category, password } = body;
    if (!name || !email || !category || !password) {
      return NextResponse.json({
        success: false,
        message: "there is something missing",
      });
    }
    //checking email
    const existing = await HrAuth.findOne({ email });
    if (existing) {
      return NextResponse.json({
        success: false,
        message: "this emial is regisdtred",
      });
    }
    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await HrAuth.create({
      name,
      email,
      category,
      password: hashedPassword,
    });
    //creating token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    return NextResponse.json({
      success: true,
      message: "user is created",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        category:newUser.category
      },
    });
  } catch (error) {
    console.error("there is something wrong", error);
  }
};
