import React, { useState } from "react"
import {Container} from "react-bootstrap"

import logo from "./logo512.png"

import "./Navbar.css"

const Navbar = ()=>{
      const [isOpen,setIsOpen] = useState(true)
      const handleNav = ()=>{
            setIsOpen(!isOpen)
      }
      return(
            <div>
                  {!isOpen && <button onClick={handleNav} className="nav-open-btn"><i class="fas fa-bars"></i></button>}
                  <div id="navbar" className={isOpen ? "nav_open" : "nav_close"}>
                        <button onClick={handleNav} className="navbar-btn"><i class="fas fa-bars"></i></button>
                        <div className="navbar-logo">
                              <div><img src={logo} alt="logo" className="navbar-logo-img" /></div>
                        </div>
                        <Container>
                        <ul className="navbar-ul">
                              <li><a href="/">AnaSayfa</a></li>
                              <li><a href="/" nowrap>Kişi Ekle</a></li>
                              <li><a href="/">Kişi Düzenle</a></li>
                              <li><a href="/">Kişi Sil</a></li>
                        </ul>
                        </Container>
                  </div>
            </div>
      )
}



export default Navbar