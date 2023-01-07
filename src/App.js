import MyMapComponent from "./Map";
import React, {useEffect} from 'react'
import axios from "axios";
import { 
  lookupRegion, 
} from "@googlemaps/region-lookup";

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

  useEffect(() => {

      lookupRegion({ headers, data })
      .then(res=>{
        console.log(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
    
  }, [])

    return (
      <div className="App">
          Hello
      </div>
    );
}

export default App;
