
import './App.css';
import './css/todolist.css'
import './css/childlist.css'
import './css/login.css'
import './css/signup.css'
import Tasklist from './components/TaskList';
import ChildList from "./components/ChildList";
import SignUp from './components/SignUp';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import ListContextProvider from './context/ListContext.js';
import Login from './components/Login';
function App()
{
  
  
     return (

      <ListContextProvider>
         <>
           <Router> 
              <Switch>
           
                
                 <Route exact path="/taskinsert"  component={Tasklist}/> 
                 <Route exact path="/childlist"  component={ChildList} />
                 <Route exact path="/delete/:id"  component={Tasklist } />
                 <Route exact path="/childdelete/:id"  component={ChildList } />
                 <Route exact path="/edit"  component={Tasklist}/> 
                 <Route exact path="/Childupdate"  component={ChildList } />
                 <Route exact path="/childinsert"  component={ChildList } />
                 <Route exact path="/"  component={Login} />
                 <Route exact path="/signup"  component={SignUp } />
                 <Route exact path="/signupinsert"  component={SignUp } />
                 <Route exact path="/logininsert"  component={Login } />
                 <Route exact path="/fetchData/:userid"  component={Tasklist} />
                 <Route exact path="/fetchTaskid"  component={ChildList } />
                 <Route exact path="/back"  component={Tasklist} />
                 <Route exact path="/fetchdisplay/:taskid"  component={ChildList } />
                 <Route exact path="/showselected/:fetchid"  component={ChildList } />
 
              </Switch> 
              
           </Router>

          </>
 
          </ListContextProvider>
     
             );
 
}

export default App;
