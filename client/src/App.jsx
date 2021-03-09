import React from "react"

import {Provider} from "./Context"

//Components
import Navbar from "./Components/Navbar/Navbar"
import Main from "./Components/Main/Main"

function App() {
  
  return (
    <Provider>
      <Navbar membersNumber={5} />
      <Main/>
    </Provider>
  );
}

export default App;
