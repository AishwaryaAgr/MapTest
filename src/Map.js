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

  let NCR = [

    { "place": " RK Puram Market (PVR SANGAM)", "lat": 28.57276, "lng": 77.173787 },
    { "place": " Vasant Vihar Maket (infront of Vasant Square Mall)", "lat": 28.524155, "lng": 77.156224 },
    { "place": "South Extension facing Dhaula Kuan ", "lat": 28.568439, "lng": 77.219615 },
    { "place": "Moti Bag facing Dhaula Kuan", "lat": 28.570927, "lng": 77.18253 },
    { "place": "Dhaula Kuan/South Campus facing Dhaula kuan", "lat": 28.590921, "lng": 77.168314 },
    { "place": " Andrews Ganj facing DND", "lat": 28.566473, "lng": 77.229749 },
    { "place": "Andrews Ganj facing Dhaula Kuan ", "lat": 28.56599, "lng": 77.229396 },
    { "place": "Lajpat Nagar Facing DND", "lat": 28.565361, "lng": 77.242855 },
    { "place": " Lajpat nagar Facing Dhaula Kuan ", "lat": 28.564664, "lng": 77.24145 },
    { "place": "Nehru place facing Modi mill fly over ", "lat": 28.547248, "lng": 77.252879 },
    { "place": "Nehru place facing R& R Hospital", "lat": 28.547711, "lng": 77.254095 },
    { "place": " Pamposh Enclave facing R& R Hospital", "lat": 28.544623, "lng": 77.247026 },
    { "place": "Pamposh Enclave facing modi mill flyover ", "lat": 28.543653, "lng": 77.243324 },
    { "place": "Masjid Moth facing R& R Hospital", "lat": 28.541214, "lng": 77.234786 },
    { "place": "Masjid Moth facing modi mill flyover ", "lat": 28.541814, "lng": 77.232858 },
    { "place": "ITO Towards Ashram  (ring road /MG road)", "lat": 28.623997, "lng": 77.247688 },
    { "place": "Indraprastha Towards Ashram   (ring road /MG road)", "lat": 28.608747, "lng": 77.252867 },
    { "place": "sarai kale khan towards ashram (ring road /MG road)", "lat": 28.589354, "lng": 77.258956 },
    { "place": "Benito Juarez Marg, Nanak Pura South Moti Bagh (Road- 01)", "lat": 28.582763, "lng": 77.075209 },
    { "place": "Benito Juarez Marg, Nanak Pura South Moti Bagh Near- West End Colony(Road - 01)", "lat": 28.575595, "lng": 77.164117 },
    { "place": "North West Moti Bagh Near Moti bagh Metro station (road - 02)", "lat": 28.578038, "lng": 77.174545 },
    { "place": "North West Moti Bagh Near SDMC Toilet (road - 02)", "lat": 28.572263, "lng": 77.16237 },
    { "place": "Sector-01 RK Puram near Muhamadpur Red Light (road - 03)", "lat": 28.564455, "lng": 77.180414 },
    { "place": "Sector-05 RK Puram Near SDMC Dalao (road - 03)", "lat": 28.559744, "lng": 77.174559 },
    { "place": "Sector -02 RK Puram Near Rama Krishna puram society (road -04)", "lat": 28.558092, "lng": 77.186833 },
    { "place": "Sector -02 RK Puram Facing Rama Krishna puram  (road -04)", "lat": 28.556701, "lng": 77.186355 },
    { "place": "Sheikh Sarai Phase -02 sector 7  Near Sheikh Sarai Red light (road - 10)", "lat": 28.532793, "lng": 77.23197 },
    { "place": "Madangir village,near Phusp Vihar  (road- 10)", "lat": 28.52435, "lng": 77.230378 },
    { "place": "Gurudwara Rd, Sector -03 , Near JJ Colony (road - 10)", "lat": 28.517744, "lng": 77.227274 },
    { "place": " Madangir Village  Opposite NCB Office (road-10)", "lat": 28.519733, "lng": 77.228062 },
    { "place": "Hauj Khas Near Metro Station", "lat": 28.543756, "lng": 77.204659 },
    { "place": "Mayfair Gardens Near The Mother internation School (road-09)", "lat": 28.544053, "lng": 77.204494 },
    { "place": "Qutab Park, Near Qutub Minar  ( road- 11)", "lat": 28.526028, "lng": 77.187708 },
    { "place": "Qutab Park, Near Qutub Minar  ( road- 11)", "lat": 28.52592, "lng": 77.187398 },
    { "place": "Sarvoday Enclave Near Adhchini ( road- 09)", "lat": 28.539086, "lng": 77.199438 },
    { "place": "Greater Kailash-1, Near shri Fort Park (road-07)", "lat": 28.549012, "lng": 77.229217 },
    { "place": "Lotus temple (road-08) car parking", "lat": 28.555829, "lng": 77.258445 },
    { "place": "Ghitorni metro facing Gurgaon MG road", "lat": 28.49329, "lng": 77.14833 },
    { "place": "Ghitorni metro facing Delhi MG road", "lat": 28.49398, "lng": 77.14911 },
    { "place": "Arjangarh metro facing gurgaon MG road", "lat": 28.48014, "lng": 77.12523 },
    { "place": "Arjangarh metro facing Delhi MG road", "lat": 28.48074, "lng": 77.12546 },
    { "place": "Hauj Khas Near Post office (road-05)", "lat": 28.540061, "lng": 77.198875 },
    { "place": "chattarpur opposite metro station facing gurgoan MG rd", "lat": 28.504102, "lng": 77.171702 },
    { "place": "Chattarpur Near OICL pump facing delhi MG rd.", "lat": 28.503436, "lng": 77.172147 },
    { "place": "Sultanpur metro facing Delhi mohalla clinic facing Gurgaon MG road", "lat": 28.499535, "lng": 77.163101 },
    { "place": "Sultanpur near bus stand facing Delhi MG road", "lat": 28.498235, "lng": 77.15961 },
    { "place": "Saket metro station Facing badarpur Rd.", "lat": 28.520346, "lng": 77.20211 },
    { "place": "Hamdard nagar near Hamdard university facing Badarpur rd.", "lat": 28.512489, "lng": 77.250983 },
    { "place": "Jasola Infront of Apolo Hospital infront of District park Badarpur Rd", "lat": 28.639417, "lng": 77.283137 },
    { "place": "Jasola in between IGL and IOCL Noida Rd.", "lat": 28.538418, "lng": 77.289877 },
    { "place": "Mohan cooperative infront of Volvo Ashram Rd.", "lat": 28.516536, "lng": 77.295676 },
    { "place": "Jasola infront south delhi police housing residence ashram road", "lat": 28.5412, "lng": 77.280916 },
    { "place": "Nizamuddin infront of police station Indiagate Rd.", "lat": 28.592716, "lng": 77.248784 },
    { "place": "Nizamuddin near bus stop Badarpur Rd.", "lat": 28.591529, "lng": 77.244734 },
    { "place": "Community center NFC SDMC car parking ", "lat": 28.56128, "lng": 77.268524 },
    { "place": "saket infront of District Court Malviye nagar Rd.", "lat": 28.6013, "lng": 77.026722 },
    { "place": "Community center Saket", "lat": 28.522814, "lng": 77.207268 },
    { "place": "Jasola Mall Opposite Modi Tower", "lat": 28.538325, "lng": 77.287956 },
    { "place": "Okhla Phase-01 Circle opposite Crown Plaza Kalkaji mandir rd.", "lat": 28.528906, "lng": 77.270726 },
    { "place": "Govindpuri metro kalkaji road", "lat": 28.543076, "lng": 77.263604 },
    { "place": "Delhi metro housing Ali Extension Badarpur rd.", "lat": 28.52269, "lng": 77.294638 },
    { "place": "Hauj Rani near Malviya nagar metro", "lat": 28.529039, "lng": 77.214434 },
    { "place": "Josip Broz Tito Marg GK Enclave-01 Near Indian Oil petrol Pump (road - 07)", "lat": 28.547846, "lng": 77.228848 },
    { "place": "Seth sarai Near National Institute of TB and respiratory diseases (road-09)", "lat": 28.528691, "lng": 77.190109 },
    { "place": "South extension Uday park infrontof hudco centre", "lat": 28.563634, "lng": 77.223105 },
    { "place": "Mayapuri industrial area near SBI bank mayapuri road", "lat": 28.61754, "lng": 77.11136 },
    { "place": "Delhi cantt jail road near brahmos aerospace bus stop pankha road", "lat": 28.60463, "lng": 77.12849 },
    { "place": "Better place mall pankha road", "lat": 28.6126, "lng": 77.08822 },
    { "place": "Krishna park facing Haiderpur", "lat": 28.63956, "lng": 77.08169 },
    { "place": "Madhuban chowk facing Janakpuri", "lat": 28.70619, "lng": 77.13339 },
    { "place": "West enclave pitampura facing janakpuri", "lat": 28.69258, "lng": 77.10002 }
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
        defaultCenter={{ "lat": 28.556701, "lng": 77.186355 }}
      >
        {NCR.map((map, index) => {
          console.log(map);
          return <Marker icon={{
            url: marker2, scaledSize: new window.google.maps.Size(36, 39),
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
