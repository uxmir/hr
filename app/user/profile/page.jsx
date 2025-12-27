"use client"
import React, { useContext, useEffect } from 'react'
import {ProfileForm} from '../../components/ProfilePageComponent/Profile'
import { AuthContext } from "@/app/DataProvider/AuthProvider/AuthProvider";
import { useRouter } from 'next/navigation';
const page = () => {
 const {user, loading}=useContext(AuthContext) 
 const router=useRouter()
  const User = user?.category === "employe";
  
  useEffect(() => {
    if (!User && !loading) {
      router.push("/login");
    }
  }, [User, loading]);
  if (!User) {
    return null;
  }
  return (
    <div>
    <ProfileForm/>
    </div>
  )
}

export default page
