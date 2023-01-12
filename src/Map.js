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

      {"place": "Baaz Maintenance Hub", "lat": "28.536472" ,"lng":"77.226619"},
      // {"place": "MAYA PURI TOWARDS PUNJABI BAGH",	"lat":"28.637729	","lng":"77.129314"},
      // {"place": "PUNJABI BAGH WEST TOWARDS NETAJI SUBHASH PLACE",	"lat":"28.669995	","lng":"77.138068"},
      // {"place": "PUNJABI BAGH WEST TOWARDS DND",	"lat":"28.669927	","lng":"77.138067"},
      // {"place": "MAYA PURI TOWARDS DND",	"lat":"28.639195	","lng":"77.129721"},
      // {"place": "Nehrunagar Facing DND",	"lat":"28.569325	","lng":"77.253845"},
      // {"place": "Andrews Ganj facing DND",	"lat":"28.566473	","lng":"77.229749"},
      // {"place": "South Extension facing DND",	"lat":"28.56906	","lng":"77.21956"},
      // {"place": "Nehrunagar facing Dhaula Kuan ",	"lat":"28.568045	","lng":"77.259835"},
      // {"place": "Andrews Ganj facing Dhaula Kuan ",	"lat":"28.56599	","lng":"77.229396"},
      // {"place": "South Extension facing Dhaula Kuan ",	"lat":"28.568439	","lng":"77.219615"},
      // {"place": "Bhikaji Kama Place facing Dhaula Kuan (Metro)",	"lat":"28.569184	","lng":"77.188833"},
      // {"place": "Moti Bag facing Dhaula Kuan",	"lat":"28.570927	","lng":"77.18253"},
      // {"place": "Dhaula Kuan/South Campus facing Dhaula kuan",	"lat":"28.590921	","lng":"77.168314"},
      // {"place": "Modi Mill okhla facing Modi mill flyover ",	"lat":"28.551784	","lng":"77.264126"},
      // {"place": "Near IIT facing modi mill fly over ",	"lat":"28.548898	","lng":"77.188389"},
      // {"place": "Malai Mandir facing modi Mill flyover ",	"lat":"28.566207	","lng":"77.166294"},
      // {"place": "Modi Mill okhla facing R R Hospital ",	"lat":"28.548706	","lng":"77.259259"},
      // {"place": "Nehru place facing R R Hospital",	"lat":"28.547711	","lng":"77.254095"},
      // {"place": "Pamposh Enclave facing R R Hospital",	"lat":"28.544623	","lng":"77.247026"},
      // {"place": "Masjid Moth facing R R Hospital",	"lat":"28.541214	","lng":"77.234786"},
      // {"place": "Pamposh Enclave facing modi mill flyover ",	"lat":"28.543653	","lng":"77.243324"},
      // {"place": "Masjid Moth facing modi mill flyover ",	"lat":"28.541814	","lng":"77.232858"},
      // {"place": "Soami Nagar facing modi mill flyover",	"lat":"28.542222	","lng":"77.227342"},
      // {"place": "Panchsheel facing modi mill flyover ",	"lat":"28.542616	","lng":"77.221787"},
      // {"place": "Safdarjung facing DND",	"lat":"28.570345	","lng":"77.202277"},
      // {"place": "Raj Nagar facing DND",	"lat":"28.570009	","lng":"77.202032"},
      // {"place": "Safdarjung facing Dhaula Kuan",	"lat":"28.569084	","lng":"77.204264"},
      // {"place": "Moti Bag facing DND ",	"lat":"28.571684	","lng":"77.181287"},
      // {"place": "Bhikaji Kama Place facing Dhaula Kuan (Hyatt)",	"lat":"28.569282	","lng":"77.18492"},
      // {"place": "Bhikaji Kama Place facing DND",	"lat":"28.5698932	","lng":"77.18819427"},
      // {"place": "Pamposh Enclave facing modi mill flyover ",	"lat":"28.543653	","lng":"77.243324"},
      // {"place": "Masjid Moth facing modi mill flyover ",	"lat":"28.541814	","lng":"77.232844"},
      // {"place": "ESI HOSPITAL TOWARDS DND",	"lat":"28.659159	","lng":"77.129267"},
      // {"place": "CARIAPPA VIHAR TOWARDS DND",	"lat":"28.644936	","lng":"77.127446"},
      // {"place": "RAJOURI GARDEN TOWARDS PUNJABI BAGH",	"lat":"28.64389	","lng":"77.127124"}
    ]



    let Becil = [
      
      // {"place" : "Kamal cinema", "lat" : 	28.56526997485881, "lng" : 77.19891103529604},
      // {"place" : "Sapna Cinema ", "lat" : 	28.559510375909124, "lng" : 77.24640092566388},
      // // Ravindra Dhaba 28.56564359652041, 77.19932942691037 --
      // {"place" : "PVR Priya ", "lat" : 	28.557540582731658, "lng" : 77.16451842566383},
      // {"place" : "Green Park (Chawla)", "lat" : 	28.560193, "lng" : 77.207305},
      // {"place" : "Green Park (HOD)", "lat" : 	28.56053555446929, "lng" : 77.20744727738044},
      // {"place": "Tyre Czar", "lat": 28.53638238593784, "lng": 77.20924231341678}
      ]

      let Blinkit = [
        {"place": "Super Store Delhi GK2 ES3","lat":	28.52812074766001, "lng": 77.2458265202614},
        {"place": "Super Store Delhi Malviya Nagar ES38","lat":	28.53224243973015, "lng": 77.21330685583331},
        {"place": "Super Store Delhi Vasant Kunj ES35","lat":	28.52540989528566, "lng": 77.15444501283176},
        {"place": "Super Store Delhi Lajpat Nagar ES37","lat":	28.57561646115325, "lng": 77.24278735649168},
        {"place": "Super Store Delhi Gautam Nagar ES15","lat":	28.562533917868816, "lng": 77.21100138815646},
        {"place": "Super Store Delhi Ashram ES24 PR","lat":	28.576230, "lng": 77.255223},
        {"place": "Super Store Delhi Sangam Vihar ES39 PR","lat":	28.500787, "lng": 77.235064},
        {"place": "Super Store Delhi Jamia ES58 PR","lat":	28.553500,"lng": 77.299111},
        {"place": "Super Store Delhi Panchsheel Vihar ES64","lat":	28.533888, "lng": 77.219093},
        {"place": "Super Store Delhi Sarita Vihar ES81","lat":	28.537580, "lng": 77.300141},
        {"place": "Super Store Delhi Neb Sarai ES43 PR","lat":	28.511313, "lng": 77.202132},
        {"place": "Super Store Delhi Sant Nagar ES70","lat":	28.555925495111932, "lng": 77.24909109762488},
        {"place": "Super Store Delhi Defence Colony ES71","lat":	28.573120, "lng": 77.227800},
        {"place": "Super Store Delhi Prahladpur ES79","lat":	28.499667879069197, "lng": 77.29028212707135},
        {"place": "Super Store Delhi Mahipalpur ES34","lat":	28.541341,"lng": 77.129294},
        {"place": "Super Store Delhi SSN Marg ES82","lat":	28.496214279436945, "lng": 77.18475645651898},
        {"place": "Super Store Delhi Govindpuri ES144 PR","lat":	28.532366867739867, "lng": 77.26705796389156},
        {"place": "Super Store Delhi Green Park Extn ES97 PR","lat":	28.557824, "lng": 77.205225},
        {"place": "Super Store Delhi Hauz Khas ES106 PR","lat":	28.551040, "lng": 77.204775},
        {"place": "Super Store Delhi Basant Gaon ES154 PR","lat":	28.574146736126846, "lng": 77.16131842316497},
        {"place": "Super Store Delhi RK Puram Sector-12 ES117 PR","lat":	28.574286815500358, "lng": 77.17598279758784},
        {"place": "Super Store Delhi NFC ES48 ","lat":	28.571179, "lng": 77.275827},
        {"place": "Super Store Delhi Chattarpur ES181","lat":	28.495470, "lng": 77.184882}
      ]
    
      let others = [
      //   {"place": "Nehru Enclave Neeche", "lat": 28.540152, "lng": 77.249026},
      //   {"place": "Nehru Enclave Upar", "lat": 28.555394810823778, "lng": 77.24198231956211},
        // {"place": "Chattarpur", "lat": 28.506208, "lng": 77.185101},
      //   {"place": "Vasant Kunj", "lat": 28.527887944330118, "lng": 77.15073576451272},
      //   {"place": "Rajinder Da Dhaba", "lat": 28.56564359652041, "lng": 77.19932942691037},
      //   {"place": "Lajpat Nagar Facing DND",	"lat":"28.565361	","lng":"77.242855"},
      // {"place": "Lajpat nagar Facing Dhaula Kuan ",	"lat":"28.564664	","lng":"77.24145"},
      // {"place": "Nehru place facing Modi mill fly over ",	"lat":"28.547248	","lng":"77.252879"}, 
      // {"place": "Munirka facing modi mill fly over ",	"lat":"28.554953	","lng":"77.177535"}, 
      // {"place": "Hauz khas metro station facing modi mill flyover  ",	"lat":"28.543942	","lng":"77.204581"}, 
      // {"place" : "B-6, Safdarjung ", "lat" : 	28.55918191001921, "lng" : 77.19655972566386}, 
      {"place" : "Baaz Bikes Office", "lat" :  28.518040	, "lng" : 77.199320},
      {"place" : "Max Hospital ( saket)", "lat" : 	28.527181359168495, "lng" : 77.21210188518724},
      // {"place" : "Green Park (HOD)", "lat" : 	28.56053555446929, "lng" : 77.20744727738044},
      {"place": "Tyre Czar", "lat": 28.53638238593784, "lng": 77.20924231341678},
      {"place": "Masjid Moth facing modi mill flyover ",	"lat":"28.541814	","lng":"77.232858"},
      {"place": "South Extension facing Dhaula Kuan ",	"lat":"28.568439	","lng":"77.219615"},
      
        
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
                    return <Marker icon={{url: marker3, scaledSize: new window.google.maps.Size(25, 40),
                      // origin: new window.google.maps.Point(0, 0),
                      // anchor: new window.google.maps.Point(32,65),
                      labelOrigin:  new window.google.maps.Point(35,25),}} onClick={()=>setLocation("Electriva"+index)} position={{ lat: Number(map.lat), lng: Number(map.lng) }} >
                      {
                        location ==  `Electriva${index}` ? 
                      
                      <InfoWindow>
                        <div>
                          {map.place}
                        </div>
                      </InfoWindow>
                    : null }
                    </Marker>;
                })}
                {Blinkit.map((map, index) => {
                    console.log(map);
                    return <Marker icon={{url: marker2, scaledSize: new window.google.maps.Size(28, 32),
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
                })}
            </GoogleMap>
        </div>
        )
    }
  )

export default MyMapComponent
