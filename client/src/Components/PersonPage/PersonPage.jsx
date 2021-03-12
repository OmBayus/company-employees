import React, { useContext } from "react"
import {useRouteMatch} from "react-router-dom"

import { Button, Container } from "react-bootstrap"

import {Context} from "../../Context"

import "./PersonPage.css"


const PersonPage = ()=>{

      const { peopleContext } = useContext(Context)

      const people = peopleContext[0]

      const match = useRouteMatch("/:id")

      const deletePerson = ()=>{
            console.log("deleted")
      }

      const changePerson = ()=>{
            console.log("change")
      }

      
      return(<Container className="personPage">
            {people.filter(item=>String(item.no) === String(match.params.id)).map(item=>(
                  <div>
                        <img src={item.imgPath} alt="pp" />
                        <h1 className="mt-3">{item.name}</h1>
                        <h3>{item.unvan}</h3>
                        <h3>{item.no}</h3>
                        <Button variant="primary" className="mr-1 mt-3" onClick={changePerson}>Düzenle</Button>
                        <Button variant="danger" className="ml-1 mt-3" onClick={deletePerson}>Sil</Button>
                  </div>
            ))}
      </Container>)
}


export default PersonPage