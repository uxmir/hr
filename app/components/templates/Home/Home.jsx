"use client";
import { AuthContext } from "@/app/DataProvider/AuthProvider/AuthProvider";
import Profile from '../../../components/ProfilePageComponent/Profile'
import AllEmploye from '../../AllEmploye/AllEmploye'
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import {  IconLayoutDashboard, IconLayoutSidebarLeftCollapse, IconUsers,IconUser } from "@tabler/icons-react";

const Home = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState(1);
  const [sidebarText,setSidebarText]=useState(true)
  const router = useRouter();
  const User = user?.category === "employe";
  useEffect(() => {
    if (!User && !loading) {
      router.push("/login");
    }
  }, [User, loading]);
  if (!User) {
    return null;
  }
  //sidebar array
  const sideBarData = [
    {
      id: 1,
      text: "home",
      icon: IconLayoutDashboard,
    },
    {
      id: 2,
      text: "employe",
      icon: IconUsers,
    },
        {
      id: 3,
      text: "profile",
      icon: IconUser,
    },
  ];
  //activeIteminSidebar
  const isActiveItem = (item) => {
    setActiveItem(item);
  };
  //hnadling sidebar
  const toggleSidebar=()=>{
   if(sidebarText===true){
    setSidebarText(false)
   }
   else{
     setSidebarText(true) 
   }
  }
  return (
    <>
      <div className="flex">
        <div className={`fixed top-0 transition-all duration-300 h-full bg-gray-100 px-4 py-10 ${sidebarText===true?'w-64':'w-16'}`}>
          <div className="relative h-full">
            <div className="flex flex-col gap-y-4">
              {sideBarData.map((data, index) => {
                const Icon = data.icon;
                return (
                  <div
                    key={index}
                    onClick={() => isActiveItem(data.id)}
                    className={`flex gap-x-1 items-center group  hover:bg-gray-800 hover:text-white cursor-pointer px-2 py-2 ${
                      activeItem === data.id
                        ? "bg-gray-800 text-white"
                        : "text-gray-600"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={`group-hover:text-white ${
                        activeItem === data.id ? "text-white" : "text-gray-600"
                      }`}
                    />
                    <span className={`capitalize transiton-all duration-300 ${sidebarText===true?'block':'hidden'}`}>{data.text}</span>
                  </div>
                );
              })}
            </div>
            <div onClick={logout} className={`absolute bottom-0 cursor-pointer ${sidebarText===false?'hidden':'block'}`}>
              <span className="text-red-500 font-medium">Logout</span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div
            className={`w-full flex transition-all duration-300 fixed top-2  justify-between items-center 
            pr-5 ${sidebarText===false?'pl-20':'pl-70'}`}
          >
            <div onClick={()=>toggleSidebar()} className="cursor-pointer"><IconLayoutSidebarLeftCollapse className="text-gray-600"/></div>
            <div>
              {user?.category === "employe" && (
                <div className="text-gray-600 flex gap-x-1">
                  <div className="w-10 h-10 flex items-center justify-center text-center rounded-full bg-gray-100">
                    <span className="text-gray-800 uppercase text-xl font-medium">
                      {user?.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex flex-col text-gray-600">
                  <span className="font-medium text-sm">{user?.name}</span>
                  <span className="text-xs">{user?.email}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={`w-full pr-5 transition-all mt-10 duration-300 ${sidebarText===true?'pl-70':'pl-20'}`}>
            {
          activeItem===1&&(
             <div className="">
            mir monir
          </div>
          )
         },
                 {
          activeItem===2&&(
             <div className="">
           <AllEmploye/>
          </div>
          )
         }
                   {
          activeItem===3 &&(
             <div className="">
            <Profile/>
          </div>
          )
         }
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
