import React, { useContext, useState } from "react"
import {useRouteMatch,Redirect} from "react-router-dom"
import { confirmAlert } from 'react-confirm-alert';

import { Button, Container,Alert } from "react-bootstrap"

import {Fade} from "react-reveal"

import PeopleService from "../../services/People"

import {Context} from "../../Context"

import "./PersonPage.css"


const PersonPage = ()=>{

      const { peopleContext } = useContext(Context)

      const [Check,setCheck] = useState({isCheck:false,msg:"Hata",color:"danger",route:false})

      const [people,setPeople] = peopleContext

      const match = useRouteMatch("/:id")

      const deletePerson = ()=>{
            confirmAlert({
                  title: 'Kullanıcı Sil',
                  message: 'Emin Misiniz?',
                  buttons: [
                    {
                      label: 'Evet',
                      onClick: () => {
                            PeopleService.Delete(match.params.id)
                              .then((data)=>{
                                    var temp = people.filter(item=>Number(item.no) !== Number(data.data.no))
                                    setPeople(temp)
                                    setCheck({isCheck:true,msg:"Başıryla Silindi",color:"primary",route:false})
                                    setTimeout(()=>setCheck({isCheck:false,msg:"Hata",color:"danger",route:true}),2000)
                              })
                              .catch((err)=>{
                                    setCheck({isCheck:true,msg:"Bir Hata ile Karşılaşıldı",color:"danger",route:false})
                                    setTimeout(()=>setCheck({isCheck:false,msg:"Hata",color:"danger",route:false}),3000)
                                    console.log(err)
                              })
                        }
                    },
                    {
                      label: 'Hayır'
                    }
                  ]
            });
      }

      const changePerson = ()=>{
            console.log("change")
      }

      
      return(<Container className="personPage">
            {Check.route && <Redirect to="/" />}
            {Check.isCheck && <div className="alert"><Fade top><Alert variant={Check.color}>{Check.msg}</Alert></Fade></div>}
            {people.filter(item=>String(item.no) === String(match.params.id)).map(item=>(
                  <div key={match.params.id}>
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