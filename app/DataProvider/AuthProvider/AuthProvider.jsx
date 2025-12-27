"use client"
import { useRouter } from 'next/navigation'
import React, {useState, useContext,createContext, useEffect } from 'react'
export const AuthContext=createContext()
const AuthProvider = ({children}) => {
//parsing token
const [user,setUser]=useState(null)
const [loading,setLoading]=useState(true)
const router=useRouter()
useEffect(()=>{
const savedUser=localStorage.getItem("user")
try {
  if(savedUser){
    const parsedUser=JSON.parse(savedUser)
    setUser(parsedUser)
  }
} catch (error) {
  console.error('there is something wrong',error)
  localStorage.removeItem("user")
}
setLoading(false)
},[])
//signup logic
const signUpUser=async(formData)=>{
  const signup_api=process.env.NEXT_PUBLIC_SIGNUP_API
  try {
    const response=await fetch(signup_api,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(formData)
    })
    const data=await response.json()
    if(data.success){
      alert("user is created")
      setUser(data.user)
      localStorage.setItem("user",JSON.stringify(data.user))
      localStorage.setItem("token",data.token)

      if(data.user.category==='admin'){
        router.push("/admin")
      }
      else if(data.user.category==='employe'){
        router.push("/user/profile")
      }
    }
    else{
      alert("user is not created")
      localStorage.removeItem("user")
      localStorage.removeItem("token")
    }
  } catch (error) {
    console.error("there is an error",error)
  }
}
//loginLogic
const loginUser=async(formData)=>{
  const login_api=process.env.NEXT_PUBLIC_LOGIN_API
  try {
    const response=await fetch(login_api,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(formData)
    })
    const data=await response.json()
    if(data.success){
      setUser(data.user)
      alert("user has been logged")
      localStorage.setItem("user",JSON.stringify(data.user))
      localStorage.setItem("token",data.token)
      if(data.user.category==="admin"){
        router.push("/admin")
      }
      else if(data.user.category==="employe"){
        router.push("/")
      }
    }
  } catch (error) {
    console.error("user not found",error)
  }
}
//logoutLogic
const logout=()=>{
  const token=localStorage.getItem("token")
  const user=localStorage.getItem("user")
  if(!user && !token){
    return;
  }
  localStorage.removeItem("user")
  localStorage.removeItem("token")
  setUser(null)
  router.push("/login")
}
  return (
<AuthContext.Provider value={{signUpUser,loading,user,loginUser,logout}}>
{children}
</AuthContext.Provider>
  )
}

export default AuthProvider
