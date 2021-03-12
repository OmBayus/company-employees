import React, { useContext, useState } from "react"
import { Container, Form, Row, Col,Card } from "react-bootstrap"
import {Link} from "react-router-dom"

import {Context} from "../../Context"

import "./Main.css"

const MainUser = ({info})=>(
      <Link to={"/"+info.no}>
            <Card className="main-user">
                  <Card.Img variant="top" src={info.imgPath} />
                  <Card.Body>
                  <Card.Title>{info.name}</Card.Title>
                  <Card.Title>{info.unvan}</Card.Title>
                  <Card.Title>{info.no}</Card.Title>
                  </Card.Body>
            </Card>
      </Link>
) 


const Main = ()=>{

      const [search,setSearch] = useState({name:"",unvan:""})

      const { peopleContext } = useContext(Context)

      const people = peopleContext[0]


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
                              <Col md={4} key={index}><MainUser info={item}/></Col>
                        ))
                  }
                  </Row>
            </div>
      </Container>
      )
}


export default Main