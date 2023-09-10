import React from 'react';
import "./task.css";
import {BiEdit} from "react-icons/bi";
import {AiOutlineDelete} from "react-icons/ai";
import {BiCheckDouble} from "react-icons/bi";


const Task = ({id,name,date,complete,editTask,deleteTask,completeTask}) => {
  return (
    <div key={id} className={complete? "task-card complete" : "task-card"}>

       <div className='card-info'>
        <span>
         <b>Task: </b>
         {name}
        </span>
        <span>
         <b>Date: </b>
         {date}
        </span>
       </div>

       <div className='card-buttons'>
       <button onClick={() => editTask(id)}><BiEdit/></button>
       <button onClick={() => deleteTask(id)}><AiOutlineDelete/></button>
       <button onClick={() => completeTask(id)}><BiCheckDouble/></button>
       </div>

    </div>
  )
}

export default Task
