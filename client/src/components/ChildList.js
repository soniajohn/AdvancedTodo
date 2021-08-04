import react from 'react';
import React, { useState} from "react";
import {useHistory} from "react-router-dom";
import{useContext} from 'react';
import {ListContext} from '../context/ListContext.js'
import Axios from 'axios';
import  { useRef, useEffect } from 'react';


const ChildList=()=>{

    const [task,setTasks] = useState("");
    const [items,setItems]=useState([]);
    
    const[toggleBtn,setToggleBtn]=useState(true);
    const[isEditItem,setIsEditItem]=useState(null);
    
    const{optionname,setOptionname}=useContext(ListContext)
    const[validatevalue,setValidatevalue]=useState("")
    const[tskList,settskList]=useState([])
    const[showallCheck,setShowallCheck]=useState("")
    const{username,SetUsername,userid,SetUserid}=useContext(ListContext);
    const[fetchid,setFetchid]=useState([])
  
    let history=useHistory();

    
   

  function passData(val)
  {
  
    if(val.length>0)
      {
         var name= val[0].toUpperCase()+val.slice(1)

      }

      setTasks(name);


     return val.length<15 ?'':setValidatevalue("max char 15");

     }



     const deleteItem=(id,task_del)=>{
      const updatedItems=items.filter((elm,ind)=>{
        
             return ind!==id;
       
                     } ) ;
             deleteTask(task_del);
             setItems(updatedItems);

             } 



        const deleteTask=(task_del)=>{

          Axios.delete(`http://localhost:4000/childdelete/${task_del}`);
      
             };



         
          const updateTask=(tasname,txt)=>{
            
                       
          Axios.put("http://localhost:4000/childedit",
              {
                tasname:tasname,original_txt:txt
              
              }).then((response)=>
            
             { alert("update");
          
             }
              
             );
            
            
             }






  const addItem=()=>{
    if(!task){
    }else if(task && !toggleBtn){

      setItems(
        items.map((elem)=>{
          if(elem.childtodo_id===isEditItem){
             setToggleBtn(true)
          
              setTasks(" ")
            
            
              updateTask(task,elem.childtask_name)
              return{...elem,childtask_name:task}
            
                           }
             return elem;
            })
      
      )
    } else{
    setItems([{id:Date.now(),childtask_name:task,child_status:false},...items]);

    setTasks("")
   
   } }



 const inputRef = useRef();
 useEffect(() => {
  inputRef.current.focus();

                  })




 const submitTask=()=>{
        
        
  if(task){
      Axios.post("http://localhost:4000/childinsert",{
      task:task,
      text:optionname,
      Taskid:fetchid
      
           
   }).then(()=>{
       alert("successful insert")});
       addItem();
      
             }
       
      
                        };  


 
   const editItem=(id)=>{
  
    let newEditItem=items.find((elem)=>{
    
    
    return elem.childtodo_id===id

             });
   setToggleBtn(false);
   setTasks(newEditItem.childtask_name)
   setIsEditItem(id)


         }



useEffect(() => {
     
  Axios.get(`http://localhost:4000/fetchTaskid/${optionname}`,

  {
  
  }).then(response=>{
   
     
     var taskid=response.data[0].Taskid
    
     setFetchid(taskid)

         
     Axios.get(`http://localhost:4000/fetchdisplay/${taskid}`,
     { 
        
     }).then(response=>{
         
          
    setItems(response.data)
   
      
    
     
       })
        .catch(err=>{
          console.log(err)
        
        })
   

 
  })
  .catch(err=>{
    console.log(err)
  
               })
// SetUsername( response.data[0].user)
  
}, []);






    const getTask=(e)=>{
      

      Axios.get(`http://localhost:4000/showselected/${fetchid}`,{
        

      }).then((response)=>
      settskList(response.data)
     
        )  

        setShowallCheck(e.target.checked)
                       }



const updateTaskStatus=(txt,status)=>{
    // alert("update"+txt)
     
Axios.put("http://localhost:4000/Childupdate",
   { status:status,txtupdate:txt}).then((response)=>
  
   { alert("update");

   }
    
   );
   
  }





    return(

        <react.Fragment>
          
          <div class="parent_div">
                   <div class="container">
                
                     
                          <div class="secondcontainer">
                          <button id = "x" class="closebtn"  onClick={()=>{history.push( "/")}}> X</button>
                   
                          <label class="heading"> {optionname}</label> <br></br> 
                          
                        <span class="thirdcontainer">
                          <input type="text" class="todonametxt" ref={inputRef}  title={validatevalue}   value={task}autoComplete="off" maxLength="20" onChange={(e)=>passData(e.target.value)}></input>&nbsp;&nbsp;
                          </span>
                          <span class="imgbutton">
                            {

                              toggleBtn?<button onClick={submitTask}><img class="plusimage" title="" src="/image/plus.png"></img></button>:<button onClick={addItem}><img class="plusimage" title="edit" src="https://img.icons8.com/color/48/000000/edit-property.png"></img></button>
                            }
                            </span>
                      
                          { 
    
    items.map((elm,ind)=>{
   
  
        return(
          
         
                <div class="hhh" key={ind}>
                  

                <input type="checkbox"  name="taskname"   onChange={(e)=>{
                  alert("elmout"+elm.childtodo_id)
                
                 setItems(items.filter(obj2=>{
//alert("inobjtaskid"+obj2.childtodo_id)
                   // alert("inelmtaskid"+elm.childtodo_id)
          
                  if(obj2.childtodo_id===elm.childtodo_id){
                    
                   obj2.child_status=e.target.checked

  //alert("in child"+obj2.child_status)
            
               
               updateTaskStatus(obj2.childtask_name,obj2.child_status)
                  
                         
                  }
                  return obj2
               
                 
                 })
                 )}
                 
                
                 
               
                 } value={elm.childtask_name} checked={elm.child_status} class="optionbtn" name="option"
                
                 />
                 
                            
                
 
         <label style={{textDecoration:elm.child_status?"line-through":"none"} }  name="text">{elm.childtask_name}</label>
         <img title="edit item" class="editimg" src="https://img.icons8.com/color/48/000000/edit-property.png" onClick={()=>editItem(elm.childtodo_id)}/>
         <i class="fa fa-trash" title="delete Item" onClick={()=>deleteItem(ind,elm.childtask_name)}></i>

          
              </div>
            
            
             ) 
            
            }
            
            
            

                
            )
                       
}





                          </div>
                          <div class="third_div">

                          <input type="checkbox" class="" value="0" name="" checked={showallCheck}  onChange={getTask}

/>




<span class="showcomplete_txt" >
     
 <label >completed Task</label></span>
 {
     
     tskList.map((val,key)=>{
         
     if(showallCheck===true){
        
         return (
             <div class="showcheck">        
             <h4>Task Name:</h4>&nbsp;&nbsp;<h5>{val.childtask_name}</h5>
             <h4>&nbsp;&nbsp;Created Date:</h4>&nbsp;&nbsp;<h5>{val.child_date}</h5>
             </div>
             
                 )
             }
                 else {
 
                     return null
                 }
                                  }
                      )
 }  





</div>
                      
      

 
                  <span class="newbtn"><input type="button"  class="newbtn" value= " +   Cancel"  onClick={()=>history.push("/")} /></span> 
                  
      
 </div>
 </div>
     
            
        
          
          </react.Fragment>
          
            
          
          )

}
export default ChildList;