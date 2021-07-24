
import './App.css';
import './css/todolist.css'
import './css/childlist.css'
import Tasklist from './components/TaskList';
import ChildList from "./components/ChildList";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import ListContextProvider from './context/ListContext.js';
function App()
{
  
  
     return (

      <ListContextProvider>
         <>
           <Router> 
              <Switch>
           
                
                 <Route exact path="/"  component={Tasklist}/> 
                 <Route exact path="/childlist"  component={ChildList} />
                 <Route exact path="/delete/:id"  component={Tasklist } />
                 <Route exact path="/childdelete/:id"  component={ChildList } />
                 <Route exact path="/edit"  component={Tasklist}/> 
                 <Route exact path="/Childupdate"  component={ChildList } />
                 <Route exact path="/childinsert"  component={ChildList } />
                 


              </Switch> 
              
           </Router>

          </>
 
          </ListContextProvider>
     
             );
 
}

export default App;
