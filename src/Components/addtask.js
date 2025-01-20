import React, { useState } from 'react';
import { addtask } from './taskslice';
 import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.css';
function Addtask(props) {

    const dispatcher=useDispatch()
 
    const [data,setdata]=useState({
        taskname:'',
        status:''
    })

    let handlechange=(e)=>{

            const{name,value}=e.target;
            
            setdata((prevstate)=>({
                ...prevstate,[name]:value
            }))
            
    }
    

    let handlesubmit=(e)=>{
        e.preventDefault()
        dispatcher(addtask(data))
       alert("Task added successfully!!")

    }


    return (
        <div>
            <h2 style={{marginTop:'30px'}}>Addbook</h2>
            <br></br>
            <form className='form' onSubmit={handlesubmit}>
                
                <input type='text' placeholder='Task Name' name='taskname' value={data.taskname}  onChange={handlechange}  required/>
             
                <input type='text' placeholder='Status' name='status' value={data.status}  onChange={handlechange}  required/>

                <button type='submit' style={{backgroundColor:'lightblue'}} >Save</button>
                
                
            </form>
            
<br></br>

<Link to={'/showtask'}>Click here to see tasks</Link>  
            
        </div>
    );
}

export default Addtask;