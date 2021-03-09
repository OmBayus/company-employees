import React, { useContext, useEffect, useState } from "react"
import { Container, Form, Row, Col,Card } from "react-bootstrap"

import PeopleService from "../../services/People"

import {Context} from "../../Context"

import "./Main.css"

const MainUser = ({click,info})=>(
      <Card className="main-user" onClick={click}>
            <Card.Img variant="top" src="/profil.png" />
            <Card.Body>
            <Card.Title>{info.name}</Card.Title>
            <Card.Title>{info.unvan}</Card.Title>
            <Card.Title>{info.no}</Card.Title>
            </Card.Body>
      </Card>
) 


const Main = ()=>{

      const [search,setSearch] = useState({name:"",unvan:""})

      const {peopleContext} = useContext(Context)

      const [people,setPeople] = peopleContext

      useEffect(()=>{
            PeopleService.getAll()
                  .then(data=>{
                        setPeople(data)
                  })
      },[setPeople])

      const handleClick = ()=>{
            console.log("sa")
      }

      const handleSearch = (e)=>{

            const {name,value} = e.target
            
            if(name === "unvan-filter"){
                  setSearch(prevValue=>{
                        return({...prevValue,unvan:value})
                  })
            }
            else if(name==="name-filter"){
                  setSearch(prevValue=>{
                        return({...prevValue,name:value})
                  })
            }
      }

      return(
      <Container className="main">
            <div className="main-filter">
                  <Form.Control type="text" className="mt-3 w-50" style={{margin:"0 auto"}} onChange={handleSearch} name="name-filter" placeholder="Search.." />
                  <Row className="w-75 my-4" style={{margin:"0 auto"}}>
                        <Col>
                              <Form.Control as="select" onChange={handleSearch} name="unvan-filter">
                                    <option value="">Hepsi</option>
                                    <option>Kurucu Ortak</option>
                                    <option>Çalışan</option>
                              </Form.Control>
                        </Col>
                  </Row>
            </div>
            <div style={{padding:"20px"}}>
                  <Row>
                  {
                        people.filter(item=>item.unvan.toLocaleLowerCase().includes(search.unvan.toLocaleLowerCase())).filter(item=>(item.name.toLocaleLowerCase().includes(search.name.toLocaleLowerCase()) || String(item.no).toLocaleLowerCase().includes(search.name.toLocaleLowerCase()))).map((item,index)=>(
                              <Col md={4} key={index}><MainUser click={handleClick} info={item}/></Col>
                        ))
                  }
                  </Row>
            </div>
      </Container>
      )
}


export default Main