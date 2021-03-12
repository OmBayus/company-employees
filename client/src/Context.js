import React, { useState,createContext, useEffect } from "react"

import PeopleService from "./services/People"

export const Context = createContext();


export const Provider = (props) =>{

      const [people,setPeople] = useState([])

      useEffect(()=>{
            PeopleService.getAll()
                  .then(data=>{
                        setPeople(data)
                  })
      },[setPeople])


      return(
            <Context.Provider value={{peopleContext:[people,setPeople],}}>
                  {props.children}
            </Context.Provider>
      )
}