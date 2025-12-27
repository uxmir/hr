import React, { useContext } from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../DataProvider/AuthProvider/AuthProvider";
const Login = ({ event }) => {
  const { loginUser } = useContext(AuthContext);
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await loginUser(values);
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-1">
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
          You didn't have an account?{" "}
          <span onClick={event} className="text-blue-600">
            SignUp
          </span>
        </p>
        <div className="mt-6">
          <Button btnType={"submit"}>Login</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
