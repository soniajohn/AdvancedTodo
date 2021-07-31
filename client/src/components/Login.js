import react, { useState } from 'react';

import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import Tasklist from './TaskList';
import {useHistory} from "react-router-dom";
import {ListContext} from '../context/ListContext.js'
import{useContext} from 'react';











const Login=()=>{

  const{username,SetUsername,userid,SetUserid}=useContext(ListContext);
  const [loginstatus,SetLoginstatus]=useState("")
  
  let history=useHistory();

  const [user,setUser] = useState({

    email:"",password:""
    
      });
      
      let name,value;
      const handleInputs=(e)=>{
    
        name=e.target.name;
        value=e.target.value;
        
           
    
        setUser({...user,[name]:value});
    
      }
      
      const loginData=()=>{
        const {email,password}=user;
          
        if(user){
        
                  
          Axios.post("http://localhost:4000/logininsert",{
          
          email,password
               
          }).then((response)=>{
          
           if(response.data.message){

             SetLoginstatus(response.data.message)
           //  alert(response.data.message)
           }
          
           
           else
          
           if(response.data[0].email)
           {
             var user=response.data[0].f_name
            // alert("user="+user)
             var userid=response.data[0].user_id
            // alert("userid="+userid)
           
           SetUsername(user);
           SetUserid(userid)
               
           history.push('/taskinsert')
           }
        
           });
       
                      } 
                // cancelData();   
                    
           };  
    
         const cancelData = () => { 
         setUser({email:" ",password:" "})
          }
       

    return(

        <react.Fragment>
          
          <div class="parent_div">
                   <div class="container">
                
                     
                          <div class="secondcontainer">
                          <img  class="todoimg" src="/image/todoicon.jpeg"></img>
                          &nbsp;&nbsp;&nbsp;<label class="heading">ToDo App</label> <br></br> <br></br>
                          <label class="todolbl" >Login</label><br></br>
                          <label class="todolbl2" >Login with E-mail</label><br></br>
                        <span class="thirdcontainer">
                          <input type="text"  name="email" class="todonametxt" value={user.email} autoComplete="off" maxLength="20" onChange={handleInputs} ></input>&nbsp;&nbsp;
                          </span><br></br>
                          <label class="todolbl" >Password</label><br></br>
                          
                        <span class="thirdcontainer">
                          <input type="text" name="password"  class="todonametxt" value={user.password} autoComplete="off" maxLength="20" onChange={handleInputs} ></input>&nbsp;&nbsp;
                          </span>
                          <p>{loginstatus}</p>
                          <div class="btnclass">
                          <button  class="todobtn" onClick={loginData}>SignIn</button>&nbsp;&nbsp;<button class="todobtn" onClick={cancelData }>Reset</button>
                          <a href="/signupinsert" class="signup">SignUp</a></div>
                          
                           
                      
                          
                          </div>
                         
          
                   </div>
                   
                     
          
           </div>
           
          
          
          </react.Fragment>
          
            
          
          )

}
export default Login;




    

