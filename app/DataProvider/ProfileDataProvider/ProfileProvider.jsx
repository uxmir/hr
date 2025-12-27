

"use client";
import React, { createContext, useContext, useEffect, useReducer } from "react";
const ProfileContext = createContext();
  const initialState = {
    profileData: null,
    isLoading: true,
    error: null,
  };
  const profileReducer = (state,action) => {
    switch (action.type) {
      case "FETCH_START":
        return {
          ...state,
          profileData: null,
          isLoading: true,
          error: null,
        };
      case "FETCH_SUCCESS":
        return {
          ...state,
          profileData: action.payload,
          isLoading: false,
          error: null,
        };

      case "FETCH_EMTY":
        return {
          ...state,
          profileData: null,
          isLoading: false,
          error: null,
        };
      case "FETCH_ERROR":
        return {
          ...state,
          profileData: null,
          isLoading: false,
          error: action.payload,
        };
        default:return state
        
    }
  };
const ProfileProvider = ({ children }) => {
   const [state,dispatch]=useReducer(profileReducer,initialState)
   //intregetting api
   const createProfileData=async(formData)=>{
    const token=localStorage.getItem("token")
    if(!token){
   dispatch({
    type:"FETCH_ERROR",
    payload:"Token is not found"
   })
   return;
    }
    //api
    const create_api=process.env.NEXT_PUBLIC_PROFILE_API 
    try {
      dispatch({type:"FETCH_START"})
      const response=await fetch(create_api,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(formData)
      })
      const data=await response.json()
      if(data.success){
        dispatch({
          type:"FETCH_SUCCESS",
          payload:data.profile
        })
        alert("data is created ")
      }
    } catch (error) {
      dispatch({
        type:"FETCH_ERROR",
        payload:"data is not created"
      })
    }
   }
   //getapi
   const getProfileData=async()=>{
    const token=localStorage.getItem("token")
    if(!token){
      dispatch({
        type:"FETCH_ERROR",
        payload:"token is not found"
      })
      return;
    }
    //api
    const get_api=process.env.NEXT_PUBLIC_PROFILE_API
    dispatch({type:"FETCH_START"})
    try {
      const response=await fetch(get_api,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
               Authorization:`Bearer ${token}`
        } ,
        body:JSON.stringify()
      })
      const data=await response.json()
      if(data.success){
        dispatch({
          type:"FETCH_SUCCESS",
          payload:data.getProfile
        })
      }
    } catch (error) {
      dispatch({
        type:"FETCH_ERROR",
        payload:"Data is not found"
      })
    }
   }
   useEffect(()=>{
    getProfileData()
   },[])
  return <ProfileContext.Provider 
  value={{
    profileData:state.profileData,
    isLoading:state.isLoading,
    error:state.error,
    createProfileData
  }}>
    {children}
    </ProfileContext.Provider>;
};

export default ProfileProvider;

export const useProfile = () => useContext(ProfileContext);





























