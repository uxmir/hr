import React from "react";

const InputSelect = ({label,optionValue,selectName,selectValue,handleChange,handleBlur,errors,touched}) => {
  const showErrors=errors && touched
  return (
    <div>
      <label htmlFor="category" className="text-gray-500">
        {label}
      </label>
      <select
      name={selectName}
      value={selectValue}
      onChange={handleChange}
      onBlur={handleBlur}
        className={`w-full border  py-2 px-4 text-gray-500 placeholder:text-gray-500 outline-none focus:outline-none 
           capitalize ${showErrors?'border-red-600':'border-gray-200 focus:border-amber-600'}`}
      >
          <option value="">Select Category</option>
      {
        optionValue.map((option,index)=>(
         <option key={index} value={option.value} className="capitalize">{option.value}</option>
        ))
      }
      </select>
    </div>
  );
};

export default InputSelect;
