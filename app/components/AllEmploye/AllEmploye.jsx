"use client"
import { useProfile } from '@/app/DataProvider/ProfileDataProvider/ProfileProvider'
import React from 'react'

const AllEmploye = () => {
  const {allProfile,isLoading}=useProfile()  
  if(isLoading){
    return(
        <>
        <div>Data is Loading</div>
        </>
    )
  }
  return (
    <div>
      {
        allProfile?.map((data,index)=>(
            <div key={index}>
             <p>{data.professional_name}</p>
            </div>
        ))
      }
    </div>
  )
}

export default AllEmploye
