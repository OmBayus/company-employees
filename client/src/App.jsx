import React from "react"
import {Switch, Route} from "react-router-dom"

import {Provider} from "./Context"

//Components
import Navbar from "./Components/Navbar/Navbar"
import Main from "./Components/Main/Main"
import AddPerson from "./Components/AddPerson/AddPerson"

function App() {
  
  return (
    <Provider>
      <Switch>
        <Route path="/" exact>
        <Navbar active={1}/>
        <Main/>
        </Route>
        <Route path="/kisiekle">
          <Navbar active={2}/>
          <AddPerson/>
        </Route>
      </Switch>
    </Provider>
  );
}

export default App;
