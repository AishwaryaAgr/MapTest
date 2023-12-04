import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { compose, withProps } from "recompose"
import React, { useState, useEffect } from 'react'
import marker from "./marker.png";
import marker2 from "./marker2.png";
import marker3 from "./Map Marker.png"
import marker4 from "./Mapmarkers02.png"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAGP0yTwZ8BFM1U6vgZ292xZD3p_M13tSI&v=3.exp&libraries=geometry,drawing,places",
    // googleMapURL: "https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyAGP0yTwZ8BFM1U6vgZ292xZD3p_M13tSI&center=28.604501756092745,77.23545267762218&zoom=13&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x212121&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.business%7Cvisibility:off&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.arterial%7Celement:labels%7Cvisibility:off&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway%7Celement:labels%7Cvisibility:off&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.local%7Cvisibility:off&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Cvisibility:off&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text%7Cvisibility:off&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d&size=480x360",
    // googleMapURL: "https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyAGP0yTwZ8BFM1U6vgZ292xZD3p_M13tSI&center=28.604501756092745,77.23545267762218&zoom=13&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x212121&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.business%7Cvisibility:off&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.arterial%7Celement:labels%7Cvisibility:off&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway%7Celement:labels%7Cvisibility:off&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.local%7Cvisibility:off&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Cvisibility:off&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text%7Cvisibility:off&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d&size=480x360",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `98vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(() => {

  const [liveMarkers, setLiveMarkers] = useState([])
  const [location, setLocation] = useState()


  const Electriva = [

    { "place": " South Extension facing DND", "lat": 28.56906, "lng": 77.21956 },
    { "place": " Andrews Ganj facing DND", "lat": 28.566473, "lng": 77.229749 },
    { "place": "Lajpat Nagar Facing DND", "lat": 28.565361, "lng": 77.242855 },
    { "place": " Lajpat nagar Facing Dhaula Kuan ", "lat": 28.564664, "lng": 77.24145 },
    { "place": "Safdarjung facing Dhaula Kuan", "lat": 28.569084, "lng": 77.204264 },
    { "place": " Bhikaji Kama Place facing Dhaula Kuan (Metro)", "lat": 28.569184, "lng": 77.188833 },
    { "place": "Dhaula Kuan/South Campus facing Dhaula kuan", "lat": 28.590921, "lng": 77.168314 },
    { "place": " RK Puram Market (PVR SANGAM)", "lat": 28.57276, "lng": 77.173787 },
    { "place": "Nehru place facing Modi mill fly over ", "lat": 28.547248, "lng": 77.252879 },
    { "place": " Pamposh Enclave facing R& R Hospital", "lat": 28.544623, "lng": 77.247026 },
    { "place": "Masjid Moth facing modi mill flyover ", "lat": 28.541814, "lng": 77.232858 },
    { "place": "Masjid Moth facing R& R Hospital", "lat": 28.541214, "lng": 77.234786 },
    { "place": " Hauz khas metro station facing modi mill flyover  ", "lat": 28.543942, "lng": 77.204581 },
    

    { "place": "Sultanpur near bus stop Facing Delhi MG rd.", "lat": 28.498235, "lng": 77.15961 },
    { "place": "North West Moti Bagh Near SDMC Toilet (road - 02)", "lat": 28.572263, "lng": 77.16237 },
    { "place": "Sector -02 RK Puram Near Rama Krishna puram society (road -04)", "lat": 28.558092, "lng": 77.186833 },
    { "place": "Govindpuri metro Kalkaji rd.", "lat": 28.543076, "lng": 77.263604 },
    { "place": "Mohan cooperative infront of Volvo Ashram Rd.", "lat": 28.516536, "lng": 77.295676 },
    { "place": "Gurudwara Rd, Sector -03 , Near JJ Colony (road - 10)", "lat": 28.517744, "lng": 77.227274 },
    { "place": " Vasant Vihar Maket (infront of Vasant Square Mall)", "lat": 28.524155, "lng": 77.156224 },
    { "place": "Arjangarh metro Station facing gurgoan MG Rd.", "lat": 28.48014, "lng": 77.12523 },
    { "place": "Ghitorni Metro station Near Bus Stop Facing Delhi  MG Rd.", "lat": 28.49398, "lng": 77.14911 },
    { "place": "Saket metro station Facing badarpur Rd.", "lat": 28.520346, "lng": 77.20211 },
    { "place": "Hamdard nagar near Hamdard university facing Badarpur rd.", "lat": 28.512489, "lng": 77.250983 },
    { "place": "Okhla Phase-01 Circle opposite Crown Plaza Kalkaji mandir rd.", "lat": 28.528906, "lng": 77.270726 },
    { "place": "Community center NFC SDMC car parking ", "lat": 28.56128, "lng": 77.268524 },
    { "place": "Jasola Mall Opposite Modi Tower", "lat": 28.538325, "lng": 77.287956 },
    { "place": "Nizamuddin near bus stop Badarpur Rd.", "lat": 28.591529, "lng": 77.244734 },
    { "place": " INDRAPRASTHA TOWARDS ASHRAM ( Ring Road/MG Road)", "lat": 28.608747, "lng": 77.252867 },
    { "place": "ITO TOWARDS RAJGHAT (Ring Road/MG Road)", "lat": 28.617945, "lng": 77.2488 },
    


    { "place": "Dwarka sec-12 opposite Redision blue", "lat": 28.594964, "lng": 77.037101 },
    { "place": "Main Rajapuri rd.Infront of HDFC bank", "lat": 28.602897, "lng": 77.056774 },
    { "place": "Dwarka Sec-06 Market", "lat": 28.590997, "lng": 77.058956 },
    { "place": "Dwarka Sec-10 Market", "lat": 28.590787, "lng": 77.057889 },
    { "place": "Dwarka Sec-11 Pocket-01 market opposite Aggarwal Mall", "lat": 28.596063, "lng": 77.049926 },
    { "place": "dwarka Sector-05 Pocket-01 market Infront of Aggarwal mall", "lat": 28.559744, "lng": 77.174559 },
    { "place": "Dwarka sec-11 pocket-04 infront of Sudeep plaza", "lat": 28.587232, "lng": 77.043001 },
    { "place": "Dwarka sector -14 SDMC parking Metro ", "lat": 28.602462, "lng": 77.026318 },
    { "place": "Dwarka sec-11 infront of Metro Station", "lat": 28.587436, "lng": 77.049111 },
    { "place": "Dwarka sec-08 infront of Metro Station", "lat": 28.565169, "lng": 77.066922 },
    { "place": "Dwarka sec-23 Market", "lat": 28.565139, "lng": 77.066779 },
    { "place": "Dwarka sec-07 Market", "lat": 28.583706, "lng": 77.071864 },
    { "place": "Dwarka sec-07 Pocket -01 opposite maharaja agersen hospital", "lat": 28.593503, "lng": 77.077079 },
    { "place": "Dwarka sec-09 infront of indira gandhi hospital", "lat": 28.593411, "lng": 77.07701 },
    { "place": "Dwarka sec-13 infront of metro SDMC parking ", "lat": 28.597132, "lng": 77.032928 },
    { "place": "Dwarka sec-14 Vegas Mall ", "lat": 28.601456, "lng": 77.030551 },
    { "place": "Dwarka sec-12 infront of Eross Mall ", "lat": 28.6013, "lng": 77.026722 },
    { "place": "Dwarka sec-21 Infront of Pecific Mall", "lat": 28.551809, "lng": 77.056898 },
    { "place": "Dwarka sec-01 pocket- 2 infront of police station ", "lat": 28.595063, "lng": 77.071947 },
    { "place": "Dwarka sec-12 city market SDMC car parking (BSES Already installed combo Charger 142KW)", "lat": 28.549012, "lng": 77.229217 },
    { "place": "Benito Juarez Marg, Nanak Pura South Moti Bagh (Road- 01)", "lat": 28.582763, "lng": 77.075209 },


    


    { "place": "Mayapuri Industrial Area Near SBI bank Mayapuri Rd.", "lat": 28.61754, "lng": 77.11136 },
    { "place": "Delhi cantt Jail Rd Near Brahmos Aerospace Bus stop Pankha Rd.", "lat": 28.60463, "lng": 77.12839 },
    { "place": "Better Place Mall Pankha Rd.", "lat": 28.6126, "lng": 77.08822 },
    { "place": "NARAINA VIHAR TOWARDS DND", "lat": 28.627432, "lng": 77.133582 },
    { "place": "Mahavir nagar tilak nagar facing janakpuri", "lat": 28.63166, "lng": 77.08137 },
    { "place": "Subhash Nagar ( Tilak Nagar Market)", "lat": 28.637258, "lng": 77.096853 },
    { "place": " Vikas Puri Market ( PVR Sonia Vikas Puri)", "lat": 28.638996, "lng": 77.075209 },
    { "place": "Krishna park facing Haiderpur", "lat": 28.63956, "lng": 77.08169 },
    { "place": "State bank nagar paschim vihar facing janakpuri", "lat": 28.66052, "lng": 77.09167 },
    { "place": "Pashchim vihar facing janakpuri opp raddission blue hotel", "lat": 28.66676, "lng": 77.09275 },
    { "place": "Dda market near teachers colony pashchim vihar", "lat": 28.662394, "lng": 77.10052 },
    { "place": "ESI HOSPITAL TOWARDS DND", "lat": 28.659159, "lng": 77.129267 },
    { "place": "RAJOURI GARDEN TOWARDS PUNJABI BAGH", "lat": 28.64389, "lng": 77.127124 },
    { "place": "CARIAPPA VIHAR TOWARDS DND", "lat": 28.644936, "lng": 77.127446 },
    { "place": "PUNJABI BAGH WEST TOWARDS DND", "lat": 28.669927, "lng": 77.138067 },
    { "place": "Punjabi bagh metro towards mundka", "lat": 28.672769, "lng": 77.147112 },
    { "place": "Shivaji park metro near Punjabi bagh police station towards mundka", "lat": 28.674587, "lng": 77.132125 },
    { "place": "Paschim vihar east metro station towards karolbagh", "lat": 28.677569, "lng": 77.111716 },
    


    

    
    { "place": "Maharaja surajmal stadium metro station towards karolbagh", "lat": 28.68217, "lng": 77.074094 },
    { "place": "West enclave pitampura facing janakpuri", "lat": 28.69258, "lng": 77.10002 },
    { "place": "Madhuban chowk facing Janakpuri", "lat": 28.70619, "lng": 77.13339 },
    { "place": "NSP facing Azadpur", "lat": 28.69168, "lng": 77.15332 },
    { "place": "Shakarpur metro facing Azadpur", "lat": 28.68551, "lng": 77.14954 },
    { "place": "Shalimar bagh metro station facing dhaula kuan", "lat": 28.70236, "lng": 77.16641 },
    { "place": "Model town in front of chatrsal stadium toward azadpur", "lat": 28.704726, "lng": 77.18868 },
    { "place": "Opposite to vallabah bhai patel chest institute north university campus", "lat": 28.691483, "lng": 77.209236 },
    { "place": "Opposite to Daulat ram college gate no.2", "lat": 28.688611, "lng": 77.206748 },
    { "place": "Vidhan sabha metro towards azadpur", "lat": 28.688641, "lng": 77.221247 },
    { "place": "Subhadra colony towards azadpur", "lat": 28.671072, "lng": 77.184039 },
    { "place": "Railway colony ashok vihar phase 3 towards azadpur", "lat": 28.686469, "lng": 77.178298 },



    

   

  ]
  let EL2 = [
    
    
    

    
    { "place": " Nehrunagar Facing DND", "lat": 28.569325, "lng": 77.253845 },
    { "place": " Nehrunagar facing Dhaula Kuan ", "lat": 28.568045, "lng": 77.259835 },
    { "place": "Andrews Ganj facing Dhaula Kuan ", "lat": 28.56599, "lng": 77.229396 },
    { "place": "South Extension facing Dhaula Kuan ", "lat": 28.568439, "lng": 77.219615 },
    { "place": "Moti Bag facing Dhaula Kuan", "lat": 28.570927, "lng": 77.18253 },
    { "place": "Modi Mill okhla facing Modi mill flyover ", "lat": 28.551784, "lng": 77.264126 },
    { "place": "Near IIT facing modi mill fly over ", "lat": 28.548898, "lng": 77.188389 },
    { "place": "Munirka facing modi mill fly over ", "lat": 28.554953, "lng": 77.177535 },
    { "place": " Malai Mandir facing modi Mill flyover ", "lat": 28.566207, "lng": 77.166294 },
    { "place": "Modi Mill okhla facing R& R Hospital ", "lat": 28.548706, "lng": 77.259259 },
    { "place": "Nehru place facing R& R Hospital", "lat": 28.547711, "lng": 77.254095 },
    { "place": "Pamposh Enclave facing modi mill flyover ", "lat": 28.543653, "lng": 77.243324 },
    { "place": "Soami Nagar facing modi mill flyover", "lat": 28.542222, "lng": 77.227342 },
    { "place": "Panchsheel facing modi mill flyover ", "lat": 28.542616, "lng": 77.221787 },
    { "place": "Safdarjung facing DND", "lat": 28.570345, "lng": 77.202277 },
    { "place": " Raj Nagar facing DND", "lat": 28.570009, "lng": 77.202032 },
    { "place": "Moti Bag facing DND ", "lat": 28.571684, "lng": 77.181287 },
    { "place": " Bhikaji Kama Place facing Dhaula Kuan (Hyatt)", "lat": 28.569282, "lng": 77.18492 },
    { "place": "Bhikaji Kama Place facing DND", "lat": 28.5698932, "lng": 77.18819427 },
    { "place": " Rajauri garden Market (B.K.Dutta Market)", "lat": 28.647521, "lng": 77.119394 },
    { "place": "PUNJABI BAGH WEST TOWARDS NETAJI SUBHASH PLACE", "lat": 28.669995, "lng": 77.138068 },
    { "place": "PUNJABI BAGH WEST TOWARDS DND", "lat": 28.669927, "lng": 77.138067 },
    { "place": "MAYA PURI TOWARDS DND", "lat": 28.639195, "lng": 77.129721 },
    { "place": "PUNJABI BAGH WEST TOWARDS NETAJI SUBHASH PLACE", "lat": 28.669995, "lng": 77.138068 },
    { "place": "MAYA PURI TOWARDS DND", "lat": 28.639195, "lng": 77.129721 },
    { "place": "RAJOURI GARDEN TOWARDS PUNJABI BAGH", "lat": 28.64389, "lng": 77.127124 },
    { "place": "ESI HOSPITAL TOWARDS PUNJABI BAGH", "lat": 28.658568, "lng": 77.128799 },
    { "place": "SARAI KALE KHAN TOWARDS RAJGHAT (Ring Road/MG Road)", "lat": 28.593212, "lng": 77.256974 },
    { "place": "ITO TOWARDS ASHRAM (Ring Road/MG Road)", "lat": 28.623997, "lng": 77.247688 },
    { "place": "SARAI KALE KHAN TOWARDS ASHRAM ( Ring Road/MG Road)", "lat": 28.589354, "lng": 77.258956 },
    { "place": "West enclave pitampura facing janakpuri", "lat": 28.69258, "lng": 77.10002 },
    { "place": "ESI HOSPITAL TOWARDS PUNJABI BAGH", "lat": 28.658568, "lng": 77.128799 },
    { "place": "ESI HOSPITAL TOWARDS DND", "lat": 28.659159, "lng": 77.129267 },
    { "place": "SARAI KALE KHAN TOWARDS RAJGHAT (Ring Road/MG Road)", "lat": 28.593212, "lng": 77.256974 },
    { "place": "ITO TOWARDS ASHRAM (Ring Road/MG Road)", "lat": 28.623997, "lng": 77.247688 },
    { "place": " INDRAPRASTHA TOWARDS ASHRAM ( Ring Road/MG Road)", "lat": 28.608747, "lng": 77.252867 },
    { "place": "SARAI KALE KHAN TOWARDS ASHRAM ( Ring Road/MG Road)", "lat": 28.589354, "lng": 77.258956 },
    { "place": "CARIAPPA VIHAR TOWARDS DND", "lat": 28.644936, "lng": 77.127446 },
    { "place": "RAJOURI GARDEN TOWARDS DND", "lat": 28.642694, "lng": 77.128332 },
    { "place": " INDRAPRASTHA TOWARDS RAJGHAT ( Ring Road /MG Road)", "lat": 28.602828, "lng": 77.255782 },
    { "place": "chattarpur opposite metro station facing gurgoan MG rd", "lat": 28.504102, "lng": 77.171702 },
    { "place": "Sultanpur metro station Near Delhi mohalla clinic Facing gurgoan MG rd.", "lat": 28.499535, "lng": 77.163101 },
    { "place": "Chattarpur Near OICL pump facing delhi MG rd.", "lat": 28.503436, "lng": 77.172147 },
    { "place": "Jasola Infront of Apolo Hospital infront of District park Badarpur Rd", "lat": 28.639417, "lng": 77.283137 },
    { "place": "Jasola in between IGL and IOCL Noida Rd.", "lat": 28.538418, "lng": 77.289877 },
    { "place": "Jasola infront of South delhi police housing resident Ashram Rd.", "lat": 28.5412, "lng": 77.280916 },
    { "place": "Nizamuddin infront of police station Indiagate Rd.", "lat": 28.592716, "lng": 77.248784 },
    { "place": "saket infront of District Court Malviye nagar Rd.", "lat": 28.6013, "lng": 77.026722 },
    { "place": "Community center Saket", "lat": 28.522814, "lng": 77.207268 },
    { "place": "Benito Juarez Marg, Nanak Pura South Moti Bagh Near- West End Colony(Road - 01)", "lat": 28.575595, "lng": 77.164117 },
    { "place": "North West Moti Bagh Near Moti bagh Metro station (road - 02)", "lat": 28.578038, "lng": 77.174545 },
    { "place": "Sector-01 RK Puram near Muhamadpur Red Light (road - 03)", "lat": 28.564455, "lng": 77.180414 },
    { "place": "Sector-05 RK Puram Near SDMC Dalao (road - 03)", "lat": 28.559744, "lng": 77.174559 },
    { "place": "Sector -02 RK Puram Facing Rama Krishna puram  (road -04)", "lat": 28.556701, "lng": 77.186355 },
    { "place": "Sheikh Sarai Phase -02 sector 7  Near Sheikh Sarai Red light (road - 10)", "lat": 28.532793, "lng": 77.23197 },
    { "place": "Madangir village,near Phusp Vihar  (road- 10)", "lat": 28.52435, "lng": 77.230378 },
    { "place": " Madangir Village  Opposite NCB Office (road-10)", "lat": 28.519733, "lng": 77.228062 },
    { "place": "Hauj Khas Near Metro Station", "lat": 28.543756, "lng": 77.204659 },
    { "place": "Mayfair Gardens Near The Mother internation School (road-09)", "lat": 28.544053, "lng": 77.204494 },
    { "place": "Qutab Park, Near Qutub Minar  ( road- 11)", "lat": 28.526028, "lng": 77.187708 },
    { "place": "Qutab Park, Near Qutub Minar  ( road- 11)", "lat": 28.52592, "lng": 77.187398 },
    { "place": "Sarvoday Enclave Near Adhchini ( road- 09)", "lat": 28.539086, "lng": 77.199438 },
    { "place": "Greater Kailash-1, Near shri Fort Park (road-07)", "lat": 28.549012, "lng": 77.229217 },
    { "place": "Lotus temple (road-08) car parking", "lat": 28.555829, "lng": 77.258445 },
    { "place": "Hauj Khas Near Post office (road-05)", "lat": 28.540061, "lng": 77.198875 },
    { "place": "Ghitorni Metro station Facing Gurgoan MG Rd.", "lat": 28.49329, "lng": 77.14833 },
    { "place": "Arjangarh metro Station facing Delhi MG Rd.", "lat": 28.48074, "lng": 77.12546 },
    { "place": "Delhi metro housing Ali Extension Badarpur rd.", "lat": 28.52269, "lng": 77.294638 },
    { "place": "Hauj Rani near Malviya nagar metro", "lat": 28.529039, "lng": 77.214434 },
    { "place": "Josip Broz Tito Marg GK Enclave-01 Near Indian Oil petrol Pump (road - 07)", "lat": 28.547846, "lng": 77.228848 },
    { "place": "Seth sarai Near National Institute of TB and respiratory diseases (road-09)", "lat": 28.528691, "lng": 77.190109 },
    { "place": "South Extension Uday Park Infront of hudco center (road-06)", "lat": 28.563634, "lng": 77.223105 },
    { "place": "Madhuban chowk facing Janakpuri", "lat": 28.70619, "lng": 77.13339 },
    { "place": "Pashchim vihar facing janakpuri opp raddission blue hotel", "lat": 28.66676, "lng": 77.09275 },
    { "place": "State bank nagar paschim vihar facing janakpuri", "lat": 28.66052, "lng": 77.09167 },
    { "place": "Ndmc parking shivaji metro station towards karolbagh", "lat": 28.674947, "lng": 77.132351 },


    { "place": "MAYA PURI TOWARDS PUNJABI BAGH", "lat": 28.637729, "lng": 77.129314 },
    { "place": "NARAINA VIHAR TOWARDS PUNJABI BAGH", "lat": 28.615597, "lng": 77.136371 },
    { "place": " Punjabi Bag Market (Punjabi bagh Central Market)", "lat": 28.670491, "lng": 77.133516 },
    
  ]

  const currStations = [
    {"lat":28.5288833,"lng":77.2146648}, //Max
{"lat":28.5288833,"lng":77.2126648},// Max
{"lat":28.5006596,"lng":77.2341272},
{"lat":28.5363767,"lng":77.20773}, //Malviya
{"lat":28.569234,"lng":77.219661},
{"lat":28.5288833,"lng":77.2136648}, //Max
{"lat":28.517918,"lng":77.198375}, //Office
{"lat":28.5011772,"lng":77.1843089},
{"lat":28.5647828,"lng":77.2416165},
{"lat":28.55743,"lng":77.1642252}, //Vasant Vihar
{"lat":28.566648,"lng":77.2297322},
{"lat":28.5363767,"lng":77.20813}, //Malviya
{"lat":28.5363767,"lng":77.20893},//Malviya
{"lat":28.540413,"lng":77.2350566},
{"lat":28.541655,"lng":77.232924},
{"lat":28.5441,"lng":77.2046},
{"lat":28.5441,"lng":77.2040},// Hauz Khas
{"lat":28.5472912,"lng":77.2530695},
{"lat":28.5694003,"lng":77.2043605},
{"lat":28.5363767,"lng":77.20993}, //Malviya
{"lat":28.55743,"lng":77.1632252},
{"lat":28.524153,"lng":77.154968},
{"lat":28.57268,"lng":77.174016},
{"lat":28.589669,"lng":77.168967},
{"lat":28.517918,"lng":77.197375}, //Office
{"lat":28.5365,"lng":77.2266},
{"lat":28.524153,"lng":77.155968}, // vasant Kunj
{"lat":28.5006596,"lng":77.2351272}, // Sangam Vihar
{"lat":28.5693271,"lng":77.1851651},
{"lat":28.5011981,"lng":77.1853049}, // Chattarpur
{"lat":28.5179572,"lng":77.1994123},
{"lat":28.5654306,"lng":77.2428684},
{"lat":28.5446013,"lng":77.2469289},
{"lat":28.517918,"lng":77.196375}, //Office
{"lat":28.569078,"lng":77.219318}
  ]

