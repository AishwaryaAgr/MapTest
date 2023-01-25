
import { withScriptjs, withGoogleMap, GoogleMap, Marker , InfoWindow} from "react-google-maps"
import { compose, withProps } from "recompose"
import React, {useState, useEffect} from 'react'
import marker from "./marker.png";
import marker2 from "./marker2.png";
import marker3 from "./marker3.png"
// import { faBus } from "@fortawesome/free-solid-svg-icons";

const MyMapComponent = compose(
    withProps({
      // googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
      // googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZ-LLjEHUXavG3WqTGUB-DpXpEvh-eRhI&v=3.exp&libraries=geometry,drawing,places",
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAGP0yTwZ8BFM1U6vgZ292xZD3p_M13tSI&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `200%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `200%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )(() => {

    const [liveMarkers, setLiveMarkers] = useState([])
    const [location, setLocation] = useState()
    

    const Electriva = [
      {"place": "MAYA PURI TOWARDS PUNJABI BAGH",	"lat":"28.637729	","lng":"77.129314"},
      {"place": "PUNJABI BAGH WEST TOWARDS NETAJI SUBHASH PLACE",	"lat":"28.669995	","lng":"77.138068"},
      {"place": "PUNJABI BAGH WEST TOWARDS DND",	"lat":"28.669927	","lng":"77.138067"},
      {"place": "MAYA PURI TOWARDS DND",	"lat":"28.639195	","lng":"77.129721"},
      {"place": "Nehrunagar Facing DND",	"lat":"28.569325	","lng":"77.253845"},
      {"place": "Lajpat Nagar Facing DND",	"lat":"28.565361	","lng":"77.242855"},
      {"place": "Andrews Ganj facing DND",	"lat":"28.566473	","lng":"77.229749"},
      {"place": "South Extension facing DND",	"lat":"28.56906	","lng":"77.21956"},
      {"place": "Nehrunagar facing Dhaula Kuan ",	"lat":"28.568045	","lng":"77.259835"},
      {"place": "Lajpat nagar Facing Dhaula Kuan ",	"lat":"28.564664	","lng":"77.24145"},
      {"place": "Andrews Ganj facing Dhaula Kuan ",	"lat":"28.56599	","lng":"77.229396"},
      {"place": "South Extension facing Dhaula Kuan ",	"lat":"28.568439	","lng":"77.219615"},
      {"place": "Bhikaji Kama Place facing Dhaula Kuan (Metro)",	"lat":"28.569184	","lng":"77.188833"},
      {"place": "Moti Bag facing Dhaula Kuan",	"lat":"28.570927	","lng":"77.18253"},
      {"place": "Dhaula Kuan/South Campus facing Dhaula kuan",	"lat":"28.590921	","lng":"77.168314"},
      {"place": "Modi Mill okhla facing Modi mill flyover ",	"lat":"28.551784	","lng":"77.264126"},
      {"place": "Nehru place facing Modi mill fly over ",	"lat":"28.547248	","lng":"77.252879"},
      {"place": "Near IIT facing modi mill fly over ",	"lat":"28.548898	","lng":"77.188389"},
      {"place": "Munirka facing modi mill fly over ",	"lat":"28.554953	","lng":"77.177535"},
      {"place": "Malai Mandir facing modi Mill flyover ",	"lat":"28.566207	","lng":"77.166294"},
      {"place": "Modi Mill okhla facing R R Hospital ",	"lat":"28.548706	","lng":"77.259259"},
      {"place": "Nehru place facing R R Hospital",	"lat":"28.547711	","lng":"77.254095"},
      {"place": "Pamposh Enclave facing R R Hospital",	"lat":"28.544623	","lng":"77.247026"},
      {"place": "Masjid Moth facing R R Hospital",	"lat":"28.541214	","lng":"77.234786"},
      {"place": "Pamposh Enclave facing modi mill flyover ",	"lat":"28.543653	","lng":"77.243324"},
      {"place": "Masjid Moth facing modi mill flyover ",	"lat":"28.541814	","lng":"77.232858"},
      {"place": "Soami Nagar facing modi mill flyover",	"lat":"28.542222	","lng":"77.227342"},
      {"place": "Panchsheel facing modi mill flyover ",	"lat":"28.542616	","lng":"77.221787"},
      {"place": "Hauz khas metro station facing modi mill flyover  ",	"lat":"28.543942	","lng":"77.204581"},
      {"place": "Safdarjung facing DND",	"lat":"28.570345	","lng":"77.202277"},
      {"place": "Raj Nagar facing DND",	"lat":"28.570009	","lng":"77.202032"},
      {"place": "Safdarjung facing Dhaula Kuan",	"lat":"28.569084	","lng":"77.204264"},
      {"place": "Moti Bag facing DND ",	"lat":"28.571684	","lng":"77.181287"},
      {"place": "Bhikaji Kama Place facing Dhaula Kuan (Hyatt)",	"lat":"28.569282	","lng":"77.18492"},
      {"place": "Bhikaji Kama Place facing DND",	"lat":"28.5698932	","lng":"77.18819427"},
      {"place": "Pamposh Enclave facing modi mill flyover ",	"lat":"28.543653	","lng":"77.243324"},
      {"place": "Masjid Moth facing modi mill flyover ",	"lat":"28.541814	","lng":"77.232844"},
      {"place": "ESI HOSPITAL TOWARDS DND",	"lat":"28.659159	","lng":"77.129267"},
      {"place": "CARIAPPA VIHAR TOWARDS DND",	"lat":"28.644936	","lng":"77.127446"},
      {"place": "RAJOURI GARDEN TOWARDS PUNJABI BAGH",	"lat":"28.64389	","lng":"77.127124"}
    ]
    let Becil = [
      {"place" : "Max Hospital ( saket)", "lat" : 	28.527181359168495, "lng" : 77.21210188518724},
      {"place" : "Kamal cinema", "lat" : 	28.56526997485881, "lng" : 77.19891103529604},
      {"place" : "Sapna Cinema ", "lat" : 	28.559510375909124, "lng" : 77.24640092566388},
      {"place" : "B-6, Safdarjung ", "lat" : 	28.55918191001921, "lng" : 77.19655972566386},
      {"place" : "PVR Priya ", "lat" : 	28.557540582731658, "lng" : 77.16451842566383},
      {"place" : "Green Park (Chawla)", "lat" : 	28.560193, "lng" : 77.207305},
      {"place" : "Green Park (HOD)", "lat" : 	28.56053555446929, "lng" : 77.20744727738044}
      ]
    
      let others = [
        {"place": "J Block", "lat": 28.5198354, "lng" : 77.2155743},
        {"place": "Malviya nagar-Inderpal singh", "lat": 28.535772, "lng": 77.209421},
        {"place": "Malviya nagar corner market", "lat": 28.538198, "lng": 77.215145}
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
          <div style={{}}>
            <GoogleMap
                defaultZoom={13}
                defaultCenter={{ lat: 28.55135, lng : 77.200075 }}
                >
                {Electriva.map((map, index) => {
                    console.log(map);
                    return <Marker onClick={()=>setLocation("Electriva"+index)} position={{ lat: Number(map.lat), lng: Number(map.lng) }} >
                      {
                        location ==  `Electriva${index}` ? 
                      
                      <InfoWindow>
                        <div>
                          Electriva: {map.place}
                        </div>
                      </InfoWindow>
                    : null }
                    </Marker>;
                })}
                {Becil.map((map, index) => {
                    console.log(map);
                    return <Marker icon={{url: marker, scaledSize: new window.google.maps.Size(60, 60),
                      // origin: new window.google.maps.Point(0, 0),
                      // anchor: new window.google.maps.Point(32,65),
                      labelOrigin:  new window.google.maps.Point(35,25),}} onClick={()=>setLocation("Becil"+index)} position={{ lat: Number(map.lat), lng: Number(map.lng) }} >
                      
                      {
                        location ==  `Becil${index}` ? 
                      <InfoWindow>
                        <div>
                          BECIL: {map.place}
                        </div>
                      </InfoWindow>
                    : null }
                    </Marker>;
                })}
                {others.map((map, index) => {
                    console.log(map);
                    return <Marker icon={{url: marker2, scaledSize: new window.google.maps.Size(35, 40),
                      // origin: new window.google.maps.Point(0, 0),
                      // anchor: new window.google.maps.Point(32,65),
                      labelOrigin:  new window.google.maps.Point(35,25),}} onClick={()=>setLocation("Others"+index)}  position={{ lat: Number(map.lat), lng: Number(map.lng) }} >
                      
                      {
                        location ==  `Others${index}` ? 
                      <InfoWindow>
                        <div>
                          Private: {map.place}
                        </div>
                      </InfoWindow>
                    : null }
                    </Marker>;
                })}
            </GoogleMap>
        </div>
        )
    }
  )

export default MyMapComponent