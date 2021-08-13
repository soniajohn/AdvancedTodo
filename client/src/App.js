
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
                  
              <Route exact path="/"  component={Login } />
              <Route exact path="/users"  component={SignUp } />
                  
              
              <Route exact path="/users/:userid/todolists"  component={Tasklist} />



<Route exact path="/users/:userid/todolist/:todolistid" component={ChildList} />
<Route exact path="/users/:userid/todolists/:todolist_id" component={Tasklist } />
<Route exact path="/childdelete/:id" component={ChildList } />
<Route exact path="/users/:userid/todolists/:todolistId/tasks/:taskid" component={ChildList } />
<Route exact path="/users/:userid/todolists/:todolistid/tasks" component={ChildList } />
<Route exact path="/signup" component={SignUp } />
<Route exact path="/logininsert" component={Login } />
<Route exact path="/fetchData/:userid" component={Tasklist} />
<Route exact path="/users/:userid/todolists/:todolistid" component={ChildList } />
<Route exact path="/back" component={Tasklist} />
<Route exact path="/fetchdisplay/:taskid" component={ChildList } />
<Route exact path="/showselected/:fetchid" component={ChildList } />
<Route exact path="/users/:userid" component={Tasklist}/> 

                
              </Switch> 
              
           </Router>

          </>
 
          </ListContextProvider>
     
             );
 
}

export default App;