let extra = [
  {"lat": 28.695243, "lng": 77.125234},
  {"lat":28.722710, "lng":77.157184},
  {"lat":28.721266, "lng": 77.188821},
  {"lat": 28.707964, "lng": 77.225064},
  {"lat":28.667797, "lng": 77.174654},
  {"lat":28.667794, "lng": 77.214506},
  {"lat":28.650167, "lng": 77.20231},
  {"lat": 28.657104219901278, "lng": 77.23237354541936},


  {"lat": 28.694300011700868, "lng": 77.2639690210582},
  {"lat": 28.69147992797314, "lng": 77.28810358561223},
  {"lat": 28.681519115274657, "lng": 77.30466813078381},
  {"lat":28.680263389079865, "lng": 77.27587866064667},
  // {"lat":28.677193184976822, "lng": 77.29012342746924},
  // {"lat":28.674114682614462, "lng":77.31280095888857},
  // {"lat":28.68052521954813, "lng": 77.26366671090746},
  {"lat":28.670069507413345, "lng": 77.25842504554794},
  {"lat":28.666237216261127, "lng": 77.27005088366484},
  {"lat":28.661904141853263, "lng": 77.26423294858387},
  // {"lat":28.664188369541378, "lng" : 77.2834223802438},
  // {"lat": 28.656799122069398, "lng": 77.27062408060655},
  // {"lat": 28.655773860769347, "lng": 77.27876269530654},
  // {"lat":28.657549828817693, "lng": 77.29271860628589},
  // {"lat": 28.66290372901245, "lng": 77.29650409168605},
  {"lat":28.65958361474555, "lng": 77.30173352364802},
  {"lat": 28.64710399909673, "lng": 77.27468510156156},
  {"lat": 28.644821769790905, "lng": 77.24968684535463},
  {"lat": 28.6460728985802, "lng": 77.29067136422897},
  // {"lat": 28.644816392215414, "lng": 77.26073146687074},
  // {"lat":28.649118774934454, "lng":77.30957038270806},
  // {"lat": 28.640964736496844, "lng": 77.29938624562156},
  {"lat":28.630257180118722, "lng":77.29239875082531},
  {"lat": 28.632559792455552, "lng": 77.28280996244833},
  {"lat": 28.613689550908433, "lng": 77.27610888089876},
  {"lat":28.608839934956503, "lng":77.28104435819087},
  {"lat":28.6228331586081, "lng":77.32290815225572},
  // {"lat": 28.620048094805746, "lng": 77.30023483978862},
  // {"lat":28.612659485580107, "lng":77.28976533427694},
  // {"lat": 28.609081761100587, "lng": 77.29818874061712},
  // {"lat":28.595830520584613, "lng":77.28248545180408},
  {"lat":28.61058360868594, "lng":77.32841404895643},
  {"lat":28.622576915269764, "lng":77.32407045204816},
  {"lat":28.612894696549052, "lng": 77.31301383812058},
  {"lat": 28.60244436891469, "lng": 77.30457437265136},
  {"lat": 28.59403329177645, "lng": 77.29730132092496},

  {"lat": 28.690932850028528, "lng":77.0417663392243},
  {"lat":28.66897807119772, "lng":77.02086215283978},
  {"lat": 28.67129741557869, "lng": 77.04557265486369},
  {"lat":28.64577858162517, "lng": 77.02019949784755},
  {"lat":28.656267894865568, "lng": 77.05710218620194},
  {"lat": 28.645032198125143, "lng": 77.04967531840325},

  {"lat": 28.62330866838649, "lng": 77.00037579967523},
  {"lat": 28.624044518757234, "lng": 76.97828342380217},
  {"lat": 28.606950930027224, "lng": 76.97511588432708},
  {"lat": 28.59598873937465, "lng": 76.97891284678913},
  {"lat":28.59500387127215, "lng":77.00477723430608},
  {"lat": 28.582475702348916, "lng": 76.98271269020802}
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
        defaultCenter={{"lat":28.5363767,"lng":77.20973}}  
        defaultOptions={{ styles: myStyles }}
      >
        {Electriva.map((map, index) => {
          console.log(map);
          return <Marker zIndex={100} icon={{
            url: marker3, scaledSize: new window.google.maps.Size(18, 25),
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
        {EL2.map((map, index) => {
          console.log(map);
          return <Marker zIndex={2} icon={{
            url: marker3, scaledSize: new window.google.maps.Size(18, 25),
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
        {currStations.map((map, index) => {
          console.log(map);
          return <Marker zIndex={2} icon={{
            url: marker3, scaledSize: new window.google.maps.Size(18, 25),
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
        {extra.map((map, index) => {
          console.log(map);
          return <Marker zIndex={2} icon={{
            url: marker3, scaledSize: new window.google.maps.Size(18, 25),
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
      </GoogleMap>
    </div>
  )
}
)

export default MyMapComponent
