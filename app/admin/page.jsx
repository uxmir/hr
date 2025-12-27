"use client";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../DataProvider/AuthProvider/AuthProvider";
import { useRouter } from "next/navigation";

const page = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const router = useRouter();
  const User = user?.category === "admin";
  useEffect(() => {
    if (!User && !loading) {
      router.push("/login");
    }
  }, [User, loading]);
  if (!User) {
    return null;
  }
  return (
    <>
      {user?.category === "admin" && (
        <div>
          {user?.name}
          {user?.email}
          {user?.category}
          <p onClick={logout}>logout</p>
        </div>
      )}
    </>
  );
};

export default page;
