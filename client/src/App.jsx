import React,{ useState } from "react"

//Components
import Navbar from "./Components/Navbar/Navbar"
import Main from "./Components/Main/Main"

function App() {
  const [people,setPeople] = useState([
    {name:"Ömer Bayramçavuş",unvan:"Kurucu Ortak",no:"1251251"},
    {name:"Ali Bayramçavuş",unvan:"Kurucu Ortak",no:"212251251"},
    {name:"Furkkan Bayramçavuş",unvan:"Kurucu Ortak",no:"325251251"},
    {name:"Fırat Karahasanoğlu",unvan:"Çalışan",no:"425251"}
  ])
  return (
    <div>
      <Navbar membersNumber={5} />
      <Main people={people}/>
    </div>
  );
}

export default App;
