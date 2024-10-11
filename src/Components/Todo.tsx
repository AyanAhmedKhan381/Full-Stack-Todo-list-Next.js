import Image from 'next/image'
import React, { useState } from 'react'
import Delete from "../../public/delete svg.svg"
import check from "../../public/checked.png"



interface Props {
id:number, title:string, description:string, mongoId: number, complete:boolean,
deletedTodos: (id: number) => Promise<void> ,
updateTodo: (id: number) => Promise<void>
}



const Todo = ({id, title, description, mongoId, complete, deletedTodos, updateTodo}:Props) => {

  return (
    <>
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {id+1}
          </th>
          <td className={`px-6 py-4 text-lg ${complete ? "line-through" : ""}`}>
              {title}
          </td>
          <td className={`px-6 py-4 text-base ${complete ? "line-through" : ""}`}>
              {description}
          </td>
          <td className="px-6 py-4">
              {complete ? "Completed" : "Pending"}
          </td>
          <td className="px-6 py-4 gap-x-2">
             <button onClick={()=> deletedTodos(mongoId)}
              className='text-xs font-bold mr-2 text-red-500 hover:text-red-600'>
               
                <Image className='animate-pulse ml-1 hover:animate-none' src={Delete} alt='image' width={25} height={25}/>
               Delete
             </button>

             
             <button 
    onClick={() => updateTodo(mongoId)}
    className='ml-3 text-green-500 font-bold hover:text-green-600 text-xs'>
    {complete ? null : (
        <>
            <Image className='animate-pulse hover:animate-none' src={check} alt='image' width={25} height={25} />
            Done
        </>
    )}
</button>

          </td>
      </tr><tr>
          </tr> 
          </>
  )
}

export default Todo
