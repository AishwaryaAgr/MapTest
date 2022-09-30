import MyMapComponent from "./Map";
import React, {useEffect} from 'react'
import axios from "axios";

function App() {

  useEffect(() => {
    axios({
    url: `https://0j7fb0obf1.execute-api.ap-south-1.amazonaws.com/test/staff/tasks`,
    method: 'POST',
    data: {Ids: [1,9]}
  })
    .then(res=> console.log(res))
    .catch(err=> console.log(err))

  }, [])

    return (
      <div className="App">
          Hello
      </div>
    );
}

export default App;
