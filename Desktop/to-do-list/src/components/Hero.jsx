import  { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash,faPenToSquare,faCheck } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'



         
           
        
  
export default function Hero() {
    const [title,setTitle]=useState("")
    const [completed,setCompleted]=useState(false)
    const [data,setDate]=useState([])
    const [isClicked,setIsClicked]=useState(false)
    const [id,setId]=useState();

    const inputRef=useRef(null)
    const headerRef=useRef()

    //Add todo
    const addToDo=async(todo)=>{
        const res=await axios.post('http://localhost:3000/todos',todo);
        return res.data
    }
     //Get Todos
       const getTodos=async()=>{
        const res=await axios("http://localhost:3000/todos");
        setDate(res.data)
        }

        //Delete TodO
        const deleteTodo= async(id)=>{
            const res=await axios.delete(`http://localhost:3000/todos/${id}`); 
        }

        //Clear ALL
        const deleteAll= ()=>{
            data.map(async(todo)=>{
                const res=await axios.delete(`http://localhost:3000/todos/${todo.id}`); 
            })
        }
        
        //Update todo status if it's  completed
        const toggleCompleted=async(id,completed)=>{
            const res=await axios.patch (`http://localhost:3000/todos/${id}`,
                {  
                    completed:completed
                }
            ) 
            
             }

                //Update todo Title
                const update=async(id,title)=>{
                const res=await axios.patch (`http://localhost:3000/todos/${id}`,
                {  
                    title:title
                }
            ) 
            
             }
             
             //handle Add function
             const handleSubmit=(e)=>{
                e.preventDefault();
                addToDo({title,completed})
                inputRef.current.value=""
            }
        
             //handle Update function
             const handleUpdate=(e)=>{
                e.preventDefault();
                update (id,title)
                inputRef.current.value=""
                setIsClicked(false)
            }

            useEffect(()=>{
                inputRef.current.focus()
                  window.addEventListener('scroll',()=>{
                      if(window.scrollY>100){
                         headerRef.current.style.background="black"
                         inputRef.current.style.background="black"
                      }else{
                        headerRef.current.style.background="#292929"
                        inputRef.current.style.background="#292929"
                      }
                  });  
                  getTodos();      
              },[data])


              // filter functions
            let dataLength=data.filter((todo)=>{
                return todo.completed!==true
            }).length


            let dataLengthCompleted=data.filter((todo)=>{
                return todo.completed===true
            }).length
             
  
            return (
        <>
            <header  className=''>
                <div  className='fixed top-1  w-[100%] z-50'>
                    <form onSubmit={isClicked?handleUpdate:handleSubmit} className=''>
                        <div  className='element-center flex justify-between gap-3'>
                                
                         <>
                          {isClicked?
                          <>
                             <input ref={inputRef} type='text' required  placeholder='' className='pl-[20px] bg-[#292929] h-[60px] sm:w-[90%] w-[70%] element-center'  onChange={(e)=>{setTitle(e.target.value)}}/>
                             <input type='submit' value="Update" className='w-[150px] h-[60px] bg-[#292929] cursor-pointer rounded-lg hover:bg-[#1d1d1c]'/>
                          </>:
                             <>
                                  <input ref={inputRef} type='text' required placeholder='task.....' className='pl-[20px] bg-[#292929] h-[60px] sm:w-[90%] w-[70%] element-center'  onChange={(e)=>{setTitle(e.target.value)}}/>
                                  <input ref={headerRef} type='submit' value="Add" className='w-[150px] h-[60px] bg-[#292929] cursor-pointer rounded-lg hover:bg-[#1d1d1c]'/>
                             </>
                        }
                           
                         </>
                                
                                    
                        </div>
                                
                    </form>
                </div>
            </header>

                <div className='mt-[100px] flex flex-col mb-[20px]  text-white'>
                    <div className='element-center'>
                        {dataLength!=0&&<h1 className='md:font-bold md:text-2xl text-[14px]'>Tasks To Do (<span className='text-green-500'>{dataLength}</span>)</h1>}
                        {
                        dataLengthCompleted==data.length && data.length!=0?<h1 className='text-[16px] md:text-2xl text-orange-100'>
                            Great Job💪</h1>:<h1 className=' text-[14px] md:font-bold md:text-2xl'>Tasks Completed ( <span className='text-green-500'>
                            {dataLengthCompleted}
                                </span> )</h1>
                        }
                    {data.length>0&&<button className='bg-[#292929] w-[100px] h-[40px] rounded-lg hover:bg-[#1d1d1c]' onClick={()=>{
                            deleteAll()
                        }}>clear</button>}  
                    </div>        
        
       
        {data.map((todo)=>{
            return (
               
               
                    <div key={todo.id}  className='bg-[#292929] h-[60px] element-center px-[25px]'>
                        <div className='flex gap-[20px]'>
                        {!todo.completed?
                            <input checked={todo.completed} name={todo.title} type='checkbox'  className='w-[25px] cursor-pointer appearance-none
                            bg-neutral-700  rounded-lg'  onChange={(e)=>{                       
                            toggleCompleted(todo.id,e.target.checked)
                                    }}/>:
                                            <div className='w-[25px] h-[25px] bg-neutral-800  shadow-[0px_0px_5px_1px_#236145] transition-all duration-200 
                                            flex justify-center items-center rounded-lg'>
                                                <FontAwesomeIcon className='text-green-500 cursor-pointer' icon={faCheck} onClick={()=>{
                                                    toggleCompleted(todo.id,!todo.completed)
                                                }}/>
                                            </div>
                                    }
                            <h2>{todo.completed?<del className=''>{todo.title}</del>:todo.title}</h2>
                        </div>
                        <div className='flex gap-[20px]'>
                            {!todo.completed && <FontAwesomeIcon icon={faPenToSquare} className='cursor-pointer 'onClick={()=>{
                               setIsClicked(true)
                               setId(todo.id); 
                               inputRef.current.value=todo.title
                               inputRef.current.focus()
                              
                                
                            }}/>} 
                             
                           
                            <FontAwesomeIcon icon={faTrash} className='cursor-pointer hover:hover:text-[#ebdf34] ' onClick={()=>{(deleteTodo(todo.id))}}/>
                        </div>
                </div>
                             
            )
        })}
    </div>
    </>
  )
}
