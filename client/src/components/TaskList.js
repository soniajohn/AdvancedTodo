import react from 'react';
import React, { useState} from "react";
import {Link, useHistory} from "react-router-dom";
import{useContext} from 'react';
import Axios from 'axios';
import {ListContext} from '../context/ListContext.js'
import  { useRef, useEffect } from 'react';
import { subnetMatch } from 'ipaddr.js';


  
    

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
    const[getid,setGetid]=useState(0)
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
                
      //  Axios.post("http://localhost:4000/taskinsert",{
        
      //  task:task,userid:userid
      Axios.post(`http://localhost:4000/users/${userid}/todolists`,{
            todoid:getid,
             task:task
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




    const deleteItem=(id,todolist_id)=>{
    const updatedItems=items.filter((elm,ind)=>{
        
           return ind!==id;
       
                      } ) ;
             deleteTask(todolist_id);
             setItems(updatedItems);

          } 





          

          const updateTask=(tasname,todolistid)=>{
          
           
        
        Axios.put(`http://localhost:4000/users/${userid}/todolists/${todolistid}`,
             {
              tasname:tasname
            
              }).then((response)=>
          
             { 
               //alert("update");
        
              }
            
              );
          
          
              }

              
        //const updateTaskStatus=(txt,status,Todoid)=>{
          
                 //  let todolistId=Todoid
       // Axios.put(`http://localhost:4000/users/${userid}/todolist/${todolistid}`,
          // { status:status,txtupdate:txt}).then((response)=>
          
          // { 
             //alert("update");
        
         //  }
            
          // );
          
          
         // }
        
        
          useEffect(() => {
        
            Axios.get(`http://localhost:4000/users/${userid}/todolists`,

           // Axios.get(`http://localhost:4000/fetchData/${userid}`,
         { userid:userid}
            
            ).then(response=>{
            
              var todoid=response.data[0].Todoid
       setItems(response.data)
       setGetid(parseInt(todoid+10))
      
      // setItems([{Taskid:response.data[0].Taskid,Taskname:task,status:false},...items]); 
       
            })
            .catch(err=>{
              console.log(err)
              
            
            })
           

            Axios.get(`http://localhost:4000/users/todolists`,
            {})
            .then(response=>{
              alert("max="+response.data[0].Todoid)

            }).catch(err=>{

              console.log(err)
            })
          
            
        }, []);           
      
           
                
         
                  


        const deleteTask=(todolist_id,userid)=>{
alert(todolist_id)
          Axios.delete(`http://localhost:4000/users/${userid}/todolists/${todolist_id}`);
      
                                     };
 

    const addItem=()=>{
         if(!task){
                  }else if(task && !toggleBtn){

                  setItems(
                  items.map((elem)=>{
                    
                              if(elem.Todoid===isEditItem){
                              setToggleBtn(true)
          
                              setTasks(" ")
                               updateTask(task,elem.Todoid)
                               return{...elem,Todoname:task}
            
                                     }
                  return elem;
                  })
      
                           )
                     } else{
                     // getTaskid()
                     // alert("getid="+getid)
                     setGetid(parseInt(getid+1))
                     alert(getid)
                       // setGetid(getid)
                         setItems([{Todoid:getid,Todoname:task,status:false},...items]);

                          setTasks("");
                          setValidatevalue("");
   
                            }
                      }






      const editItem=(id)=>{
  
        let newEditItem=items.find((elem)=>{
      //  alert("id="+id)
        return elem.Todoid===id

                          });
         setToggleBtn(false);
        // alert("new="+newEditItem.Taskname)
          setTasks(newEditItem.Todoname)
         // alert("id="+id)
          setIsEditItem(id)


          }


        const redirectTask=()=>{

  

        history.push("/users/:userid/todolist/:todolistid");

                 

          }

     


    return(

        <react.Fragment>
          
          <div class="parent_div">
                   <div class="container">
                
                     
                          <div class="secondcontainer">
                          <button id = "logout" class="closebtn" title="Log out" onClick={()=>{history.push( "/")}}> ...</button>
                          <label class="heading"> Hi...{username}</label> <br></br> 
                          
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
                  

                  if(obj2.childtodo_id===elm.childtodo_id){
          
                   obj2.status=e.target.checked

                setOptionname(elm.Todoname);
  
              //setOptionname(items)
            
               
            //   updateTaskStatus(obj2.text,obj2.status,obj2.Todoid)
          
                         
                  }
                  return obj2
               
                 
                 })
                 )}
               
                 } value={elm.Todoname} checked={elm.status} class="optionbtn" name="option" onClick= {redirectTask} 
                
                 />
                 
                            
                
 
         <label name="text">{elm.Todoname}</label>
         <img title="edit item" class="editimg" src="https://img.icons8.com/color/48/000000/edit-property.png" onClick={()=>editItem(elm.Todoid)}/>
         <i class="fa fa-trash" title="delete Item" onClick={()=>deleteItem(ind,elm.Todoid)}></i>

          
              </div>
            
            
             ) 
            
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