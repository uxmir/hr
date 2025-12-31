"use client";
import { AuthContext } from "@/app/DataProvider/AuthProvider/AuthProvider";
import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import Input from "../Input/Input";
import InputSelect from "../inputSelect/InputSelect";
import { useProfile } from "@/app/DataProvider/ProfileDataProvider/ProfileProvider";
const Profile = () => {
  const { user } = useContext(AuthContext);
  const { profileData, isLoading,editProfileData } = useProfile();
  const [editForm, setEditForm] = useState(false);
  const [editedId,setEditedId]=useState(null)
  if (isLoading) {
    return <div>data is loading...</div>;
  }
  return (
    <>
      {editForm !== true && (
        <div className="max-w-[700px] mb-30 mx-auto flex flex-col  justify-center  py-10 px-8 shadow-2xl ">
          <div className="flex items-center gap-x-3">
            <div className="w-30 h-30 rounded-full flex justify-center items-center text-center bg-gray-100 text-gray-800">
              <span className="text-center uppercase text-5xl ">
                {user?.name.charAt(0)}
              </span>
            </div>
            <div className="flex flex-col  text-gray-600">
              <span className="font-medium">{user?.name}</span>
              <span>{user?.email}</span>
            </div>
          </div>
          {profileData?.map((data, index) => (
            <div key={index} className="mt-6 flex flex-col gap-y-4 capitalize">
              <div className="flex justify-between items-center gap-4 text-gray-600">
                <div className="">
                  <span className="font-medium">ProfessionalName:</span>
                  <span className="ml-1">
                    {data?.professional_name || "Mir Moniruzzaman"}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Designation:</span>
                  <span className="ml-1">{data?.designation}</span>
                </div>
              </div>
              <div className="flex justify-between items-center gap-4 text-gray-600">
                <div className="">
                  <span className="font-medium">EmployeId:</span>
                  <span className="ml-1">{data?.employe_id}</span>
                </div>
                <div className="">
                  <span className="font-medium ">JobType:</span>
                  <span className="ml-1 capitalize">{data?.job_type}</span>
                </div>
              </div>
              <div className="flex justify-between items-center gap-4 text-gray-600">
                <div className="">
                  <span className="font-medium">experience:</span>
                  <span className="ml-1">{data?.experience}Years</span>
                </div>
                <div className="">
                  <span className="font-medium ">salary:</span>
                  <span className="ml-1 capitalize">{data?.salary}BDT</span>
                </div>
              </div>
              <div className="flex justify-between items-center gap-4 text-gray-600">
                <div className="">
                  <span className="font-medium">email:</span>
                  <span className="ml-1">{data?.email}</span>
                </div>
                <div className="">
                  <span className="font-medium ">phoneNumber:</span>
                  <span className="ml-1 capitalize">{data?.phone_number}</span>
                </div>
              </div>
                   <div className="flex justify-end mt-6">
            <Button handleEvent={() => {
              setEditForm(true)
              setEditedId(data._id)
            }} btnType={"button"}>
              Changes
            </Button>
          </div>
            </div>
          ))}
        </div>
      )}
      {editForm === true && (
        <>
          <div className="max-w-[700px] mb-30 mx-auto flex flex-col  justify-center  py-10 px-8 shadow-2xl">
            <EditForm  event={()=>setEditForm(false)} id={editedId} editData={editProfileData} initialValues={profileData?.find((i)=>i._id===editedId)}/>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;

export function ProfileForm() {
  const { createProfileData, profileData, isLoading } = useProfile();
  const validationSchema = Yup.object({
    professional_name: Yup.string().required("this feild is required"),
    designation: Yup.string().required("This feild is rquired"),
    employe_id: Yup.string().required("This feild is rquired"),
    job_type: Yup.string().required("This feild is rquired"),
    experience: Yup.string().required("This feild is required"),
    salary: Yup.string().required("This feild is required"),
    email: Yup.string().required("This feild is required"),
    phone_number: Yup.string().required("This feild is required"),
  });
  const formik = useFormik({
    initialValues: {
      professional_name: "",
      designation: "",
      employe_id: "",
      job_type: "",
      experience: "",
      salary: "",
      email: "",
      phone_number: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await createProfileData(values);
      resetForm();
    },
  });
  return (
    <>
      <div className="max-w-[700px] mb-10 mx-auto flex flex-col  justify-center bg-white py-10 px-8 shadow-2xl">
        <form onSubmit={formik.handleSubmit} className="w-full space-y-4">
          <div className="flex flex-col   items-center w-full gap-y-4 ">
            <div className="flex flex-col gap-y-1 w-full">
              <Input
                label={"Professional Name"}
                labelFor={"name"}
                inputName={"professional_name"}
                inputType={"text"}
                placeHolder={"enter your Name"}
                inputValue={formik.values.professional_name}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors.professional_name}
                touched={formik.touched.professional_name}
              />
              {formik.touched.professional_name &&
                formik.errors.professional_name && (
                  <p className="text-red-500">
                    {formik.errors.professional_name}
                  </p>
                )}
            </div>
            <div className="flex flex-col gap-y-1 w-full">
              <InputSelect
                label={"Select An Designation"}
                selectName={"designation"}
                selectValue={formik.values.designation}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors.designation}
                touched={formik.touched.designation}
                optionValue={[
                  { id: 1, value: "Front-end developer" },
                  { id: 2, value: "backend developer" },
                  { id: 3, value: "UX/UI Designer" },
                ]}
              />
              {formik.touched.designation && formik.errors.designation && (
                <p className="text-red-600">{formik.errors.designation}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col   items-center w-full gap-y-4 ">
            <div className="flex flex-col gap-y-1 w-full">
              <Input
                label={"EmployeId"}
                labelFor={"employe_id"}
                inputName={"employe_id"}
                inputType={"text"}
                placeHolder={"enter your Id"}
                inputValue={formik.values.employe_id}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors.employe_id}
                touched={formik.touched.employe_id}
              />
              {formik.touched.employe_id && formik.errors.employe_id && (
                <p className="text-red-500">{formik.errors.employe_id}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-1 w-full">
              <InputSelect
                label={"Select An JobType"}
                selectName={"job_type"}
                selectValue={formik.values.job_type}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors.job_type}
                touched={formik.touched.job_type}
                optionValue={[
                  { id: 1, value: "Remote" },
                  { id: 2, value: "On-Site" },
                  { id: 3, value: "Hybrid" },
                ]}
              />
              {formik.touched.job_type && formik.errors.job_type && (
                <p className="text-red-600">{formik.errors.job_type}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col   items-center w-full gap-y-4 ">
            <div className="flex flex-col gap-y-1 w-full">
              <Input
                label={"Experience"}
                labelFor={"experience"}
                inputName={"experience"}
                inputType={"text"}
                placeHolder={"enter your Experiences"}
                inputValue={formik.values.experience}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors.experience}
                touched={formik.touched.experience}
              />
              {formik.touched.experience && formik.errors.experience && (
                <p className="text-red-500">{formik.errors.experience}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-1 w-full">
              <Input
                label={"Salary"}
                labelFor={"salary"}
                inputName={"salary"}
                inputType={"text"}
                placeHolder={"enter your Salary"}
                inputValue={formik.values.salary}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors.salary}
                touched={formik.touched.salary}
              />
              {formik.touched.salary && formik.errors.salary && (
                <p className="text-red-500">{formik.errors.salary}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col   items-center w-full gap-y-4 ">
            <div className="flex flex-col gap-y-1 w-full">
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
            <div className="flex flex-col gap-y-1 w-full">
              <Input
                label={"PhoneNumber"}
                labelFor={"phone_number"}
                inputName={"phone_number"}
                inputType={"text"}
                placeHolder={"enter your PhoneNumber"}
                inputValue={formik.values.phone_number}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors.phone_number}
                touched={formik.touched.phone_number}
              />
              {formik.touched.phone_number && formik.errors.phone_number && (
                <p className="text-red-500">{formik.errors.phone_number}</p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <Button btnType={"submit"}>Submit</Button>
          </div>
        </form>
      </div>
    </>
  );
}

//edit funnction
export function EditForm({initialValues,id,editData,event}) {
  //  const { profileData,editProfileData } = useProfile();
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize:true,
    onSubmit: async (values, { resetForm }) => {
      await editData(id,values)
      resetForm();
      if(event){
        event()
      }
    },
  });
  return (
    <>
        <form onSubmit={formik.handleSubmit} className="w-full space-y-4">
          <div className="flex flex-col   items-center w-full gap-y-4 ">
            <div className="flex flex-col gap-y-1 w-full">
              <Input
                label={"Professional Name"}
                labelFor={"name"}
                inputName={"professional_name"}
                inputType={"text"}
                placeHolder={"enter your Name"}
                inputValue={formik.values?.professional_name}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors.professional_name}
                touched={formik.touched.professional_name}
              />
              {formik.touched.professional_name &&
                formik.errors.professional_name && (
                  <p className="text-red-500">
                    {formik.errors.professional_name}
                  </p>
                )}
            </div>
            <div className="flex flex-col gap-y-1 w-full">
              <InputSelect
                label={"Select An Designation"}
                selectName={"designation"}
                selectValue={formik.values?.designation}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors.designation}
                touched={formik.touched.designation}
                optionValue={[
                  { id: 1, value: "Front-end developer" },
                  { id: 2, value: "backend developer" },
                  { id: 3, value: "UX/UI Designer" },
                ]}
              />
              {formik.touched.designation && formik.errors.designation && (
                <p className="text-red-600">{formik.errors.designation}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col   items-center w-full gap-y-4 ">
            <div className="flex flex-col gap-y-1 w-full">
              <Input
                label={"EmployeId"}
                labelFor={"employe_id"}
                inputName={"employe_id"}
                inputType={"text"}
                placeHolder={"enter your Id"}
                inputValue={formik.values?.employe_id}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors.employe_id}
                touched={formik.touched.employe_id}
              />
              {formik.touched.employe_id && formik.errors.employe_id && (
                <p className="text-red-500">{formik.errors.employe_id}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-1 w-full">
              <InputSelect
                label={"Select An JobType"}
                selectName={"job_type"}
                selectValue={formik.values?.job_type}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors.job_type}
                touched={formik.touched.job_type}
                optionValue={[
                  { id: 1, value: "Remote" },
                  { id: 2, value: "On-Site" },
                  { id: 3, value: "Hybrid" },
                ]}
              />
              {formik.touched.job_type && formik.errors.job_type && (
                <p className="text-red-600">{formik.errors.job_type}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col   items-center w-full gap-y-4 ">
            <div className="flex flex-col gap-y-1 w-full">
              <Input
                label={"Experience"}
                labelFor={"experience"}
                inputName={"experience"}
                inputType={"text"}
                placeHolder={"enter your Experiences"}
                inputValue={formik.values?.experience}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors.experience}
                touched={formik.touched.experience}
              />
              {formik.touched.experience && formik.errors.experience && (
                <p className="text-red-500">{formik.errors.experience}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-1 w-full">
              <Input
                label={"Salary"}
                labelFor={"salary"}
                inputName={"salary"}
                inputType={"text"}
                placeHolder={"enter your Salary"}
                inputValue={formik.values?.salary}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors.salary}
                touched={formik.touched.salary}
              />
              {formik.touched.salary && formik.errors.salary && (
                <p className="text-red-500">{formik.errors.salary}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col   items-center w-full gap-y-4 ">
            <div className="flex flex-col gap-y-1 w-full">
              <Input
                label={"Email"}
                labelFor={"email"}
                inputName={"email"}
                inputType={"email"}
                placeHolder={"enter your Email"}
                inputValue={formik.values?.email}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors.email}
                touched={formik.touched.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500">{formik.errors.email}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-1 w-full">
              <Input
                label={"PhoneNumber"}
                labelFor={"phone_number"}
                inputName={"phone_number"}
                inputType={"text"}
                placeHolder={"enter your PhoneNumber"}
                inputValue={formik.values?.phone_number}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors.phone_number}
                touched={formik.touched.phone_number}
              />
              {formik.touched.phone_number && formik.errors.phone_number && (
                <p className="text-red-500">{formik.errors.phone_number}</p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <Button  btnType={"submit"}>Submit</Button>
          </div>
        </form>
    </>
  );
}
