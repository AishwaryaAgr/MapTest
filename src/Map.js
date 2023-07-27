import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { compose, withProps } from "recompose"
import React, { useState, useEffect } from 'react'
import marker from "./marker.png";
import marker2 from "./marker2.png";
import marker3 from "./marker3.png"
import marker4 from "./marker4.png"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAGP0yTwZ8BFM1U6vgZ292xZD3p_M13tSI&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `98vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(() => {

  const [liveMarkers, setLiveMarkers] = useState([])
  const [location, setLocation] = useState()

  let MCD = [

    {"place":"Gazipur Gaushala Mcd Parking ","lat":28.54955730788096,"lng":77.25454520284971},
    {"place":"Infront Of Kiosk no 5 to 9 paragati deep mall laxmi Nager","lat":28.53915264372095,"lng":77.13982917802286},
    {"place":"Near Supreme Enclave , Mayur Vihar Phase 1","lat":28.570650917669163,"lng":77.25052695669174},
    {"place":"Ploat  no 10 V3S Mall,Laxmi Nager","lat":28.525873573610518,"lng":77.22278165094406},
    {"place":"Covered Parking at Patparganj Market,Near Mother Dairy","lat":28.5753219017612242,"lng":77.23266634525184},
    {"place":"Near Milan Vihar Appartment behind Max Hospital","lat":28.51845257679814,"lng":77.2259903879371},
    {"place":"Near Pankaj Plaza Joshi Colony IP Extention","lat":28.608710821867376,"lng":77.29176254995548},
    {"place":"Adjoining Saraswati Kunj society patparganj","lat":28.621932597264614,"lng":77.28643567497795},
    {"place":"South Ganeshnager chowk patparganj road","lat":28.589256199823453,"lng":77.23098182575112},
    {"place":"Bihari Colony","lat":28.626027907360818,"lng":77.28409783639655},
    {"place":"Adjoining Community Hall Near jafrabad metro Station","lat":28.64320855044141,"lng":77.28409783639655},
    {"place":"Behind Ambedkar Collage Yamuna Vihar","lat":28.682387,"lng":77.275973},
    {"place":"Near DCP Office Dhobi Ghat New Seelampur","lat":28.69966,"lng":77.285701},
    {"place":"Near & Around D Aqua Hotel Usmanpur ","lat":28.672784,"lng":77.271094},
    {"place":"Shastri Park Near Community Hall","lat":28.67312,"lng":77.260438},
    {"place":"Near Jagparvesh Chandra Hospital Shastri Park","lat":28.672001,"lng":77.257995},
    {"place":"Back Side CNG Pump Near Jag parvesh Chandra Hospital","lat":28.67671,"lng":77.264489},
    {"place":"SRM apartment near mother dairy","lat":28.674002,"lng":77.261739},
    {"place":"Janakpuri District Centre-Basement No.5","lat":28.66792,"lng":77.256726},
    {"place":"Behind gaurav apartment IP Extension","lat":28.600842,"lng":77.329758},
    {"place":"DDA  Shopping Complex Rajdhani Enclave","lat":28.63380,"lng":77.30527},
    {"place":"DDA  Market pankaj mayur plaza mayur Phase 3","lat":28.642723,"lng":77.296543},
    {"place":"Coverd Parking Mandoli extn","lat":28.61354,"lng":77.337765},
    {"place":"DDA  Covered land opposite kotla village mayur vihar pahse 1","lat":28.645452,"lng":77.301341},
    {"place":"Under flyour mansarover park metro near metro station","lat":28.61086,"lng":77.29973},
    {"place":"In Front Of Community Center Janta Flat Nandnagri","lat":28.66553,"lng":77.30116},
    {"place":"Samrat Cinema Shakurpur","lat":28.706,"lng":77.163},
    {"place":"Pushpa Bhawan Madanpur","lat":28.699843,"lng":77.311531},
    {"place":"Fortis Hospital Vasant Kunj","lat":28.527193,"lng":77.231924},
    {"place":"Kalkaji Mandir","lat":28.519071,"lng":77.159851},
    {"place":"Plot No.34 Road No 44.Pitampura ","lat":28.550177,"lng":77.263011},
    {"place":"Plot No. 1 & 2 at Community Centre Road No.44 Opposite TPDDL Pitampura","lat":28.6883,"lng":77.1320},
    {"place":"Plot No-1,Road No-44,Behind Aggarwal Prestige Mall Infront of B.T.W  Rani Bagh","lat":28.6883,"lng":77.1320},
    {"place":"Parking Site Community Centre adjoining Road No.44 Pitampura","lat":28.6883,"lng":77.1328},
    {"place":"MCD Auto Workshop Plot at MangolpurPuri","lat":28.6883,"lng":77.1328}
  ]


  useEffect(() => {
    fetch(`https://os0ylhupva.execute-api.ap-south-1.amazonaws.com/default/GetLocation`)
      .then((item) => item.json())
      .then((items) => {
        items.map(item => {
          let body = JSON.parse(item.message);
          // console.log(body.GPS_LIVE);
          body.GPS_LIVE.map(data => {
            let point = { lat: data.lat, lng: data.lng }
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

  return (
    <div style={{}}>
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 28.621268, lng:77.256561 }}
      >
        {MCD.map((map, index) => {
          console.log(map);
          return <Marker icon={{
            url: marker2, scaledSize: new window.google.maps.Size(33, 35),
            labelOrigin: new window.google.maps.Point(35, 25),
          }} onClick={() => setLocation("MCD" + index)} position={{ lat: Number(map.lat), lng: Number(map.lng) }} >
            {
              location == `MCD${index}` ?

                <InfoWindow>
                  <div>
                    {map.place}
                  </div>
                </InfoWindow>
                : null}
          </Marker>;
        })}
        {/* {Blinkit.map((map, index) => {
                    console.log(map);
                    return <Marker icon={{url: marker3, scaledSize: new window.google.maps.Size(25, 40),
                      // origin: new window.google.maps.Point(0, 0),
                      // anchor: new window.google.maps.Point(32,65),
                      labelOrigin:  new window.google.maps.Point(35,25),}} onClick={()=>setLocation("Becil"+index)} position={{ lat: Number(map.lat), lng: Number(map.lng) }} >
                      
                      {
                        location ==  `Becil${index}` ? 
                      <InfoWindow>
                        <div>
                          {map.place}
                        </div>
                      </InfoWindow>
                    : null }
                    </Marker>;
                })}
                {others.map((map, index) => {
                    console.log(map);
                    return <Marker icon={{url: marker, scaledSize: new window.google.maps.Size(60, 60),
                      // origin: new window.google.maps.Point(0, 0),
                      // anchor: new window.google.maps.Point(32,65),
                      labelOrigin:  new window.google.maps.Point(35,25),}} onClick={()=>setLocation("Others"+index)}  position={{ lat: Number(map.lat), lng: Number(map.lng) }} >
                      
                      {
                        location ==  `Others${index}` ? 
                      <InfoWindow>
                        <div>
                           {map.place}
                        </div>
                      </InfoWindow>
                    : null }
                    </Marker>;
                })} */}
      </GoogleMap>
    </div>
  )
}
)

export default MyMapComponent
