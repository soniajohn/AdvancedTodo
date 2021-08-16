import react, { useRef, useState, useEffect } from 'react';

import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import Tasklist from './TaskList';
import { useHistory } from "react-router-dom";
import { ListContext } from '../context/ListContext.js'
import { useContext } from 'react';





const Login = () => {

  const { username, SetUsername, userid, SetUserid } = useContext(ListContext);
  const [loginstatus, SetLoginstatus] = useState("")
  const [textstatus, Settextstatus] = useState("")

  let history = useHistory();

  const [user, setUser] = useState({

    email: "", password: ""

  });


  let name, value, bool;
  const handleInputs = (e) => {

    name = e.target.name;
    
    value = e.target.value;
    if (name === "email") {
      const emailRegex = /\S+@\S+\.\S+/;
      if (emailRegex.test(value)) {
        Settextstatus("")


      } else {
        Settextstatus("not valid email");

      }

    }

    setUser({ ...user, [name]: value });

  }

  const loginData = () => {
    const { email, password } = user;

    if (user) {

      
      Axios.post(`http://localhost:4000/users/todolists`, {

        email, password

      }).then((response) => {

        if (response.data.message) {
          Settextstatus("")
          SetLoginstatus(response.data.message)
          
        }


        else

          if (response.data[0].email) {
            var user = response.data[0].f_name
            
            var userid = response.data[0].user_id
          

            SetUsername(user);
            SetUserid(userid)

            history.push('/users/:user/todolists')
          }

      });

    }
    

  };








  const cancelData = () => {
    setUser({ email: " ", password: " " })
    SetLoginstatus(" ")
    Settextstatus(" ")

  }


  return (

    <react.Fragment>

      <div class="parent_div">
        <div class="container">


          <div class="secondcontainer">
            <img class="todoimg" src="/image/todoicon.jpeg"></img>
            &nbsp;&nbsp;&nbsp;<label class="heading">ToDo App</label> <br></br> <br></br>
            <label class="todolbl" >Login</label><br></br>
            <label class="todolbl2" >Login with E-mail</label><br></br>
            <span class="thirdcontainer">
              <input type="text" name="email" class="todonametxt" value={user.email} autoComplete="off" maxLength="20" onChange={handleInputs} ></input>&nbsp;&nbsp;
            </span><br></br>
            <p>{textstatus}</p>
            <label class="todolbl" >Password</label><br></br>

            <span class="thirdcontainer">
              <input type="password" name="password" class="todopasstxt" value={user.password} autoComplete="off" maxLength="20" onChange={handleInputs} ></input>&nbsp;&nbsp;
            </span>
            <p>{loginstatus}</p>
            <div class="btnclass">
              <button class="todobtn" onClick={loginData}>SignIn</button>&nbsp;&nbsp;<button class="todobtn" onClick={cancelData}>Reset</button>
              <a href="/users" class="signup">SignUp</a></div>




          </div>


        </div>



      </div>



    </react.Fragment>



  )

}
export default Login;






