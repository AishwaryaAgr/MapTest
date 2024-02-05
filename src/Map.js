import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { compose, withProps } from "recompose"
import React, { useState, useEffect } from 'react'
import marker from "./Map marker-01.png";
import marker2 from "./Map marker-02.png";
import marker3 from "./Map marker-1.png"
import marker4 from "./Mapmarkers04.png"
// import { faBus } from "@fortawesome/free-solid-svg-icons";

const MyMapComponent = compose(
  withProps({
    // googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    // googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZ-LLjEHUXavG3WqTGUB-DpXpEvh-eRhI&v=3.exp&libraries=geometry,drawing,places",
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAGP0yTwZ8BFM1U6vgZ292xZD3p_M13tSI&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(() => {

  const [liveMarkers, setLiveMarkers] = useState([])
  const [location, setLocation] = useState("my")

  let final = [
    {"place":"Dwarka Bharthal Hub","lat":28.5443218972277,"lng":77.0461657754131},
    {"place":"Dwarka Sec-14 Hub","lat":28.6103599502047,"lng":77.0220896552555},
    {"place":"Shahdara Hub","lat":28.6778112704249,"lng":77.2922227810962},
    {"place":"Usmanpur Hub","lat":28.7054458143127,"lng":77.3115609250634},
    {"place":"GAZIPUR GAUSHALA MCD PARKING","lat":28.6364510882957,"lng":77.3205791219183},
    {"place":"Infront of kiosk no 5 to 9 paragati deep mall, laxmi nagar","lat":28.6377174659699,"lng":77.2867156911134},
    {"place":"Near Supreme Enclave , Mayur Vihar Phase 1","lat":28.6066137542322,"lng":77.2920839023631},
    {"place":"Plot no 10 V3S Mall, Laxmi Nagar","lat":28.6366286736707,"lng":77.2867428193542},
    {"place":"Covered Parking at Patparganj Market, Near Mother Dairy","lat":28.620432998073,"lng":77.2873886925817},
    {"place":"Near Milan Vihar Appartment behind Max hospital","lat":28.6325336121931,"lng":77.3059041102919},
    {"place":"Near Pankaj Plaza joshi Colony, IP Extension","lat":28.6312706585593,"lng":77.3051010685195},
    {"place":"Adjoining Saraswati kunj society patparganj","lat":28.63712305834,"lng":77.3022897837285},
    {"place":"South Ganeshnagar chowk patparganj road","lat":28.6325196943892,"lng":77.2860725526192},
    {"place":"Bihari colony","lat":28.6722322675713,"lng":77.2822105640919},
    {"place":"ADJOINING COMMUNITY HALL NEAR JAFRABAD METRO STATION","lat":28.6854737450081,"lng":77.2644739431022},
    {"place":"BEHIND AMBEDKAR COLLAGE,YAMUNA VIHAR","lat":28.7033862783306,"lng":77.2866737606612},
    {"place":"NEAR DCP OFFICE DHOBI GHAT NEW SEELAMPUR","lat":28.6755982564596,"lng":77.2716411335957},
    {"place":"NEAR & AROUND D AQUA HOTEL USMANPUR","lat":28.687711825256,"lng":77.2539726152217},
    {"place":"SHASTRI PARK NEAR COMMUNITY HALL","lat":28.672441587497,"lng":77.2549060734018},
    {"place":"NEAR JAGPARVESH CHANDRA HOSPITAL SHASTRI PARK","lat":28.6783856616073,"lng":77.2615208609477},
    {"place":"BACK SIDE CNG PUMP NEAR JAG PARVESH CHANDRA HOSPITAL","lat":28.6073277882052,"lng":77.1415855282712},
    {"place":"SRM apartment near mother dairy","lat":28.6329102216063,"lng":77.3084212920687},
    {"place":"Janakpuri District Centre - Basement No. 5","lat":28.6306554456914,"lng":77.0796601986324},
    {"place":"Behind gaurav apartment IP extension","lat":28.6353921213233,"lng":77.3053285010272},
    {"place":"DDA shoppping complex rajdhani enclave","lat":28.6330027567137,"lng":77.288364059999},
    {"place":"DDA market pankaj mayur plaza mayur phase 3","lat":28.6112046304316,"lng":77.3356642623013},
    {"place":"Covered Parking Mandoli extn","lat":28.7045908093412,"lng":77.3099260727658},
    {"place":"DDA covered land opposite kotla village mayur vihar phase 1","lat":28.6125885973858,"lng":77.2983248484927},
    {"place":"Under flyover mansarover park metro near metro station","lat":28.6775925847953,"lng":77.3010522250794},
    {"place":"IN FRONT OF COMMUNITY CENTER , JANTA FLAT , NANDNAGRI","lat":28.6947774281182,"lng":77.3032621494881},
    {"place":"Samrat Cinema Shakurpur","lat":28.6866802523424,"lng":77.1484484373362},
    {"place":"PUSHPA BHAWAN MADANGIR","lat":28.528753806159,"lng":77.2327587364749},
    {"place":"Fortis Hospital Vasant kunj","lat":28.520675685371,"lng":77.160163977036},
    {"place":"KALKAJI MANDIR","lat":28.5504468780344,"lng":77.2606768737415},
    {"place":"Plot No.34, Road No. 44, Pitampura","lat":28.6941078124061,"lng":77.1350588496664},
    {"place":"Plot No.1 & 2 at Community Centre Road No.44. Opposite TPDDL Pitampura","lat":28.6908453509167,"lng":77.1319689447585},
    {"place":"Plot No-1, Road No-44, Behind Aggarwal Prestige Mall Infront of B.T.W. Rani Bagh","lat":28.6871266035015,"lng":77.1329257279822},
    {"place":"Parking site Community Centre adjoining Road No. 44, Pitmapura","lat":28.6918312107819,"lng":77.1340288813552},
    {"place":"MCD Auto Workshop Plot at Mangolpur Puri","lat":28.6976025972391,"lng":77.0844118100784}
  ]

  const myStyles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
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
        defaultCenter={{ "lat":28.625934,"lng":77.19845 }}
        // defaultCenter={{ "lat":28.462719876100092,"lng": 77.0802879999971 }}
        defaultOptions={{ styles: myStyles }}
      >
        {final.map((map, index) => {
          return <Marker  
          key = {"y"+index}
          // zIndex={1000000}
          icon={{
            url: marker, scaledSize: new window.google.maps.Size(20, 30),
            // origin: new window.google.maps.Point(0, 0),
            // anchor: new window.google.maps.Point(32,65),
            labelOrigin: new window.google.maps.Point(35, 25),
          }} onClick={() => {setLocation("Zomato2" + index); console.log(map.place)}} position={{ lat: Number(map.lat), lng: Number(map.lng) }} >
            {
              // location == false ?
              location == `Zomato2${index}` ?

                <InfoWindow>
                  <div>
                    {map.place}
                  </div>
                </InfoWindow>
                : null}
          </Marker>;
        })}
        
                
      </GoogleMap>
    </div>
  )
}
)

export default MyMapComponent
