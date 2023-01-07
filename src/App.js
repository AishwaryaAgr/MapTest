import MyMapComponent from "./Map";
import React, {useEffect} from 'react'
import axios from "axios";

const headers = {
    "X-Goog-Api-Key": "AIzaSyAc46UYffrBosZmMVFEN1r0-IaIjytv8n0",
  };

const data= {
  identifiers: [
    {
      place: "newark",
      place_type: "locality" ,
      region_code: "us",
      language: "en",
    },
  ],
};


function App() {

    return (
      <div className="App">
          Hello
      </div>
    );
}

export default App;
