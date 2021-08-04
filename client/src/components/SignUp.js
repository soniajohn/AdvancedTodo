import react from 'react';
import React, { useState} from "react";
import Axios from 'axios';






  









const SignUp=()=>{

const [txtvalidate,Settxtvalidate]=useState("")

  const [user,setUser] = useState({

fname:"",lname:"",email:"",password:"",cpassword:""

  });
  
  let name,value;
  const handleInputs=(e)=>{

    name=e.target.name;
    value=e.target.value;
    
      ///////////////////////


     


      ///////////////////////

    setUser({...user,[name]:value});

  }



  
  const registerData=()=>{
    const {fname,lname,email,password,cpassword}=user;
      
    if(user){
    
              
      Axios.post("http://localhost:4000/signupinsert",{
      
      fname,lname,email,password,cpassword
           
      }).then(()=>{
       
        alert("successful insert")});
   
                  } 
             cancelData();   
                
       };  

     const cancelData = () => { 
     setUser({fname:"",lname:"",email:"",password:"",cpassword:""})
      }








  function passData(val,name)
    
  {
    alert(name)
  }




    return(

        <react.Fragment>
          
          <div class="parent_div">
                   <div class="container">
                
                     
                          <div class="secondcontainer">
                          
                          &nbsp;&nbsp;&nbsp;<label class="heading">SignUp</label> <br></br> <br></br>
                          
                         
                          
                        <span class="thirdcontainer">
                        <img  class="userpic" src="/image/usericon.jpeg"></img>&nbsp;
                          <input type="text"  name="fname" value={user.fname} class="todonametxt" placeholder="First Name ......."  autoComplete="nope" maxLength="20" onChange={handleInputs} ></input>&nbsp;&nbsp;
                          </span><br></br>
                        
                         
                          <span class="thirdcontainer">
                             <img  class="userpic" src="/image/usericon.jpeg"></img>&nbsp;
                          
                          <input type="text"  name="lname" value={user.lname} class="todonametxt" placeholder="Second Name....."      autoComplete="nope" maxLength="20" onChange={handleInputs} ></input><br></br>
                          </span>
                          
                          <span class="thirdcontainer">
                          <img  class="mailpic" src="/image/mails.jpeg"></img>&nbsp;
                          <input type="text" name="email" value={user.email}  class="todonametxt" placeholder="E_mail....."  autoComplete="nope" maxLength="20" onChange={handleInputs}></input>&nbsp;&nbsp;
                          </span><br></br>
                          
                          
                          
                        <span class="thirdcontainer">
                        <img  class="mailpic" src="/image/lock.jpeg"></img>&nbsp;
                          <input type="text"  name="password" value={user.password} class="todonametxt" placeholder="Password....."  autoComplete="nope" maxLength="20" onChange={handleInputs}></input>
                          </span><br></br>
                          <p>{txtvalidate}</p>
                          
                          <span class="thirdcontainer">
                          <img  class="mailpic" src="/image/lock.jpeg"></img>&nbsp;
                            <input type="text"  name="cpassword" value={user.cpassword} class="todonametxt" placeholder="Re_enetr Password....."    autoComplete="nope" maxLength="20" onChange={handleInputs} ></input>&nbsp;&nbsp;
                            </span>
                            <p>{txtvalidate}</p>
                          <div class="btnclass">
                          <button  class="todobtn" onClick={registerData}>Register</button>&nbsp;&nbsp;<button class="todobtn" onClick={cancelData }>Reset</button>
                          <a href="/logininsert" class="signup">Login</a>
                          </div>
                          
                        
                    
                          
                          </div>
                         
          
                   </div>
                   
                      
          
           </div>
           
          
          
          </react.Fragment>
          
            
          
          )

}
export default SignUp;