import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToDo } from './RTK/slices/todo-slice'

export default function Header() {
    const dispatch=useDispatch()
    const [title,setTitle]=useState("")
    const [completed,setCompleted]=useState(false)
    const inputRef=useRef(null)
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(addToDo({title,completed}))
        inputRef.current.value=""
   

    }
    let tittle=useSelector(state=>state.todo.todoData.title)
    const isClicked=useSelector(state=>state.todo.isClicked)
    const headerRef=useRef()

 

      
    useEffect(()=>{
      inputRef.current.focus()
        window.addEventListener('scroll',()=>{
            if(window.scrollY>100){
              headerRef.current.style.background="black"
               inputRef.current.style.background="black"
              //headerRef.current.style.padding="20px 0"
            }else{
              headerRef.current.style.background="#292929"
              inputRef.current.style.background="#292929"
            }
        });
        
        
    },[])
    // if(isClicked){
      
     
    // }else{
    //   console.log(tittle)
    //   console.log(isClicked)

    // }

  return (
    <header  className=''>
            <div  className='fixed top-1  w-[100%] z-50'>
          <form onSubmit={handleSubmit} className=''>
                <div  className='element-center flex justify-between gap-3'>
                  {
                    isClicked?
                    <>
                        <input ref={inputRef} type='text' required placeholder='task.....' className='pl-[20px] bg-[#292929] h-[60px] sm:w-[90%] w-[70%] element-center' value={isClicked?tittle:""} onChange={(e)=>{setTitle(e.target.value)}}/>
                        <input   ref={headerRef} type='submit' value="Update" className='w-[150px] h-[60px] bg-[#292929] cursor-pointer rounded-lg hover:bg-[#1d1d1c]'/>
                        </>
                        :
                        <>
                        <input ref={inputRef} type='text' required placeholder='task.....' className='pl-[20px] bg-[#292929] h-[60px] sm:w-[90%] w-[70%] element-center'  onChange={(e)=>{setTitle(e.target.value)}}/>
                        <input ref={headerRef} type='submit' value="Add" className='w-[150px] h-[60px] bg-[#292929] cursor-pointer rounded-lg hover:bg-[#1d1d1c]'/>
                        </>
                  }
                      
                    </div>
                
        </form>
    </div>
    </header>
  )
}
