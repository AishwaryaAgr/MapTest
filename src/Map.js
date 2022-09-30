import { withScriptjs, withGoogleMap, GoogleMap, Marker , InfoWindow} from "react-google-maps"
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
    const [location, setLocation] = useState()
    

    const points = [
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
                    return <Marker onClick={()=>setLocation(index)} position={{ lat: Number(map.lat), lng: Number(map.lng) }} >
                      {
                        index == location ? 
                      
                      <InfoWindow>
                        <div>
                          {map.place}
                        </div>
                      </InfoWindow>
                    : null }
                    </Marker>;
                })}
            </GoogleMap>
            <div>{location}</div>
        </>
        )
    }
  )

export default MyMapComponent
