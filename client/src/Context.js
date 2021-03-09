import React, { useState,createContext } from "react"

export const Context = createContext();


export const Provider = (props) =>{

      const [people,setPeople] = useState([
            {name:"Ömer Bayramçavuş",unvan:"Kurucu Ortak",no:"1251251"},
            {name:"Ali Bayramçavuş",unvan:"Kurucu Ortak",no:"212251251"},
            {name:"Furkkan Bayramçavuş",unvan:"Kurucu Ortak",no:"325251251"},
            {name:"Fırat Karahasanoğlu",unvan:"Çalışan",no:"425251"}
      ])


      return(
            <Context.Provider value={{peopleContext:[people,setPeople],}}>
                  {props.children}
            </Context.Provider>
      )
}