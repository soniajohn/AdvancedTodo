import{useState,createContext}from 'react'

export const ListContext=createContext()

     function ListContextProvider(props)
       {
         const [optionname,setOptionname] = useState("");
        
         
    
      

      return(
            <ListContext.Provider value={{optionname,setOptionname}}>
               
                {props.children}

            </ListContext.Provider>


      )


   }
   export default ListContextProvider;