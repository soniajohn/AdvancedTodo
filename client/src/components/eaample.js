import react from 'react';
import React, { useState} from "react";
import {Link, useHistory} from "react-router-dom";
import{useContext} from 'react';
import Axios from 'axios';
import {ListContext} from '../context/ListContext.js'
import  { useRef, useEffect } from 'react';


  
    

const Tasklist=()=>{


  const{username,SetUsername,userid,SetUserid}=useContext(ListContext);
    const{optionname,setOptionname}=useContext(ListContext)
    const [task,setTasks] = useState("");
    const [items,setItems]=useState([]);
    const[toggleBtn,setToggleBtn]=useState(true);
    const[isEditItem,setIsEditItem]=useState(null);
    const[optStatus,setOptStatus]=useState(false);
    const[taskValue,setTaskvalue]=useState("")
    const[validatevalue,setValidatevalue]=useState("")
    const[fetchlist,setFetchlist]=useState([])
    const[showList,setshowList]=useState([])
    let history=useHistory();

    const[usertasklist,setUsertasklist]=useState([])








  function passData(val)
    
      {
        if(val.length>0)
        {
     var name= val[0].toUpperCase()+val.slice(1)
      
        }
  
      setTasks(name);
  
      return val.length<15 ?'':setValidatevalue("max char 15");
         
      }



  const submitTask=()=>{
        
      if(task){
                
        Axios.post("http://localhost:4000/taskinsert",{
        
        task:task,userid:userid
             
        }).then(()=>{
          alert("successful insert")});
          addItem();
        
                    }
       else{
       setTaskvalue("please fill the field");
       inputRef.current.focus();
            }
                       };  
  


    const inputRef = useRef();
      useEffect(() => {
       inputRef.current.focus();

                       })




    const deleteItem=(id,task_del)=>{
    const updatedItems=items.filter((elm,ind)=>{
        
           return ind!==id;
       
                      } ) ;
             deleteTask(task_del);
             setItems(updatedItems);

          } 












          

          const updateTask=(tasname,txt)=>{
          
           
        
        Axios.put("http://localhost:4000/edit",
             {
              tasname:tasname,original_txt:txt
            
              }).then((response)=>
          
             { 
               //alert("update");
        
              }
            
              );
          
          
              }



        const updateTaskStatus=(txt,status)=>{
          
                   
        Axios.put("http://localhost:4000/Update",
           { status:status,txtupdate:txt}).then((response)=>
          
           { 
             //alert("update");
        
           }
            
           );
          
          
          }
        
        
          useEffect(() => {
          
            Axios.get(`http://localhost:4000/fetchData/${userid}`,
         { userid:userid}
            
            ).then(response=>{
              console.log(response)
          setUsertasklist(response.data)
        
          
       //   usertasklist.map((elem)=>{
         //alert(elem.Taskname)
       //  setUsertasklist(elem.Taskname);
        // setUsertasklist(elem.Taskname);
        // alert(usertasklist)
         // })
            })
            .catch(err=>{
              console.log(err)
            
            })
          // SetUsername( response.data[0].user)
            
        }, []);
          




          
   
            
      
           
                
         
          
            
                            
















        const deleteTask=(task_del)=>{

          Axios.delete(`http://localhost:4000/delete/${task_del}`);
      
                                     };
 

    const addItem=()=>{
         if(!task){
                  }else if(task && !toggleBtn){

                  setItems(
                  items.map((elem)=>{
                              if(elem.id===isEditItem){
                              setToggleBtn(true)
          
                              setTasks(" ")
                               updateTask(task,elem.text)
                               return{...elem,text:task}
            
                                     }
                  return elem;
                  })
      
                           )
                     } else{
                         setItems([{id:Date.now(),text:task,status:false},...items]);

                          setTasks("");
                          setValidatevalue("");
   
                            }
                      }






      const editItem=(id)=>{
  
        let newEditItem=items.find((elem)=>{
        
        return elem.id===id

                          });
         setToggleBtn(false);
          setTasks(newEditItem.text)
          setIsEditItem(id)


          }


        const redirectTask=()=>{

  

        history.push("/childlist");

                 

          }

     


    return(

        <react.Fragment>
          
          <div class="parent_div">
                   <div class="container">
                
                     
                          <div class="secondcontainer">
                            
                          <label class="heading"> {username}{userid}</label> <br></br> 
                          
                        <span class="thirdcontainer">
                          <input type="text"  ref={inputRef} class="todonametxt" title={validatevalue} value={task}autoComplete="off" maxLength="20" onChange={(e)=>passData(e.target.value)}></input>&nbsp;&nbsp;
                          </span>
                          
                          <span class="imgbutton">
                            {

                              toggleBtn?<button onClick={submitTask}><img class="plusimage"  src="/image/plus.png"></img></button>:<button onClick={addItem}><img class="plusimage" title="edit" src="https://img.icons8.com/color/48/000000/edit-property.png"></img></button>
                            }
                            </span>
                           
                      
                          { 
    
    items.map((elm,ind)=>{
  
        return(
          
         
                <div class="insert" key={ind}>

                <input type="radio"  name="taskname"    onChange={(e)=>{
                
                 setItems(items.filter(obj2=>{
                  

                  if(obj2.id===elm.id){
          
                   obj2.status=e.target.checked

                setOptionname(elm.text);
  
              //setOptionname(items)
            
               
               updateTaskStatus(obj2.text,obj2.status)
          
                         
                  }
                  return obj2
               
                 
                 })
                 )}
               
                 } value={elm.text} checked={elm.status} class="optionbtn" name="option" onClick= {redirectTask} 
                
                 />
                 
                            
                
 
         <label name="text">{elm.text}</label>
         <img title="edit item" class="editimg" src="https://img.icons8.com/color/48/000000/edit-property.png" onClick={()=>editItem(elm.id)}/>
         <i class="fa fa-trash" title="delete Item" onClick={()=>deleteItem(ind,elm.text)}></i>

          
              </div>
            
            
             ) 
            
            }
            
            
            

                
            )
                       
}
<span class="showcomplete_txt" >
     
 <label >completed Task</label></span>
 {
     
     usertasklist.map((val,key)=>{
         
     
        
      {
        
        return (
            <div class="showcheck">        
            <h4>Task Name:</h4>&nbsp;&nbsp;<h5>{val.Taskname}</h5>
            
            </div>
            
                )
            }
                
                                 }
                     )
}  
                      
                          </div>
                        
                   </div>
                 
          
           </div>
           
          
          
          </react.Fragment>
          
            
          
          )

}
export default Tasklist;