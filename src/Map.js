import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { compose, withProps } from "recompose"
import React, {useState, useEffect} from 'react'

const MyMapComponent = compose(
    withProps({
      // googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZ-LLjEHUXavG3WqTGUB-DpXpEvh-eRhI&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )(() => {

    const [liveMarkers, setLiveMarkers] = useState([])

    const points = [
      {"lat": "28.637729",	"lng":"77.129314"},
      {"lat": "28.669995",	"lng":"77.138068"},
      {"lat": "28.669927",	"lng":"77.138067"},
      {"lat": "28.639195",	"lng":"77.129721"},
      {"lat": "28.569325",	"lng":"77.253845"},
      {"lat": "28.565361",	"lng":"77.242855"},
      {"lat": "28.566473",	"lng":"77.229749"},
      {"lat": "28.56906",	"lng":"77.21956"},
      {"lat": "28.568045",	"lng":"77.259835"},
      {"lat": "28.564664",	"lng":"77.24145"},
      {"lat": "28.56599",	"lng":"77.229396"},
      {"lat": "28.568439",	"lng":"77.219615"},
      {"lat": "28.569184",	"lng":"77.188833"},
      {"lat": "28.570927",	"lng":"77.18253"},
      {"lat": "28.590921",	"lng":"77.168314"},
      {"lat": "28.551784",	"lng":"77.264126"},
      {"lat": "28.547248",	"lng":"77.252879"},
      {"lat": "28.548898",	"lng":"77.188389"},
      {"lat": "28.554953",	"lng":"77.177535"},
      {"lat": "28.566207",	"lng":"77.166294"},
      {"lat": "28.548706",	"lng":"77.259259"},
      {"lat": "28.547711",	"lng":"77.254095"},
      {"lat": "28.544623",	"lng":"77.247026"},
      {"lat": "28.541214",	"lng":"77.234786"},
      {"lat": "28.543653",	"lng":"77.243324"},
      {"lat": "28.541814",	"lng":"77.232858"},
      {"lat": "28.542222",	"lng":"77.227342"},
      {"lat": "28.542616",	"lng":"77.221787"},
      {"lat": "28.543942",	"lng":"77.204581"},
      {"lat": "28.570345",	"lng":"77.202277"},
      {"lat": "28.570009",	"lng":"77.202032"},
      {"lat": "28.569084",	"lng":"77.204264"},
      {"lat": "28.571684",	"lng":"77.181287"},
      {"lat": "28.569282",	"lng":"77.18492"},
      {"lat": "28.569893","lng":"77.18819427"},
      {"lat": "28.543653",	"lng":"77.243324"},
      {"lat": "28.541814",	"lng":"77.232844"},
      {"lat": "28.659159",	"lng":"77.129267"},
      {"lat": "28.644936",	"lng":"77.127446"},
      {"lat": "28.64389",	"lng":"77.127124"}
    ]
    

	useEffect(() => {
		fetch(`https://os0ylhupva.execute-api.ap-south-1.amazonaws.com/default/GetLocation`)
			.then((item) => item.json())
			.then((items) => {
				items.map(item => {
          let body = JSON.parse(item.message);
          // console.log(body.GPS_LIVE);
          body.GPS_LIVE.map(data=>{
              let point = {lat: data.lat, lng: data.lng}
              console.log(point)
              let newArr = liveMarkers;
              newArr.push(point)
              return setLiveMarkers(newArr)
          })
          return console.log(liveMarkers);
      })
		});
	}, []);

  const svgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "orange",
    fillOpacity: 0.6,
    strokeWeight: 0.3,
    rotation: 0,
    scale: 2,
  };

      return(
          <>
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: 28.51835, lng : 77.200075 }}
                >
                {points.map((map, index) => {
                    console.log(map);
                    return <Marker position={{ lat: Number(map.lat), lng: Number(map.lng) }} />;
                })}
            </GoogleMap>
            
        </>
        )
    }
  )

export default MyMapComponent
