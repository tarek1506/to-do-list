import React from 'react'
import { useSelector } from 'react-redux'

export default function UpdateTask({id,title,handleChange,updateTodo}) {
 // const title=useSelector(state=>state.todo.todoData.title)
  return (
    <>
         <div  className='element-center flex justify-between gap-3'>
                        <input  type='text' required placeholder='task.....' className='pl-[20px] bg-[#292929] h-[60px] sm:w-[90%] w-[70%] element-center' value={title} onChange={{handleChange}}/>
                        <input type='submit' value="update" className='w-[150px] h-[60px] bg-[#292929] cursor-pointer rounded-lg hover:bg-[#1d1d1c]' onClick={()=>{updateTodo(title,completed)}}/>
                    </div>
                
    </>
      
    
  )
}


                  