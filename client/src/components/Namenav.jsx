import React from 'react'

const Namenav = () => {
  return (
    <div className='bg-[#DFA8E4] h-12 flex items-center'>
      <input 
        type='button' 
        value='<--'  
        className="h-8 w-8 bg-[#f9f6fa] cursor-pointer m-2" />
      <span className="text-center flex-1">Hello Name!</span>
    </div>

  )
}

export default Namenav
