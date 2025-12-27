import React from 'react'
const Input = ({label,inputType,inputName,inputValue,placeHolder,labelFor,handleChange,handleBlur,errors ,touched}) => {
  const showErrors= errors && touched
  return (
    <div>
         <div className="flex flex-col gap-y-1">
          <label htmlFor={labelFor} className="text-gray-600 capitalize">
          {label}
          </label>
          <input
            type={inputType}
            name={inputName}
            value={inputValue || ""}
            placeholder={placeHolder}
            onChange={handleChange}
            onBlur={handleBlur}
            className={` border  py-2 px-4 text-gray-500 placeholder:text-gray-500 outline-none focus:outline-none  capitalize ${showErrors?'border-red-600':' border-gray-200 focus:border-amber-500'}`}
          />
        </div>
    </div>
  )
}

export default Input
