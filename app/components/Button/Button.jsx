import React from 'react'

const Button = ({btnType,children,handleEvent}) => {
  return (
  <div>
    <button 
    onClick={handleEvent}
    type={btnType} 
    className='px-4 py-3 text-center cursor-pointer w-full border-2 bg-gray-900 text-white hover:bg-gray-700'>
     {children}
    </button>
  </div>
  )
}

export default Button
