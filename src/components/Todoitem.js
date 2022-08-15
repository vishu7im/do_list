import React from 'react'

export default function Todoitem(props) {
  return (
    <>
       <div className="showItems">
         
         <div className="eachItem" >
           <h3>{props.item}</h3>
           <div className="todo-btn">
             <i
               className="far fa-edit add-btn"
               onClick={()=>{
                props.edit(props.i)
               }}
               ></i>
             <i
               className="far fa-trash-alt add-btn"
               onClick={()=>{
                props.del(props.i)
               }}
              ></i>
           </div>
         </div>
   
   </div>
    </>
  )
}
