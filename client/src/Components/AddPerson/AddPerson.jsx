import React, { useContext, useEffect, useState } from "react"
import Dropzone from "react-dropzone";

import { Container, Form, Button } from "react-bootstrap"

import PeopleService from "../../services/People"

import {Context} from "../../Context"

import "./AddPerson.css"


const AddPerson = ()=>{

      const {peopleContext} = useContext(Context)

      const [people,setPeople] = peopleContext

      const [file, setFile] = useState([]);

      const [User,setUser] = useState({name:"",unvan:"Çalışan",no:""})

      useEffect(()=>{
            PeopleService.getAll()
                  .then(data=>{
                        setPeople(data)
                  })
      },[setPeople])

      const handleDrop = acceptedFiles =>{

            var reader = new FileReader()
      
            reader.onload = function(e){
                  document.getElementById("resim").setAttribute("src",e.target.result)
            }
            reader.readAsDataURL(acceptedFiles[0]);
            setFile(acceptedFiles[0]);
      }

      const handleUser = e =>{
            const {name,value} = e.target

            setUser(prevValue=>{
                  if(name==="name"){
                        return({...prevValue,name:value})
                  }
                  else if(name==="unvan"){
                        return({...prevValue,unvan:value})
                  }
                  else if(name==="no"){
                        return({...prevValue,no:value})
                  }
            })
      }

      const addUser = async (e)=>{
            e.preventDefault()

            const temp = people.filter(item=> String(item.no) === User.no)

            if(temp.length > 0){
                  console.log("Bu sicil no ya sahip kullanıcı var.")
                  console.log(temp)
            }
            else{
                  const data = new FormData()
                  data.append("name",User.name)
                  data.append("unvan",User.unvan)
                  data.append("no",User.no)
                  data.append("file",file)
                  const res = await PeopleService.create(data)

                  console.log(res)
            }

            // console.log(people)
            // console.log(User)
            // console.log(fileNames)
      }


      return(
      <div className="addperson">
            <Container className="text-center">
                  <div className="addperson-form">
                        <img id="resim" src="#" alt="img" className="addperson-img" />
                        <Form onSubmit={addUser}>
                              <Dropzone
                              onDrop={handleDrop}
                              accept="image/*"
                              minSize={1024}
                              maxSize={3072000}
                              >
                              {({ getRootProps, getInputProps }) => (
                              <div {...getRootProps({ className: "dropzone" })}>
                                    <input {...getInputProps()} />
                                    <p>Drag'n'drop images, or click to select files</p>
                              </div>
                              )}
                              </Dropzone>
                              <Form.Group>
                              <Form.Label>İsmi</Form.Label>
                              <Form.Control onChange={handleUser} type="text" required placeholder="İsmi giriniz..." name="name" />
                              </Form.Group>
                              
                              <Form.Group>
                                    <Form.Label>Ünvan</Form.Label>
                                    <Form.Control onChange={handleUser} as="select" name="unvan">
                                          <option>Çalışan</option>
                                          <option>Kurucu Ortak</option>
                                    </Form.Control>
                              </Form.Group>
                              <Form.Group>
                              <Form.Label>Sicil No</Form.Label>
                              <Form.Control onChange={handleUser} type="text" required placeholder="Sicil No giriniz..." name="no"/>
                              </Form.Group>
                              <Button type="submit">Kaydet</Button>
                        </Form>
                  </div>
            </Container>
      </div>
      
      )
}



export default AddPerson