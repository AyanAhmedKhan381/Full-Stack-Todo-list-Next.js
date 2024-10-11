"use client";
import Todo from "@/Components/Todo";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";


import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';





export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [todoData,setTodoData] = useState([]);


  const fetchTodos = async ()=> {
    const response = await axios("/api")
    setTodoData(response.data.todos)
  }

  const deleteTodo = async(id:number)=> {
    const response = await axios.delete('/api',{
      params:{
        mongoId:id
      }
    })
    toast.success(response.data.msg)
    fetchTodos();
  }


  const CompleteTodo = async(id:number)=> {
    const response = await axios.put('/api', {},{
      params: {
        mongoId: id
      }
    })
    toast.success(response.data.msg)
    fetchTodos();
  }


  useEffect(()=> {
    fetchTodos();
  },[])


  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((form) => ({ ...form, [name]: value }));
    console.log(formData);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload

    try {
      // api code 

      const response = await  axios.post('/api', formData)
      setFormData({
        title: "",
        description: "",
      })
      await fetchTodos();

      toast.success(response.data.msg)
    } catch (error) {
      toast.error("Error")
      
    }
    
  };

  return (
    <>
    <ToastContainer theme = "dark"/>
      <form
        onSubmit={onSubmitHandler}
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] px-2 mx-auto "
      >
       <div className="flex gap-x-6 mr-24">
       <Image src={"/caton man.png"} alt="" width={300} height={100} className=""/>
       </div>

        <input
          value={formData.title}
          onChange={onChangeHandler}
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 rounded-sm border-2 w-full outline-none cursor-pointer"
        />

        <textarea
          onChange={onChangeHandler}
          value={formData.description}
          name="description"
          placeholder="Enter Description"
          className="px-3 py-2 border-2 w-full cursor-pointer rounded-sm"
        ></textarea>
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 duration-300 hover:py-3.5 hover:px-12
        py-3 px-11 text-white rounded-md hover:text-lg"
        >
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            
            {todoData.map((item:any, i:number)=> {
              return  <Todo key={i} 
              title={item.title} description={item.description} id={i} 
              complete={item.isCompleted} mongoId={item._id} deletedTodos={deleteTodo}
              updateTodo={CompleteTodo} />
            })}

          </tbody>
        </table>
      </div>
    </>
  );
}
