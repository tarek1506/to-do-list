import  { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash,faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import UpdateTask from './UpdateTask'
import { useSelector } from 'react-redux'

export default function Hero() {

   const [data,setDate]=useState([])

    const getTodos=async()=>{
        const res=await axios("http://localhost:3000/todos");
        setDate(res.data)
        }

        const deleteTodo= async(id)=>{
            const res=await axios.delete(`http://localhost:3000/todos/${id}`); 
        }

        const deleteAll= ()=>{
            data.map(async(todo)=>{
                const res=await axios.delete(`http://localhost:3000/todos/${todo.id}`); 
            })
        }
        

        const toggleCompleted=async(id,completed)=>{
            const res=await axios.patch (`http://localhost:3000/todos/${id}`,
                {  
                    completed:completed
                }
            ) 
            
             }

            //   const updateTodo=async(id,title)=>{
            //     const res=await axios.put(`http://localhost:3000/todos/${id}`,
            //         {  
            //             title:title,
            //            // completed:completed
            //         }
            //     ) 
                
            //      }

                 let title=useSelector(state=>state.todo.todoData.title)
                 let {isClicked}=useSelector(state=>state.todo)

                //  const [isClicked,setClicked]=useState(false)
                 

            useEffect(()=>{
                getTodos();
            // 
               //console.log(title); 
            },[data])

            let newData=[];

  return (
   
    <div className='mt-[100px] flex flex-col mb-[20px]  text-white'>
        <div className='element-center'>
            <h1 className='  font-bold text-[24px]'>Tasks({data.length})</h1>
            {/* <h1 className='  font-bold text-[24px]'>Tasks completed ({data.length})</h1> */}
          {data.length>0&&<button className='bg-[#292929] w-[100px] h-[40px] rounded-lg hover:bg-[#1d1d1c]' onClick={()=>{
                deleteAll()
            }}>clear</button>}  
        </div>


       {/* {isClicked&&data.length>0?<UpdateTask  handleChange={(e)=>{setTitle(e.target.value)}} updateTodo={updateTodo()}/>:null} */}
        
        
        {data.map((todo)=>{
            return (
               
                    <div key={todo.id}  className='bg-[#292929] h-[60px] element-center px-[25px]'>
                    <div className='flex gap-[20px]'>
                        <input checked={todo.completed} name={todo.title} type='checkbox'  className='w-4  text-blue-600 bg-gray-100 rounded'  onChange={(e)=>{                       
                        toggleCompleted(todo.id,e.target.checked)
                                 }}/>
                        <h2>{todo.completed?<del>{todo.title}</del>:todo.title}</h2>
                    </div>
                    <div className='flex gap-[20px]'>
                         <FontAwesomeIcon icon={faPenToSquare} className='cursor-pointer 'onClick={()=>{
                         
                         title=todo.title
                         isClicked=true
                         console.log(title)
                         console.log(isClicked)
                         }}/>
                        <FontAwesomeIcon icon={faTrash} className='cursor-pointer hover:hover:text-[#ebdf34] ' onClick={()=>{(deleteTodo(todo.id))}}/>
                    </div>
                </div>
               

                
                
            )
        })}
    </div>
  )
}
