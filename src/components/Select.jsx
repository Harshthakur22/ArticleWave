import React, { useId } from 'react'

function Select({
    options,

    label,
    className="",
    ...props
},ref) {
    const id=useId();
  return (
   <div className='w-full'>
    {label && <label htmlFor={id} className=''></label>}
    <select
    // select me apne ko id ,props chaciye honge 
      
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
        {/* genrally options.map(()=>{}) par agar options me koi value nhi gyi toh uske ke liye phele hi check karenge  */}
            {options?.map((option)=>(
                <option key={option} value={option}>
                    
                    {option}
                </option>
            ))}
    </select>
   </div>
  )
}

export default React.forwardRef(Select)