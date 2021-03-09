import React, { useState,createContext } from "react"

export const Context = createContext();


export const Provider = (props) =>{

      const [people,setPeople] = useState([])


      return(
            <Context.Provider value={{peopleContext:[people,setPeople],}}>
                  {props.children}
            </Context.Provider>
      )
}