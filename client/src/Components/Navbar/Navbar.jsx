import React, { useEffect, useState,useContext } from "react"
import {Container} from "react-bootstrap"

import logo from "./logo512.png"

import "./Navbar.css"

import {Context} from "../../Context"

var min = new Date().getMinutes()
var hour = new Date().getHours()
var second = new Date().getSeconds()

const Tarih = ()=>{
      const [saat,setSaat] = useState(hour+":"+min+":"+second)

      useEffect(()=>{

            setInterval(()=>{
                  var min = new Date().getMinutes()
                  var hour = new Date().getHours()
                  var second = new Date().getSeconds()
                  setSaat(hour+":"+min+":"+second)
            },1000)
            
      },[])

      var tarih = new Date();
      var months = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
      return(
            <div>
                  <h4>
                        {tarih.getDate()}{' '}
                        {months[tarih.getMonth()]}{' '}
                        {tarih.getFullYear()}
                  </h4>
                  <h5>{saat}</h5>
            </div>
      )
}

const Navbar = ()=>{
      const [isOpen,setIsOpen] = useState(false)

      const {peopleContext} = useContext(Context)

      const [people,setPeople] = peopleContext


      const handleNav = ()=>{
            setIsOpen(!isOpen)
      }

      useEffect(()=>{
            setPeople(prevValue=>prevValue) // Just made to ignore error message
      },[setPeople])
      
      return(
            <div>
                  {!isOpen && <button onClick={handleNav} className="nav-open-btn"><i className="fas fa-bars"></i></button>}
                  <div id="navbar" className={isOpen ? "nav_open" : "nav_close"}>
                        <button onClick={handleNav} className="navbar-btn"><i className="fas fa-times"></i></button>
                        <div className="navbar-logo">
                              <div><img src={logo} alt="logo" className="navbar-logo-img" /></div>
                        </div>
                        <Container>
                              <ul className="navbar-ul">
                                    <li><a href="/">AnaSayfa</a></li>
                                    <li><a href="/">Kişi Ekle</a></li>
                                    <li><a href="/">Kişi Düzenle</a></li>
                                    <li><a href="/">Kişi Sil</a></li>
                              </ul>
                        </Container>
                        <Container className="nav-footer">
                              <h5>Personel Sayısı: {people.length}</h5>
                              <Tarih/>
                        </Container>
                        
                  </div>
            </div>
      )
}



export default Navbar