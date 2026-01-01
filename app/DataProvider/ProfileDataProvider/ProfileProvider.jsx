"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useReducer } from "react";
const ProfileContext = createContext();
const initialState = {
  profileData: [],
  allProfileData:[],
  isLoading: true,
  error: null,
};
const profileReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        profileData:[],
        isLoading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        profileData:action.payload,
        isLoading: false,
        error: null,
      };

      case "FETCH_ALL_DATA_SUCCESS":
        return{
          ...state,
          allProfileData:action.payload,
          isLoading:false,
          error:null
        };
    case "FETCH_EMTY":
      return {
        ...state,
        profileData:[],
        allProfileData:[],
        isLoading: false,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        profileData:[],
        allProfileData:[],
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const router = useRouter();
  //intregetting api
  const createProfileData = async (formData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch({
        type: "FETCH_ERROR",
        payload: "Token is not found",
      });
      return;
    }
    //api
    const create_api = process.env.NEXT_PUBLIC_PROFILE_API;
    try {
      dispatch({ type: "FETCH_START" });
      const response = await fetch(create_api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        // //this is finding method problem
       const createdList=Array.isArray(state.profileData)?[...state.profileData, data.profile]:[data.profile]
        dispatch({
          type: "FETCH_SUCCESS",
          payload: createdList,
        });
        alert("data is created ");
        router.push("/");
      }
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload: "data is not created",
      });
    }
  };
  //getapi
  const getProfileData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch({
        type: "FETCH_ERROR",
        payload: "token is not found",
      });
      return;
    }
    //api
    const get_api = process.env.NEXT_PUBLIC_PROFILE_API;
    dispatch({ type: "FETCH_START" });
    try {
      const response = await fetch(get_api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(),
      });
      const data = await response.json();
      if (data.success) {
        dispatch({
          type: "FETCH_SUCCESS",
          payload: data.getProfile,
        });
      }
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload: "Data is not found",
      });
    }
  };
  //editedfunction
  const editProfileData = async (id, formData) => {
    const edit_api = process.env.NEXT_PUBLIC_PROFILE_API;
    dispatch({ type: "FETCH_START" });
    try {
      const response = await fetch(`${edit_api}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        //this is for fixing find array problem
        const updatedList = state.profileData.map((item) =>
          item._id === id ? data.updatedProfile : item
        );
        dispatch({
          type: "FETCH_SUCCESS",
          payload: updatedList,
        });
      }
      alert("data is edited");
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload: "Data is not edited",
      });
    }
  };
  //get all data
  const getAllProfileData=async()=>{
    const get_all_api=process.env.NEXT_PUBLIC_ALL_PROFILE_API
    dispatch({type:"FETCH_START"})
    try {
     const response=await fetch(get_all_api,{
      method:"GET",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify()
     }) 
     const data=await response.json()
     console.log(data.allprofileData)
     if(data.success){
      dispatch({
        type:"FETCH_ALL_DATA_SUCCESS",
        payload:data.allprofileData
      })
     }
    } catch (error) {
      dispatch({
        type:"FETCH_ERROR",
        payload:"all data is not found"
      })
    }
  }
  useEffect(() => {
    getProfileData();
    getAllProfileData()
  }, []);
  return (
    <ProfileContext.Provider
      value={{
        profileData: state.profileData,
        allProfile:state.allProfileData,
        isLoading: state.isLoading,
        error: state.error,
        createProfileData,
        editProfileData,
        getProfileData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;

export const useProfile = () => useContext(ProfileContext);
