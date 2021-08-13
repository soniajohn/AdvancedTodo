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
    const[getid,setGetid]=useState(1)
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



        const deleteTask=(childtask_id)=>{
         // alert("del="+task_del)
         let taskid=childtask_id
         let todolistId=fetchid
         alert(taskid)

          Axios.delete(`http://localhost:4000/users/${userid}/todolists/${todolistId}/tasks/${taskid}`);
      
             };



         
          const updateTask=(tasname,childtodo_id)=>{
            let taskid=childtodo_id,todolistid=fetchid
alert("hihi")
alert(taskid)                       
          Axios.put(`http://localhost:4000/users/${userid}/todolists/${todolistid}/tasks/${taskid}`,
              {
                tasname:tasname
              
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
          
          //alert("elem="+elem.childtodo_id)
         // alert("isedit="+isEditItem)
          if(elem.childtodo_id===isEditItem){
             setToggleBtn(true)
          
              setTasks(" ")
            
            
              updateTask(task,elem.childtodo_id)
              return{...elem,childtask_name:task}
            
                           }
             return elem;
            })
      
      )
    } else{

      setGetid(parseInt(getid+1))
                     alert(getid)
    setItems([{childtodo_id:getid,childtask_name:task,child_status:false},...items]);

    setTasks("")
   
   } }



  const inputRef = useRef();
  useEffect(() => {
  inputRef.current.focus();

                  })




  const submitTask=()=>{
   
   let todolistid=fetchid
        
  if(task){
      Axios.post(`http://localhost:4000/users/${userid}/todolists/${todolistid}/tasks`,{
      task:task,
      text:optionname,
      Todoid:fetchid,
      childtask_id:getid
           
   }).then(()=>{
       alert("successful insert")});
       addItem();
      
             }
       
      
                     };  


 
   const editItem=(id)=>{
      let newEditItem=items.find((elem)=>{
    //alert("elem="+elem.childtodo_id)
     //alert("id="+id)
    
    return elem.childtodo_id===id

             });
   setToggleBtn(false);
   setTasks(newEditItem.childtask_name)
   setIsEditItem(id)


         }

 


  useEffect(() => {
   //let  optionname=fetchid
  Axios.get(`http://localhost:4000/user/${userid}/todolists/${optionname}`,

  {
  
  }).then(response=>{
   
     
     var todoid=response.data[0].Todoid
    
     setFetchid(todoid)
     alert("getid="+getid)
     setGetid(parseInt(getid+10))
     

     
     Axios.get(`http://localhost:4000/user/${userid}/todolists/${todoid}`,
     { 
        
     }).then(response=>{
         
    //setItems([{id:Date.now(),childtask_name:task,child_status:false});
 
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
    
    let todolistid=fetchid
   
       Axios.get(`http://localhost:4000/users/${userid}/todolists/${todolistid}`,{
        

        }).then((response)=>
        settskList(response.data)
     
        )  

        setShowallCheck(e.target.checked)
                       }





  const updateTaskStatus=(txt,status,childtodo_id)=>{
    // alert("update"+txt)
    let taskid=childtodo_id
    let todolistId=fetchid
     
      Axios.put(`http://localhost:4000/users/${userid}/todolists/${todolistId}/taasks/${taskid}`,
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
                // alert("elmout"+elm.id)
                
                 setItems(items.filter(obj2=>{

                 
         
                  if(obj2.childtodo_id===elm.childtodo_id){
                    
                   obj2.child_status=e.target.checked

  
            
               
               updateTaskStatus(obj2.childtask_name,obj2.child_status,obj2.childtodo_id)
                  
                         
                  }
                  return obj2
               
                 
                 })
                 )}
                 
            
                 
               
                 } value={elm.childtask_name} checked={elm.child_status==0?false:true} class="optionbtn" name="option"
                
                 />
                 
                            
                
 
         <label style={{textDecoration:elm.child_status==1?"line-through":"none"} }  name="text">{elm.childtask_name}</label>
         <img title="edit item" class="editimg" src="https://img.icons8.com/color/48/000000/edit-property.png" onClick={()=>editItem(elm.childtodo_id)}/>
         <i class="fa fa-trash" title="delete Item" onClick={()=>deleteItem(ind,elm.childtodo_id)}></i>

          
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
                      
      

 
                  <span class="newbtn"><input type="button"  class="newbtn" value= " +   back"  onClick={()=>history.push("/users/:userid/todolists")} /></span> 
                  
      
 </div>
 </div>
     
            
        
          
          </react.Fragment>
          
            
          
          )

}
export default ChildList;