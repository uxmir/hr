"use client";
import React, { useContext, useState } from "react";
import Input from "../components/Input/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../components/Button/Button";
import { AuthContext } from "../DataProvider/AuthProvider/AuthProvider";
import Login from "./Login";
import InputSelect from "../components/inputSelect/InputSelect";
const page = () => {
  const [login, setLogin] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const { signUpUser } = useContext(AuthContext);
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    category: Yup.string().required("Category is required"),
    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      category: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await signUpUser(values);
    },
  });
  const showLogin = () => {
    setLogin(true);
    setSignUp(false);
  };
  const showSignUp = () => {
    setSignUp(true);
    setLogin(false);
  };
  return (
    <div className="flex justify-center items-center ">
      <div className="w-[700px] px-6 py-6 border border-gray-100 translate-y-50 ">
        {signUp === true && (
          <form action="" onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-y-1">
              <Input
                label={"Name"}
                labelFor={"name"}
                inputName={"name"}
                inputType={"text"}
                placeHolder={"enter your name"}
                inputValue={formik.values.name}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors.name}
                touched={formik.touched.name}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500">{formik.errors.name}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-1">
              <Input
                label={"Email"}
                labelFor={"email"}
                inputName={"email"}
                inputType={"email"}
                placeHolder={"enter your Email"}
                inputValue={formik.values.email}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors.email}
                touched={formik.touched.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500">{formik.errors.email}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-1">
              <InputSelect
                label={"Select An Option"}
                selectName={"category"}
                selectValue={formik.values.category}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors.category}
                touched={formik.touched.category}
                optionValue={[
                  { id: 1, value: "admin" },
                  { id: 2, value: "employe" },
                ]}
              />
              {formik.touched.category && formik.errors.category && (
                <p className="text-red-600">{formik.errors.category}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-1 ">
              <Input
                label={"Password"}
                labelFor={"password"}
                inputName={"password"}
                inputType={"password"}
                placeHolder={"enter your Passowrd"}
                inputValue={formik.values.password}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors.password}
                touched={formik.touched.password}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500">{formik.errors.password}</p>
              )}
            </div>
            <p className="mt-2 text-center text-gray-600 cursor-pointer">
              You have an account?{" "}
              <span onClick={showLogin} className="text-blue-600">
                Login
              </span>
            </p>
            <div className="mt-6">
              <Button btnType={"submit"}>SignUp</Button>
            </div>
          </form>
        )}
        {login === true && <Login event={showSignUp} />}
      </div>
    </div>
  );
};

export default page;
