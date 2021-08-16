import{useState,createContext}from 'react'

export const ListContext=createContext()

     function ListContextProvider(props)
       {
         const [optionname,setOptionname] = useState("");
         const[username,SetUsername]=useState("")
         const[userid,SetUserid]=useState("")
         const[childtaskid,Setchildtaskid]=useState("")
         
          
      return(
            <ListContext.Provider value={{optionname,setOptionname,username,SetUsername,userid,SetUserid,childtaskid,Setchildtaskid}}>
               
                {props.children}

            </ListContext.Provider>


      )


   }
   export default ListContextProvider;