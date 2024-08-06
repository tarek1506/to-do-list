import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addToDo=createAsyncThunk('todos/addToDo',async(todo)=>{
    const res=await axios.post('http://localhost:3000/todos',todo);
    return res.data
})

export const updateTodo=createAsyncThunk('todos/updateTodo',async(id)=>{
  const res=await axios.patch(`http://localhost:3000/todos/${id}`);
  return res.data
})

export const getToDos=createAsyncThunk('todos/getToDos',async()=>{
    const res=await axios('http://localhost:3000/todos');
    console.log(res.data)
    //res.data
})

export const deleteTodo=createAsyncThunk('todos/deleteTodo',async(id)=>{
    const res=await axios.delete(`http://localhost:3000/todos/${id}`);
    //console.log(res.data)
    //res.data
})


export const todoSlice=createSlice({
        name:"formSlice",
        initialState:{
            todoData:{
                title:"",
                completed:null,
            },
            loading:false,
            error:false,
            isClicked:false,
        },
       
     

    reducers:{
       
        
    },
    extraReducers:(builder)=>{
      builder
      .addCase(addToDo.pending,(state)=>{
        state.loading=true 
        
      })
      .addCase(addToDo.fulfilled,(state,action)=>{
        state.todoData=action.payload
        state.loading=false;
      })
      .addCase(addToDo.rejected,(state)=>{
        state.loading=false;
        state.error=true;
       
      })
      .addCase(getToDos.pending,(state)=>{
        state.loading=true 
        
      })
      .addCase(getToDos.fulfilled,(state,action)=>{
        state.loading=false;
        return state.todoData
        
      })
      .addCase(getToDos.rejected,(state)=>{
        state.loading=false;
        state.error=true;
       
      })
    }
})


export default todoSlice.reducer