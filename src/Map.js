import { withScriptjs, withGoogleMap, GoogleMap, Marker , InfoWindow} from "react-google-maps"
import { compose, withProps } from "recompose"
import React, {useState, useEffect} from 'react'
import marker from "./marker.png";
import marker2 from "./marker2.png"
// import { faBus } from "@fortawesome/free-solid-svg-icons";

const MyMapComponent = compose(
    withProps({
      // googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZ-LLjEHUXavG3WqTGUB-DpXpEvh-eRhI&v=3.exp&libraries=geometry,drawing,places",
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
      {"place": " Nehrunagar Facing DND", "lat": 28.569325,"lng": 77.253845},
{"place": "Lajpat Nagar Facing DND", "lat": 28.565361,"lng": 77.242855},
{"place": " Andrews Ganj facing DND", "lat": 28.566473,"lng": 77.229749},
{"place": " South Extension facing DND", "lat": 28.56906,"lng": 77.21956},
{"place": " Nehrunagar facing Dhaula Kuan ", "lat": 28.568045,"lng": 77.259835},
{"place": " Lajpat nagar Facing Dhaula Kuan ", "lat": 28.564664,"lng": 77.24145},
{"place": "Andrews Ganj facing Dhaula Kuan ", "lat": 28.56599,"lng": 77.229396},
{"place": "South Extension facing Dhaula Kuan ", "lat": 28.568439,"lng": 77.219615},
{"place": " Bhikaji Kama Place facing Dhaula Kuan (Metro)", "lat": 28.569184,"lng": 77.188833},
{"place": "Moti Bag facing Dhaula Kuan", "lat": 28.570927,"lng": 77.18253},
{"place": "Dhaula Kuan/South Campus facing Dhaula kuan", "lat": 28.590921,"lng": 77.168314},
{"place": "Modi Mill okhla facing Modi mill flyover ", "lat": 28.551784,"lng": 77.264126},
{"place": "Nehru place facing Modi mill fly over ", "lat": 28.547248,"lng": 77.252879},
{"place": "Near IIT facing modi mill fly over ", "lat": 28.548898,"lng": 77.188389},
{"place": "Munirka facing modi mill fly over ", "lat": 28.554953,"lng": 77.177535},
{"place": " Malai Mandir facing modi Mill flyover ", "lat": 28.566207,"lng": 77.166294},
{"place": "Modi Mill okhla facing R& R Hospital ", "lat": 28.548706,"lng": 77.259259},
{"place": "Nehru place facing R& R Hospital", "lat": 28.547711,"lng": 77.254095},
{"place": " Pamposh Enclave facing R& R Hospital", "lat": 28.544623,"lng": 77.247026},
{"place": "Masjid Moth facing R& R Hospital", "lat": 28.541214,"lng": 77.234786},
{"place": "Pamposh Enclave facing modi mill flyover ", "lat": 28.543653,"lng": 77.243324},
{"place": "Masjid Moth facing modi mill flyover ", "lat": 28.541814,"lng": 77.232858},
{"place": "Soami Nagar facing modi mill flyover", "lat": 28.542222,"lng": 77.227342},
{"place": "Panchsheel facing modi mill flyover ", "lat": 28.542616,"lng": 77.221787},
{"place": " Hauz khas metro station facing modi mill flyover  ", "lat": 28.543942,"lng": 77.204581},
{"place": "Safdarjung facing DND", "lat": 28.570345,"lng": 77.202277},
{"place": " Raj Nagar facing DND", "lat": 28.570009,"lng": 77.202032},
{"place": "Safdarjung facing Dhaula Kuan", "lat": 28.569084,"lng": 77.204264},
{"place": "Moti Bag facing DND ", "lat": 28.571684,"lng": 77.181287},
{"place": " Bhikaji Kama Place facing Dhaula Kuan (Hyatt)", "lat": 28.569282,"lng": 77.18492},
{"place": "Bhikaji Kama Place facing DND", "lat": 28.5698932,"lng": 77.18819427},
{"place": " Rajauri garden Market (B.K.Dutta Market)", "lat": 28.647521,"lng": 77.119394},
{"place": "MAYA PURI TOWARDS PUNJABI BAGH", "lat": 28.637729,"lng": 77.129314},
{"place": "PUNJABI BAGH WEST TOWARDS NETAJI SUBHASH PLACE", "lat": 28.669995,"lng": 77.138068},
{"place": "PUNJABI BAGH WEST TOWARDS DND", "lat": 28.669927,"lng": 77.138067},
{"place": "MAYA PURI TOWARDS DND", "lat": 28.639195,"lng": 77.129721},
{"place": "RAJOURI GARDEN TOWARDS PUNJABI BAGH", "lat": 28.64389,"lng": 77.127124},
{"place": "MAYA PURI TOWARDS PUNJABI BAGH", "lat": 28.637729,"lng": 77.129314},
{"place": "PUNJABI BAGH WEST TOWARDS NETAJI SUBHASH PLACE", "lat": 28.669995,"lng": 77.138068},
{"place": "PUNJABI BAGH WEST TOWARDS DND", "lat": 28.669927,"lng": 77.138067},
{"place": "MAYA PURI TOWARDS DND", "lat": 28.639195,"lng": 77.129721},
{"place": "RAJOURI GARDEN TOWARDS PUNJABI BAGH", "lat": 28.64389,"lng": 77.127124}
    ]
    let EL2 = [
      {"place": " Vikas Puri Market ( PVR Sonia Vikas Puri)", "lat": 28.638996,"lng": 77.075209},
{"place": " Punjabi Bag Market (Punjabi bagh Central Market)", "lat": 28.670491,"lng": 77.133516},
{"place": "Subhash Nagar ( Tilak Nagar Market)", "lat": 28.637258,"lng": 77.096853},
{"place": " RK Puram Market (PVR SANGAM)", "lat": 28.57276,"lng": 77.173787},
{"place": " Vasant Vihar Maket (infront of Vasant Square Mall)", "lat": 28.524155,"lng": 77.156224},
{"place": "ESI HOSPITAL TOWARDS PUNJABI BAGH", "lat": 28.658568,"lng": 77.128799},
{"place": "ESI HOSPITAL TOWARDS DND", "lat": 28.659159,"lng": 77.129267},
{"place": "SARAI KALE KHAN TOWARDS RAJGHAT (Ring Road/MG Road)", "lat": 28.593212,"lng": 77.256974},
{"place": "ITO TOWARDS ASHRAM (Ring Road/MG Road)", "lat": 28.623997,"lng": 77.247688},
{"place": " INDRAPRASTHA TOWARDS ASHRAM ( Ring Road/MG Road)", "lat": 28.608747,"lng": 77.252867},
{"place": "SARAI KALE KHAN TOWARDS ASHRAM ( Ring Road/MG Road)", "lat": 28.589354,"lng": 77.258956},
{"place": "CARIAPPA VIHAR TOWARDS DND", "lat": 28.644936,"lng": 77.127446},
{"place": "NARAINA VIHAR TOWARDS DND", "lat": 28.627432,"lng": 77.133582},
{"place": "Madhuban chowk facing Janakpuri", "lat": 28.70619,"lng": 77.13339},
{"place": "West enclave pitampura facing janakpuri", "lat": 28.69258,"lng": 77.10002},
{"place": "Pashchim vihar facing janakpuri opp raddission blue hotel", "lat": 28.66676,"lng": 77.09275},
{"place": "State bank nagar paschim vihar facing janakpuri", "lat": 28.66052,"lng": 77.09167},
{"place": "ESI HOSPITAL TOWARDS PUNJABI BAGH", "lat": 28.658568,"lng": 77.128799},
{"place": "ESI HOSPITAL TOWARDS DND", "lat": 28.659159,"lng": 77.129267},
{"place": "SARAI KALE KHAN TOWARDS RAJGHAT (Ring Road/MG Road)", "lat": 28.593212,"lng": 77.256974},
{"place": "ITO TOWARDS ASHRAM (Ring Road/MG Road)", "lat": 28.623997,"lng": 77.247688},
{"place": " INDRAPRASTHA TOWARDS ASHRAM ( Ring Road/MG Road)", "lat": 28.608747,"lng": 77.252867},
{"place": "SARAI KALE KHAN TOWARDS ASHRAM ( Ring Road/MG Road)", "lat": 28.589354,"lng": 77.258956},
{"place": "CARIAPPA VIHAR TOWARDS DND", "lat": 28.644936,"lng": 77.127446},
{"place": "NARAINA VIHAR TOWARDS DND", "lat": 28.627432,"lng": 77.133582},
{"place": "RAJOURI GARDEN TOWARDS DND", "lat": 28.642694,"lng": 77.128332},
{"place": " INDRAPRASTHA TOWARDS RAJGHAT ( Ring Road /MG Road)", "lat": 28.602828,"lng": 77.255782},
{"place": "NARAINA VIHAR TOWARDS PUNJABI BAGH", "lat": 28.615597,"lng": 77.136371},
{"place": "ITO TOWARDS RAJGHAT (Ring Road/MG Road)", "lat": 28.617945,"lng": 77.2488},
{"place": "chattarpur opposite metro station facing gurgoan MG rd", "lat": 28.504102,"lng": 77.171702},
{"place": "Sultanpur metro station Near Delhi mohalla clinic Facing gurgoan MG rd.", "lat": 28.499535,"lng": 77.163101},
{"place": "Sultanpur near bus stop Facing Delhi MG rd.", "lat": 28.498235,"lng": 77.15961},
{"place": "Chattarpur Near OICL pump facing delhi MG rd.", "lat": 28.503436,"lng": 77.172147},
{"place": "Saket metro station Facing badarpur Rd.", "lat": 28.520346,"lng": 77.20211},
{"place": "Hamdard nagar near Hamdard university facing Badarpur rd.", "lat": 28.512489,"lng": 77.250983},
{"place": "Jasola Infront of Apolo Hospital infront of District park Badarpur Rd", "lat": 28.639417,"lng": 77.283137},
{"place": "Jasola in between IGL and IOCL Noida Rd.", "lat": 28.538418,"lng": 77.289877},
{"place": "Mohan cooperative infront of Volvo Ashram Rd.", "lat": 28.516536,"lng": 77.295676},
{"place": "Jasola infront of South delhi police housing resident Ashram Rd.", "lat": 28.5412,"lng": 77.280916},
{"place": "Nizamuddin infront of police station Indiagate Rd.", "lat": 28.592716,"lng": 77.248784},
{"place": "Nizamuddin near bus stop Badarpur Rd.", "lat": 28.591529,"lng": 77.244734},
{"place": "Community center NFC SDMC car parking ", "lat": 28.56128,"lng": 77.268524},
{"place": "saket infront of District Court Malviye nagar Rd.", "lat": 28.6013,"lng": 77.026722},
{"place": "Community center Saket", "lat": 28.522814,"lng": 77.207268},
{"place": "Jasola Mall Opposite Modi Tower", "lat": 28.538325,"lng": 77.287956},
{"place": "Dwarka sec-12 opposite Redision blue", "lat": 28.594964,"lng": 77.037101},
{"place": "Main Rajapuri rd.Infront of HDFC bank", "lat": 28.602897,"lng": 77.056774},
{"place": "Dwarka Sec-06 Market", "lat": 28.590997,"lng": 77.058956},
{"place": "Dwarka Sec-10 Market", "lat": 28.590787,"lng": 77.057889},
{"place": "Dwarka Sec-11 Pocket-01 market opposite Aggarwal Mall", "lat": 28.596063,"lng": 77.049926},
{"place": "dwarka Sector-05 Pocket-01 market Infront of Aggarwal mall", "lat": 28.559744,"lng": 77.174559},
{"place": "Dwarka sec-11 pocket-04 infront of Sudeep plaza", "lat": 28.587232,"lng": 77.043001},
{"place": "Dwarka sector -14 SDMC parking Metro ", "lat": 28.602462,"lng": 77.026318},
{"place": "Dwarka sec-11 infront of Metro Station", "lat": 28.587436,"lng": 77.049111},
{"place": "Dwarka sec-08 infront of Metro Station", "lat": 28.565169,"lng": 77.066922},
{"place": "Dwarka sec-23 Market", "lat": 28.565139,"lng": 77.066779},
{"place": "Dwarka sec-07 Market", "lat": 28.583706,"lng": 77.071864},
{"place": "Dwarka sec-07 Pocket -01 opposite maharaja agersen hospital", "lat": 28.593503,"lng": 77.077079},
{"place": "Dwarka sec-09 infront of indira gandhi hospital", "lat": 28.593411,"lng": 77.07701},
{"place": "Dwarka sec-13 infront of metro SDMC parking ", "lat": 28.597132,"lng": 77.032928},
{"place": "Dwarka sec-14 Vegas Mall ", "lat": 28.601456,"lng": 77.030551},
{"place": "Dwarka sec-12 infront of Eross Mall ", "lat": 28.6013,"lng": 77.026722},
{"place": "Dwarka sec-21 Infront of Pecific Mall", "lat": 28.551809,"lng": 77.056898},
{"place": "Dwarka sec-01 pocket- 2 infront of police station ", "lat": 28.595063,"lng": 77.071947},
{"place": "Dwarka sec-12 city market SDMC car parking (BSES Already installed combo Charger 142KW)", "lat": 28.549012,"lng": 77.229217},
{"place": "Benito Juarez Marg, Nanak Pura South Moti Bagh (Road- 01)", "lat": 28.582763,"lng": 77.075209},
{"place": "Benito Juarez Marg, Nanak Pura South Moti Bagh Near- West End Colony(Road - 01)", "lat": 28.575595,"lng": 77.164117},
{"place": "North West Moti Bagh Near Moti bagh Metro station (road - 02)", "lat": 28.578038,"lng": 77.174545},
{"place": "North West Moti Bagh Near SDMC Toilet (road - 02)", "lat": 28.572263,"lng": 77.16237},
{"place": "Sector-01 RK Puram near Muhamadpur Red Light (road - 03)", "lat": 28.564455,"lng": 77.180414},
{"place": "Sector-05 RK Puram Near SDMC Dalao (road - 03)", "lat": 28.559744,"lng": 77.174559},
{"place": "Sector -02 RK Puram Near Rama Krishna puram society (road -04)", "lat": 28.558092,"lng": 77.186833},
{"place": "Sector -02 RK Puram Facing Rama Krishna puram  (road -04)", "lat": 28.556701,"lng": 77.186355},
{"place": "Sheikh Sarai Phase -02 sector 7  Near Sheikh Sarai Red light (road - 10)", "lat": 28.532793,"lng": 77.23197},
{"place": "Madangir village,near Phusp Vihar  (road- 10)", "lat": 28.52435,"lng": 77.230378},
{"place": "Gurudwara Rd, Sector -03 , Near JJ Colony (road - 10)", "lat": 28.517744,"lng": 77.227274},
{"place": " Madangir Village  Opposite NCB Office (road-10)", "lat": 28.519733,"lng": 77.228062},
{"place": "Hauj Khas Near Metro Station", "lat": 28.543756,"lng": 77.204659},
{"place": "Mayfair Gardens Near The Mother internation School (road-09)", "lat": 28.544053,"lng": 77.204494},
{"place": "Qutab Park, Near Qutub Minar  ( road- 11)", "lat": 28.526028,"lng": 77.187708},
{"place": "Qutab Park, Near Qutub Minar  ( road- 11)", "lat": 28.52592,"lng": 77.187398},
{"place": "Sarvoday Enclave Near Adhchini ( road- 09)", "lat": 28.539086,"lng": 77.199438},
{"place": "Greater Kailash-1, Near shri Fort Park (road-07)", "lat": 28.549012,"lng": 77.229217},
{"place": "Lotus temple (road-08) car parking", "lat": 28.555829,"lng": 77.258445},
{"place": "Hauj Khas Near Post office (road-05)", "lat": 28.540061,"lng": 77.198875},
{"place": "Ghitorni Metro station Facing Gurgoan MG Rd.", "lat": 28.49329,"lng": 77.14833},
{"place": "Ghitorni Metro station Near Bus Stop Facing Delhi  MG Rd.", "lat": 28.49398,"lng": 77.14911},
{"place": "Arjangarh metro Station facing gurgoan MG Rd.", "lat": 28.48014,"lng": 77.12523},
{"place": "Arjangarh metro Station facing Delhi MG Rd.", "lat": 28.48074,"lng": 77.12546},
{"place": "Okhla Phase-01 Circle opposite Crown Plaza Kalkaji mandir rd.", "lat": 28.528906,"lng": 77.270726},
{"place": "Govindpuri metro Kalkaji rd.", "lat": 28.543076,"lng": 77.263604},
{"place": "Delhi metro housing Ali Extension Badarpur rd.", "lat": 28.52269,"lng": 77.294638},
{"place": "Hauj Rani near Malviya nagar metro", "lat": 28.529039,"lng": 77.214434},
{"place": "Josip Broz Tito Marg GK Enclave-01 Near Indian Oil petrol Pump (road - 07)", "lat": 28.547846,"lng": 77.228848},
{"place": "Seth sarai Near National Institute of TB and respiratory diseases (road-09)", "lat": 28.528691,"lng": 77.190109},
{"place": "South Extension Uday Park Infront of hudco center (road-06)", "lat": 28.563634,"lng": 77.223105},
{"place": "Mayapuri Industrial Area Near SBI bank Mayapuri Rd.", "lat": 28.61754,"lng": 77.11136},
{"place": "Delhi cantt Jail Rd Near Brahmos Aerospace Bus stop Pankha Rd.", "lat": 28.60463,"lng": 77.12839},
{"place": "Better Place Mall Pankha Rd.", "lat": 28.6126,"lng": 77.08822},
{"place": "Krishna park facing Haiderpur", "lat": 28.63956,"lng": 77.08169},
{"place": "Madhuban chowk facing Janakpuri", "lat": 28.70619,"lng": 77.13339},
{"place": "West enclave pitampura facing janakpuri", "lat": 28.69258,"lng": 77.10002},
{"place": "Pashchim vihar facing janakpuri opp raddission blue hotel", "lat": 28.66676,"lng": 77.09275},
{"place": "State bank nagar paschim vihar facing janakpuri", "lat": 28.66052,"lng": 77.09167},
{"place": "Mahavir nagar tilak nagar facing janakpuri", "lat": 28.63166,"lng": 77.08137},
{"place": "Shakarpur metro facing Azadpur", "lat": 28.68551,"lng": 77.14954},
{"place": "NSP facing Azadpur", "lat": 28.69168,"lng": 77.15332},
{"place": "Shalimar bagh metro station facing dhaula kuan", "lat": 28.70236,"lng": 77.16641},
{"place": "Punjabi bagh metro station facing liberty cinema", "lat": 28.67295,"lng": 77.14471},
{"place": "Punjabi bagh metro towards mundka", "lat": 28.672769,"lng": 77.147112},
{"place": "Bhartiya vidyapeeth college near madipur metro towards mundka", "lat": 28.676268,"lng": 77.113955},
{"place": "Shivaji park metro near Punjabi bagh police station towards mundka", "lat": 28.674587,"lng": 77.132125},
{"place": "Dda market near teachers colony pashchim vihar", "lat": 28.662394,"lng": 77.10052},
{"place": "Maharaja surajmal stadium metro station towards karolbagh", "lat": 28.68217,"lng": 77.074094},
{"place": "Paschim vihar east metro station towards karolbagh", "lat": 28.677569,"lng": 77.111716},
{"place": "Ndmc parking shivaji metro station towards karolbagh", "lat": 28.674947,"lng": 77.132351},
{"place": "Subhadra colony towards azadpur", "lat": 28.671072,"lng": 77.184039},
{"place": "Railway colony ashok vihar phase 3 towards azadpur", "lat": 28.686469,"lng": 77.178298},
{"place": "Vidhan sabha metro towards azadpur", "lat": 28.688641,"lng": 77.221247},
{"place": "Opposite to vallabah bhai patel chest institute north university campus", "lat": 28.691483,"lng": 77.209236},
{"place": "Opposite to Daulat ram college gate no.2", "lat": 28.688611,"lng": 77.206748},
{"place": "Model town in front of chatrsal stadium toward azadpur", "lat": 28.704726,"lng": 77.18868}
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
                {EL2.map((map, index) => {
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
                
            </GoogleMap>
        </div>
        )
    }
  )

export default MyMapComponent
