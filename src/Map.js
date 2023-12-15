import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { compose, withProps } from "recompose"
import React, { useState, useEffect } from 'react'
import marker from "./marker.png";
import marker2 from "./marker2.png";
import marker3 from "./marker3.png"
import marker4 from "./marker4.png"
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
  const [location, setLocation] = useState()

  let Electriva = [

    { "place": "Nehru Enclave Neeche", "lat": 28.540152, "lng": 77.249026 },
    { "place": "Nehru Enclave Upar", "lat": 28.555394810823778, "lng": 77.24198231956211 },
    { "place": "Chattarpur", "lat": 28.506208, "lng": 77.185101 },
    { "place": "Vasant Kunj", "lat": 28.527887944330118, "lng": 77.15073576451272 },
    { "place": "Rajinder Da Dhaba", "lat": 28.56564359652041, "lng": 77.19932942691037 },
    { "place": "Lajpat Nagar Facing DND", "lat": "28.565361	", "lng": "77.242855" },
    { "place": "Lajpat nagar Facing Dhaula Kuan ", "lat": "28.564664	", "lng": "77.24145" },
    { "place": "Nehru place facing Modi mill fly over ", "lat": "28.547248	", "lng": "77.252879" },
    { "place": "Munirka facing modi mill fly over ", "lat": "28.554953	", "lng": "77.177535" },
    { "place": "Hauz khas metro station facing modi mill flyover  ", "lat": "28.543942	", "lng": "77.204581" },
    { "place": "B-6, Safdarjung ", "lat": 28.55918191001921, "lng": 77.19655972566386 },
    { "place": "Green Park (HOD)", "lat": 28.56053555446929, "lng": 77.20744727738044 }
  ]
  let Zomato = [

    { "place": "Sector 50", "lat": 28.41458, "lng": 77.06567 },
    { "place": "Sector 50", "lat": 28.41397, "lng": 77.06599 },
    { "place": "Sector 7, Gurgaon", "lat": 28.50346, "lng": 77.00706 },
    { "place": "Sector 7, Gurgaon", "lat": 28.50534, "lng": 77.00414 },
    { "place": "Sector 109, Gurgaon", "lat": 28.50534, "lng": 77.00414 },
    { "place": "Sector 52, Gurgaon", "lat": 28.44887, "lng": 77.07144 },
    { "place": "Sector 7, Gurgaon", "lat": 28.46764, "lng": 77.01704 },
    { "place": "Sector 49", "lat": 28.42009, "lng": 77.0508 },
    { "place": "Sector 48, Gurgaon", "lat": 28.43388, "lng": 77.03335 },
    { "place": "Sector 49", "lat": 28.42008, "lng": 77.05168 },
    { "place": "Sector 49", "lat": 28.42043, "lng": 77.05148 },
    { "place": "Sector 48, Gurgaon", "lat": 28.4338, "lng": 77.03336 },
    { "place": "Sector 48, Gurgaon", "lat": 28.43387, "lng": 77.0333 },
    { "place": "Sector 49", "lat": 28.41981, "lng": 77.05181 },
    { "place": "Sector 7, Gurgaon", "lat": 28.46765, "lng": 77.01694 },
    { "place": "Sector 7, Gurgaon", "lat": 28.46734, "lng": 77.01743 },
    { "place": "Sector 49", "lat": 28.41974, "lng": 77.05148 },
    { "place": "Sector 24", "lat": 28.49188, "lng": 77.09613 },
    { "place": "Sector 33", "lat": 28.44496, "lng": 77.02763 },
    { "place": "Sector 28", "lat": 28.46708, "lng": 77.08141 },
    { "place": "Sector 48, Gurgaon", "lat": 28.41113, "lng": 77.04118 },
    { "place": "Sector 49", "lat": 28.41113, "lng": 77.04118 },
    { "place": "Sector 7, Gurgaon", "lat": 28.47886, "lng": 77.02447 },
    { "place": "Sector 29, Gurgaon", "lat": 28.46798, "lng": 77.06322 },
    { "place": "Sector 28", "lat": 28.46757, "lng": 77.08181 },
    { "place": "Sector 28", "lat": 28.4675, "lng": 77.08128 },
    { "place": "Sector 28", "lat": 28.46708, "lng": 77.08115 },
    { "place": "Sector 28", "lat": 28.46762, "lng": 77.08173 },
    { "place": "Sector 28", "lat": 28.46771, "lng": 77.08176 },
    { "place": "Sector 28", "lat": 28.46762, "lng": 77.08233 },
    { "place": "Sector 28", "lat": 28.46749, "lng": 77.08155 },
    { "place": "Sector 84", "lat": 28.37021, "lng": 76.96594 },
    { "place": "IMT Manesar", "lat": 28.37021, "lng": 76.96594 },
    { "place": "Sector 28", "lat": 28.46722, "lng": 77.08199 },
    { "place": "Sector 28", "lat": 28.46761, "lng": 77.08231 },
    { "place": "Sector 48, Gurgaon", "lat": 28.41117, "lng": 77.04136 },
    { "place": "Sector 49", "lat": 28.41117, "lng": 77.04136 },
    { "place": "IMT Manesar", "lat": 28.37405, "lng": 76.95317 },
    { "place": "Sector 84", "lat": 28.37405, "lng": 76.95317 },
    { "place": "Sector 24", "lat": 28.5026, "lng": 77.0973 },
    { "place": "Sector 29, Gurgaon", "lat": 28.45698, "lng": 77.05802 },
    { "place": "Sector 24", "lat": 28.48288, "lng": 77.0956 },
    { "place": "Sector 66", "lat": 28.38953, "lng": 77.0671 },
    { "place": "Sector 24", "lat": 28.48277, "lng": 77.0957 },
    { "place": "Sector 66", "lat": 28.39076, "lng": 77.06712 },
    { "place": "Sector 24", "lat": 28.48284, "lng": 77.09579 },
    { "place": "Sector 24", "lat": 28.48466, "lng": 77.09455 },
    { "place": "Sector 48, Gurgaon", "lat": 28.40164, "lng": 77.0194 },
    { "place": "Sector 24", "lat": 28.48298, "lng": 77.09569 },
    { "place": "Sector 66", "lat": 28.39038, "lng": 77.06751 },
    { "place": "Sector 66", "lat": 28.3908, "lng": 77.06728 },
    { "place": "Sector 66", "lat": 28.3908, "lng": 77.06725 },
    { "place": "Sector 24", "lat": 28.48276, "lng": 77.09581 },
    { "place": "Sector 24", "lat": 28.48284, "lng": 77.09539 },
    { "place": "Sector 66", "lat": 28.39078, "lng": 77.06688 },
    { "place": "IMT Manesar", "lat": 28.42464, "lng": 76.93065 },
    { "place": "Patli Hajipur", "lat": 28.42464, "lng": 76.93065 },
    { "place": "IMT Manesar", "lat": 28.42436, "lng": 76.93147 },
    { "place": "Patli Hajipur", "lat": 28.42436, "lng": 76.93147 },
    { "place": "IMT Manesar", "lat": 28.42424, "lng": 76.93102 },
    { "place": "Patli Hajipur", "lat": 28.42424, "lng": 76.93102 },
    { "place": "Sector 7, Gurgaon", "lat": 28.46575, "lng": 76.98745 },
    { "place": "IMT Manesar", "lat": 28.42468, "lng": 76.93089 },
    { "place": "Patli Hajipur", "lat": 28.42468, "lng": 76.93089 },
    { "place": "Sector 48, Gurgaon", "lat": 28.40143, "lng": 77.01916 },
    { "place": "Sector 7, Gurgaon", "lat": 28.45669, "lng": 76.97505 },
    { "place": "Dhankot, Gurgaon", "lat": 28.45669, "lng": 76.97505 },
    { "place": "IMT Manesar", "lat": 28.35914, "lng": 76.97255 },
    { "place": "Sector 33", "lat": 28.44775, "lng": 77.03304 },
    { "place": "Sector 15", "lat": 28.44775, "lng": 77.03304 },
    { "place": "Sector 56, Gurgaon", "lat": 28.42092, "lng": 77.09051 },
    { "place": "Sector 57", "lat": 28.42092, "lng": 77.09051 },
    { "place": "Patli Hajipur", "lat": 28.38678, "lng": 76.90965 },
    { "place": "IMT Manesar", "lat": 28.38678, "lng": 76.90965 },
    { "place": "Sector 84", "lat": 28.39274, "lng": 76.96717 },
    { "place": "IMT Manesar", "lat": 28.39274, "lng": 76.96717 },
    { "place": "Sector 24", "lat": 28.48792, "lng": 77.10358 },
    { "place": "Sector 56, Gurgaon", "lat": 28.41981, "lng": 77.09077 },
    { "place": "Sector 57", "lat": 28.41981, "lng": 77.09077 },
    { "place": "Sector 24", "lat": 28.48765, "lng": 77.10396 },
    { "place": "Sector 24", "lat": 28.48765, "lng": 77.1038 },
    { "place": "Sector 24", "lat": 28.4874, "lng": 77.10464 },
    { "place": "Sector 24", "lat": 28.4874, "lng": 77.10387 },
    { "place": "Sector 24", "lat": 28.48718, "lng": 77.10412 },
    { "place": "Sector 56, Gurgaon", "lat": 28.42106, "lng": 77.09057 },
    { "place": "Sector 57", "lat": 28.42106, "lng": 77.09057 },
    { "place": "Sector 24", "lat": 28.48702, "lng": 77.10422 },
    { "place": "Sector 18", "lat": 28.49541, "lng": 77.08121 },
    { "place": "Sector 24", "lat": 28.49541, "lng": 77.08121 },
    { "place": "Sector 23", "lat": 28.5052, "lng": 77.03778 },
    { "place": "Palam Vihar, Gurgaon", "lat": 28.5052, "lng": 77.03778 },
    { "place": "Sector 84", "lat": 28.4041, "lng": 76.94766 },
    { "place": "IMT Manesar", "lat": 28.4041, "lng": 76.94766 },
    { "place": "Sector 84", "lat": 28.40346, "lng": 76.94785 },
    { "place": "IMT Manesar", "lat": 28.40346, "lng": 76.94785 },
    { "place": "Sector 84", "lat": 28.40346, "lng": 76.94785 },
    { "place": "IMT Manesar", "lat": 28.40346, "lng": 76.94785 },
    { "place": "Sector 84", "lat": 28.40349, "lng": 76.9478 },
    { "place": "IMT Manesar", "lat": 28.40349, "lng": 76.9478 },
    { "place": "Sector 84", "lat": 28.40398, "lng": 76.94765 },
    { "place": "IMT Manesar", "lat": 28.40398, "lng": 76.94765 },
    { "place": "Sector 18", "lat": 28.49552, "lng": 77.08091 },
    { "place": "Sector 24", "lat": 28.49552, "lng": 77.08091 },
    { "place": "Sector 18", "lat": 28.49552, "lng": 77.0812 },
    { "place": "Sector 24", "lat": 28.49552, "lng": 77.0812 },
    { "place": "Sector 53", "lat": 28.44843, "lng": 77.0991 },
    { "place": "Sector 84", "lat": 28.40182, "lng": 76.98884 },
    { "place": "Sector 31", "lat": 28.44365, "lng": 77.05328 },
    { "place": "Sector 84", "lat": 28.40141, "lng": 76.94703 },
    { "place": "IMT Manesar", "lat": 28.40141, "lng": 76.94703 },
    { "place": "Sector 56, Gurgaon", "lat": 28.40691, "lng": 77.09151 },
    { "place": "Sector 56, Gurgaon", "lat": 28.40667, "lng": 77.09151 },
    { "place": "Sector 47", "lat": 28.42206, "lng": 77.05342 },
    { "place": "Sector 56, Gurgaon", "lat": 28.40562, "lng": 77.09175 },
    { "place": "Gwal Pahari", "lat": 28.43661, "lng": 77.13499 },
    { "place": "Sector 23", "lat": 28.50278, "lng": 77.06302 },
    { "place": "Sector 23", "lat": 28.50279, "lng": 77.06268 },
    { "place": "Sector 7, Gurgaon", "lat": 28.47315, "lng": 77.0033 },
    { "place": "Sector 7, Gurgaon", "lat": 28.4975, "lng": 76.99783 },
    { "place": "Sector 23", "lat": 28.50283, "lng": 77.0638 },
    { "place": "Sector 23", "lat": 28.50276, "lng": 77.0626 },
    { "place": "Sector 23", "lat": 28.50292, "lng": 77.06454 },
    { "place": "Sector 23", "lat": 28.5029, "lng": 77.06357 },
    { "place": "Sector 7, Gurgaon", "lat": 28.50287, "lng": 77.00758 },
    { "place": "Sector 7, Gurgaon", "lat": 28.50321, "lng": 77.00777 },
    { "place": "DLF PHASE 1 (SECTOR 26)", "lat": 28.47693, "lng": 77.0942 },
    { "place": "Sector 28", "lat": 28.47693, "lng": 77.0942 },
    { "place": "Sector 15", "lat": 28.46104, "lng": 77.04124 },
    { "place": "Sector 48, Gurgaon", "lat": 28.39084, "lng": 77.02999 },
    { "place": "Sector 66", "lat": 28.39089, "lng": 77.05666 },
    { "place": "Sector 56, Gurgaon", "lat": 28.42864, "lng": 77.09969 },
    { "place": "Sector 29, Gurgaon", "lat": 28.46906, "lng": 77.06399 },
    { "place": "Sector 84", "lat": 28.38069, "lng": 76.96376 },
    { "place": "IMT Manesar", "lat": 28.38069, "lng": 76.96376 },
    { "place": "Sector 56, Gurgaon", "lat": 28.42883, "lng": 77.09992 },
    { "place": "Sector 24", "lat": 28.51137, "lng": 77.07767 },
    { "place": "Sector 56, Gurgaon", "lat": 28.42864, "lng": 77.09971 },
    { "place": "Sector 7, Gurgaon", "lat": 28.49651, "lng": 76.98935 },
    { "place": "Sector 48, Gurgaon", "lat": 28.39166, "lng": 77.03013 },
    { "place": "Sector 27", "lat": 28.4622, "lng": 77.08746 },
    { "place": "Sector 53", "lat": 28.44268, "lng": 77.1011 },
    { "place": "Sector 27", "lat": 28.46256, "lng": 77.08693 },
    { "place": "Sector 56, Gurgaon", "lat": 28.40078, "lng": 77.0916 },
    { "place": "Sector 18", "lat": 28.50216, "lng": 77.06958 },
    { "place": "Sector 50", "lat": 28.41333, "lng": 77.07283 },
    { "place": "IMT Manesar", "lat": 28.34204, "lng": 76.93747 },
    { "place": "Patli Hajipur", "lat": 28.34204, "lng": 76.93747 },
    { "place": "Sector 56, Gurgaon", "lat": 28.40073, "lng": 77.09175 },
    { "place": "Sector 27", "lat": 28.46233, "lng": 77.08756 },
    { "place": "Sector 27", "lat": 28.46239, "lng": 77.08752 },
    { "place": "Sector 53", "lat": 28.44289, "lng": 77.10083 },
    { "place": "Sector 27", "lat": 28.46244, "lng": 77.08731 },
    { "place": "Sector 56, Gurgaon", "lat": 28.40075, "lng": 77.0916 },
    { "place": "Sector 53", "lat": 28.4428, "lng": 77.10091 },
    { "place": "Sector 27", "lat": 28.46247, "lng": 77.08759 },
    { "place": "Sector 27", "lat": 28.46248, "lng": 77.08757 },
    { "place": "Sector 27", "lat": 28.46235, "lng": 77.08763 },
    { "place": "IMT Manesar", "lat": 28.35561, "lng": 76.93773 },
    { "place": "Patli Hajipur", "lat": 28.35561, "lng": 76.93773 },
    { "place": "Sector 56, Gurgaon", "lat": 28.40078, "lng": 77.092 },
    { "place": "Sector 27", "lat": 28.46244, "lng": 77.08687 },
    { "place": "Sector 27", "lat": 28.46237, "lng": 77.08697 },
    { "place": "Sector 53", "lat": 28.44297, "lng": 77.10087 },
    { "place": "Sector 53", "lat": 28.44253, "lng": 77.10094 },
    { "place": "Sector 53", "lat": 28.44247, "lng": 77.10093 },
    { "place": "Sector 24", "lat": 28.50885, "lng": 77.08328 },
    { "place": "Sector 27", "lat": 28.46233, "lng": 77.08691 },
    { "place": "Sector 56, Gurgaon", "lat": 28.40109, "lng": 77.09132 },
    { "place": "IMT Manesar", "lat": 28.36306, "lng": 76.95131 },
    { "place": "Patli Hajipur", "lat": 28.36306, "lng": 76.95131 },
    { "place": "Sector 27", "lat": 28.46236, "lng": 77.08767 },
    { "place": "Sector 56, Gurgaon", "lat": 28.4008, "lng": 77.09209 },
    { "place": "Sector 53", "lat": 28.4428, "lng": 77.10103 },
    { "place": "Sector 27", "lat": 28.46251, "lng": 77.08743 },
    { "place": "Sector 27", "lat": 28.46235, "lng": 77.08768 },
    { "place": "Sector 53", "lat": 28.44297, "lng": 77.10091 },
    { "place": "Sector 27", "lat": 28.46228, "lng": 77.08765 },
    { "place": "Sector 53", "lat": 28.44295, "lng": 77.10096 },
    { "place": "Sector 27", "lat": 28.46236, "lng": 77.08711 },
    { "place": "Sector 27", "lat": 28.46227, "lng": 77.08762 },
    { "place": "Sector 57", "lat": 28.41629, "lng": 77.08456 },
    { "place": "Sector 56, Gurgaon", "lat": 28.41629, "lng": 77.08456 },
    { "place": "Sector 52, Gurgaon", "lat": 28.43774, "lng": 77.07257 },
    { "place": "Sector 52, Gurgaon", "lat": 28.43741, "lng": 77.07265 },
    { "place": "Sector 52, Gurgaon", "lat": 28.43786, "lng": 77.07283 },
    { "place": "Sector 84", "lat": 28.4023, "lng": 76.9687 },
    { "place": "Sector 66", "lat": 28.38308, "lng": 77.05218 },
    { "place": "Sector 70, Gurgaon", "lat": 28.38308, "lng": 77.05218 },
    { "place": "Dhankot, Gurgaon", "lat": 28.46683, "lng": 76.96941 },
    { "place": "Sector 18", "lat": 28.49061, "lng": 77.06798 },
    { "place": "Sector 7, Gurgaon", "lat": 28.45569, "lng": 76.97626 },
    { "place": "Sector 7, Gurgaon", "lat": 28.48186, "lng": 76.9905 },
    { "place": "Dhankot, Gurgaon", "lat": 28.47519, "lng": 76.96201 },
    { "place": "Sector 51", "lat": 28.42555, "lng": 77.06483 },
    { "place": "Sector 7, Gurgaon", "lat": 28.48984, "lng": 76.99991 },
    { "place": "Sector 48, Gurgaon", "lat": 28.41075, "lng": 77.02081 },
    { "place": "Sector 23", "lat": 28.51495, "lng": 77.0752 },
    { "place": "Sector 84", "lat": 28.39235, "lng": 76.96748 },
    { "place": "Sector 48, Gurgaon", "lat": 28.41541, "lng": 77.03351 },
    { "place": "Sector 84", "lat": 28.39233, "lng": 76.96749 },
    { "place": "Sector 84", "lat": 28.39244, "lng": 76.96743 },
    { "place": "Sector 24", "lat": 28.50235, "lng": 77.08572 },
    { "place": "Sector 84", "lat": 28.39261, "lng": 76.96736 },
    { "place": "Sector 66", "lat": 28.3976, "lng": 77.0721 },
    { "place": "Sector 66", "lat": 28.39805, "lng": 77.07224 },
    { "place": "Sector 66", "lat": 28.39842, "lng": 77.07259 },
    { "place": "Sector 7, Gurgaon", "lat": 28.45987, "lng": 76.99706 },
    { "place": "Sector 66", "lat": 28.39779, "lng": 77.07169 },
    { "place": "Sector 66", "lat": 28.39815, "lng": 77.07213 },
    { "place": "Sector 66", "lat": 28.39746, "lng": 77.07199 },
    { "place": "Sector 66", "lat": 28.39805, "lng": 77.07207 },
    { "place": "Sector 66", "lat": 28.39852, "lng": 77.07257 },
    { "place": "Sector 66", "lat": 28.3981, "lng": 77.07213 },
    { "place": "Sector 66", "lat": 28.39733, "lng": 77.0725 },
    { "place": "IMT Manesar", "lat": 28.40315, "lng": 76.91558 },
    { "place": "Sector 84", "lat": 28.39229, "lng": 76.96754 },
    { "place": "Sector 24", "lat": 28.50245, "lng": 77.08562 },
    { "place": "Sector 84", "lat": 28.39277, "lng": 76.96761 },
    { "place": "Sector 84", "lat": 28.39225, "lng": 76.96761 },
    { "place": "Sector 51", "lat": 28.4254, "lng": 77.06761 },
    { "place": "Sector 51", "lat": 28.4251, "lng": 77.06795 },
    { "place": "Sector 51", "lat": 28.42506, "lng": 77.06747 },
    { "place": "Sector 24", "lat": 28.51142, "lng": 77.08032 },
    { "place": "Sector 49", "lat": 28.40253, "lng": 77.04523 },
    { "place": "Sector 51", "lat": 28.42542, "lng": 77.0675 },
    { "place": "Sector 7, Gurgaon", "lat": 28.47331, "lng": 77.00919 },
    { "place": "Palam Vihar, Gurgaon", "lat": 28.49621, "lng": 77.02235 },
    { "place": "Sector 7, Gurgaon", "lat": 28.49621, "lng": 77.02235 },
    { "place": "Sector 84", "lat": 28.39036, "lng": 76.95927 },
    { "place": "IMT Manesar", "lat": 28.39036, "lng": 76.95927 },
    { "place": "Sector 52, Gurgaon", "lat": 28.43114, "lng": 77.0899 },
    { "place": "Sector 49", "lat": 28.41264, "lng": 77.0556 },
    { "place": "Sector 52, Gurgaon", "lat": 28.431, "lng": 77.08982 },
    { "place": "Sector 24", "lat": 28.49802, "lng": 77.08972 },
    { "place": "Sector 56, Gurgaon", "lat": 28.42793, "lng": 77.10001 },
    { "place": "Palam Vihar, Gurgaon", "lat": 28.51587, "lng": 77.03594 },
    { "place": "Sector 24", "lat": 28.49654, "lng": 77.089 },
    { "place": "Sector 24", "lat": 28.49653, "lng": 77.08906 },
    { "place": "Sector 24", "lat": 28.49649, "lng": 77.08902 },
    { "place": "Sector 24", "lat": 28.49821, "lng": 77.08981 },
    { "place": "Sector 24", "lat": 28.49652, "lng": 77.08905 },
    { "place": "Sector 84", "lat": 28.39322, "lng": 76.96727 },
    { "place": "Sector 56, Gurgaon", "lat": 28.42839, "lng": 77.09975 },
    { "place": "Sector 56, Gurgaon", "lat": 28.42802, "lng": 77.09972 },
    { "place": "Dhankot, Gurgaon", "lat": 28.46697, "lng": 76.96952 },
    { "place": "Sector 24", "lat": 28.49651, "lng": 77.08907 },
    { "place": "Dhankot, Gurgaon", "lat": 28.46709, "lng": 76.96918 },
    { "place": "Sector 52, Gurgaon", "lat": 28.43869, "lng": 77.0878 },
    { "place": "Sector 48, Gurgaon", "lat": 28.39636, "lng": 77.0273 },
    { "place": "Sector 66", "lat": 28.38247, "lng": 77.05214 },
    { "place": "Sector 70, Gurgaon", "lat": 28.38247, "lng": 77.05214 },
    { "place": "Sector 15", "lat": 28.45817, "lng": 77.02757 },
    { "place": "Sector 7, Gurgaon", "lat": 28.45817, "lng": 77.02757 },
    { "place": "IMT Manesar", "lat": 28.39351, "lng": 76.91505 },
    { "place": "Sector 52, Gurgaon", "lat": 28.44494, "lng": 77.08074 },
    { "place": "Sector 50", "lat": 28.42574, "lng": 77.05771 },
    { "place": "Sector 50", "lat": 28.42581, "lng": 77.0575 },
    { "place": "IMT Manesar", "lat": 28.41451, "lng": 76.91334 },
    { "place": "Patli Hajipur", "lat": 28.41451, "lng": 76.91334 },
    { "place": "Sector 50", "lat": 28.4257, "lng": 77.0578 },
    { "place": "Sector 50", "lat": 28.42553, "lng": 77.05764 },
    { "place": "Sector 50", "lat": 28.42546, "lng": 77.05756 },
    { "place": "Sector 52, Gurgaon", "lat": 28.44485, "lng": 77.08082 },
    { "place": "Sector 52, Gurgaon", "lat": 28.445, "lng": 77.08059 },
    { "place": "Sector 50", "lat": 28.42542, "lng": 77.05758 },
    { "place": "Sector 53", "lat": 28.43424, "lng": 77.10551 },
    { "place": "Sector 50", "lat": 28.42578, "lng": 77.05666 },
    { "place": "Sector 50", "lat": 28.42561, "lng": 77.05781 },
    { "place": "Sector 50", "lat": 28.42545, "lng": 77.05756 },
    { "place": "Sector 50", "lat": 28.42572, "lng": 77.05774 },
    { "place": "Sector 50", "lat": 28.42587, "lng": 77.05766 },
    { "place": "Sector 52, Gurgaon", "lat": 28.44488, "lng": 77.08067 },
    { "place": "Sector 50", "lat": 28.42569, "lng": 77.05789 },
    { "place": "Sector 50", "lat": 28.42566, "lng": 77.05788 },
    { "place": "Sector 52, Gurgaon", "lat": 28.44487, "lng": 77.08059 },
    { "place": "Sector 52, Gurgaon", "lat": 28.44493, "lng": 77.08072 },
    { "place": "Sector 52, Gurgaon", "lat": 28.445, "lng": 77.08076 },
    { "place": "Sector 50", "lat": 28.42572, "lng": 77.05779 },
    { "place": "Sector 49", "lat": 28.40501, "lng": 77.05917 },
    { "place": "Sector 52, Gurgaon", "lat": 28.45081, "lng": 77.07876 },
    { "place": "Sector 49", "lat": 28.41321, "lng": 77.05502 },
    { "place": "Sector 14", "lat": 28.47317, "lng": 77.048 },
    { "place": "Sector 48, Gurgaon", "lat": 28.43387, "lng": 77.03343 },
    { "place": "Sector 28", "lat": 28.47201, "lng": 77.08318 },
    { "place": "IMT Manesar", "lat": 28.40446, "lng": 76.93656 },
    { "place": "IMT Manesar", "lat": 28.40458, "lng": 76.93587 },
    { "place": "Sector 7, Gurgaon", "lat": 28.4648, "lng": 77.00799 },
    { "place": "Sector 48, Gurgaon", "lat": 28.42498, "lng": 77.03909 },
    { "place": "Sector 49", "lat": 28.40215, "lng": 77.06094 },
    { "place": "Sector 48, Gurgaon", "lat": 28.42526, "lng": 77.03889 },
    { "place": "Sector 43, Gurgaon", "lat": 28.46048, "lng": 77.07882 },
    { "place": "Sector 43, Gurgaon", "lat": 28.46038, "lng": 77.07921 },
    { "place": "Sector 43, Gurgaon", "lat": 28.46037, "lng": 77.07876 },
    { "place": "IMT Manesar", "lat": 28.40434, "lng": 76.9364 },
    { "place": "IMT Manesar", "lat": 28.40436, "lng": 76.93604 },
    { "place": "Sector 48, Gurgaon", "lat": 28.41077, "lng": 77.02956 },
    { "place": "Sector 49", "lat": 28.41334, "lng": 77.0548 },
    { "place": "Sector 14", "lat": 28.47352, "lng": 77.04799 },
    { "place": "Sector 49", "lat": 28.40541, "lng": 77.05841 },
    { "place": "Kherki Majra", "lat": 28.49467, "lng": 76.98451 },
    { "place": "Sector 7, Gurgaon", "lat": 28.49467, "lng": 76.98451 },
    { "place": "Sector 49", "lat": 28.42046, "lng": 77.05018 },
    { "place": "Sector 48, Gurgaon", "lat": 28.41801, "lng": 77.03912 },
    { "place": "Sector 28", "lat": 28.47373, "lng": 77.08018 },
    { "place": "Sector 53", "lat": 28.44219, "lng": 77.09488 },
    { "place": "Sector 56, Gurgaon", "lat": 28.4016, "lng": 77.08454 },
    { "place": "Sector 29, Gurgaon", "lat": 28.45943, "lng": 77.07287 },
    { "place": "Sector 31", "lat": 28.44575, "lng": 77.04826 },
    { "place": "Sector 28", "lat": 28.48199, "lng": 77.09663 },
    { "place": "DLF PHASE 1 (SECTOR 26)", "lat": 28.48199, "lng": 77.09663 },
    { "place": "Sector 14", "lat": 28.47056, "lng": 77.04498 },
    { "place": "Sector 56, Gurgaon", "lat": 28.40152, "lng": 77.08515 },
    { "place": "Sector 48, Gurgaon", "lat": 28.39442, "lng": 77.0321 },
    { "place": "Sector 29, Gurgaon", "lat": 28.4587, "lng": 77.07221 },
    { "place": "Sector 15", "lat": 28.45857, "lng": 77.04394 },
    { "place": "Sector 48, Gurgaon", "lat": 28.39384, "lng": 77.03138 },
    { "place": "Sector 15", "lat": 28.45832, "lng": 77.0434 },
    { "place": "Sector 7, Gurgaon", "lat": 28.473, "lng": 77.01785 },
    { "place": "Sector 24", "lat": 28.49076, "lng": 77.09651 },
    { "place": "Sector 33", "lat": 28.44729, "lng": 77.02405 },
    { "place": "Sector 28", "lat": 28.48023, "lng": 77.0806 },
    { "place": "Sector 25", "lat": 28.48023, "lng": 77.0806 },
    { "place": "Sector 7, Gurgaon", "lat": 28.473, "lng": 77.01785 },
    { "place": "IMT Manesar", "lat": 28.39117, "lng": 76.9397 },
    { "place": "Sector 7, Gurgaon", "lat": 28.47323, "lng": 77.01817 },
    { "place": "IMT Manesar", "lat": 28.40229, "lng": 76.96078 },
    { "place": "Sector 84", "lat": 28.40229, "lng": 76.96078 },
    { "place": "Sector 28", "lat": 28.47908, "lng": 77.08193 },
    { "place": "Sector 25", "lat": 28.47908, "lng": 77.08193 },
    { "place": "Sector 28", "lat": 28.47921, "lng": 77.08056 },
    { "place": "Sector 25", "lat": 28.47921, "lng": 77.08056 },
    { "place": "Sector 33", "lat": 28.44861, "lng": 77.02305 },
    { "place": "IMT Manesar", "lat": 28.36566, "lng": 76.94604 },
    { "place": "Patli Hajipur", "lat": 28.36566, "lng": 76.94604 },
    { "place": "Sector 31", "lat": 28.43848, "lng": 77.05141 },
    { "place": "IMT Manesar", "lat": 28.3659, "lng": 76.9459 },
    { "place": "Patli Hajipur", "lat": 28.3659, "lng": 76.9459 },
    { "place": "Sector 109, Gurgaon", "lat": 28.51519, "lng": 77.01596 },
    { "place": "Palam Vihar, Gurgaon", "lat": 28.51519, "lng": 77.01596 },
    { "place": "IMT Manesar", "lat": 28.36561, "lng": 76.94605 },
    { "place": "Patli Hajipur", "lat": 28.36561, "lng": 76.94605 },
    { "place": "IMT Manesar", "lat": 28.36563, "lng": 76.94598 },
    { "place": "Patli Hajipur", "lat": 28.36563, "lng": 76.94598 },
    { "place": "IMT Manesar", "lat": 28.36576, "lng": 76.94612 },
    { "place": "Patli Hajipur", "lat": 28.36576, "lng": 76.94612 },
    { "place": "IMT Manesar", "lat": 28.36566, "lng": 76.94595 },
    { "place": "Patli Hajipur", "lat": 28.36566, "lng": 76.94595 },
    { "place": "IMT Manesar", "lat": 28.36583, "lng": 76.94538 },
    { "place": "Patli Hajipur", "lat": 28.36583, "lng": 76.94538 },
    { "place": "IMT Manesar", "lat": 28.36571, "lng": 76.94627 },
    { "place": "Patli Hajipur", "lat": 28.36571, "lng": 76.94627 },
    { "place": "IMT Manesar", "lat": 28.36653, "lng": 76.94609 },
    { "place": "Patli Hajipur", "lat": 28.36653, "lng": 76.94609 },
    { "place": "IMT Manesar", "lat": 28.36625, "lng": 76.94646 },
    { "place": "Patli Hajipur", "lat": 28.36625, "lng": 76.94646 },
    { "place": "IMT Manesar", "lat": 28.36561, "lng": 76.94601 },
    { "place": "Patli Hajipur", "lat": 28.36561, "lng": 76.94601 },
    { "place": "IMT Manesar", "lat": 28.36682, "lng": 76.94683 },
    { "place": "Patli Hajipur", "lat": 28.36682, "lng": 76.94683 },
    { "place": "IMT Manesar", "lat": 28.36568, "lng": 76.94602 },
    { "place": "Patli Hajipur", "lat": 28.36568, "lng": 76.94602 },
    { "place": "IMT Manesar", "lat": 28.38602, "lng": 76.89323 },
    { "place": "Sector 53", "lat": 28.43516, "lng": 77.10466 },
    { "place": "Sector 24", "lat": 28.51138, "lng": 77.07658 },
    { "place": "Sector 24", "lat": 28.51141, "lng": 77.07659 },
    { "place": "Sector 53", "lat": 28.43725, "lng": 77.10443 },
    { "place": "Palam Vihar, Gurgaon", "lat": 28.51611, "lng": 77.03639 },
    { "place": "Sector 28", "lat": 28.48089, "lng": 77.08545 },
    { "place": "Sector 24", "lat": 28.51199, "lng": 77.07481 },
    { "place": "Patli Hajipur", "lat": 28.36354, "lng": 76.93522 },
    { "place": "IMT Manesar", "lat": 28.36354, "lng": 76.93522 },
    { "place": "Sector 23", "lat": 28.51065, "lng": 77.04834 },
    { "place": "Palam Vihar, Gurgaon", "lat": 28.51065, "lng": 77.04834 },
    { "place": "Sector 18", "lat": 28.49068, "lng": 77.06744 },
    { "place": "Sector 31", "lat": 28.44439, "lng": 77.05201 },
    { "place": "Sector 43, Gurgaon", "lat": 28.45335, "lng": 77.08169 },
    { "place": "Palam Vihar, Gurgaon", "lat": 28.50341, "lng": 77.03317 },
    { "place": "Sector 23", "lat": 28.51114, "lng": 77.04861 },
    { "place": "Palam Vihar, Gurgaon", "lat": 28.51114, "lng": 77.04861 },
    { "place": "Sector 23", "lat": 28.51073, "lng": 77.04822 },
    { "place": "Palam Vihar, Gurgaon", "lat": 28.51073, "lng": 77.04822 },
    { "place": "Sector 46", "lat": 28.43463, "lng": 77.05857 },
    { "place": "Sector 15", "lat": 28.45691, "lng": 77.03657 },
    { "place": "Sector 23", "lat": 28.51068, "lng": 77.04823 },
    { "place": "Palam Vihar, Gurgaon", "lat": 28.51068, "lng": 77.04823 },
    { "place": "Sector 24", "lat": 28.4981, "lng": 77.08402 },
    { "place": "Sector 31", "lat": 28.44467, "lng": 77.05187 },
    { "place": "Sector 57", "lat": 28.42471, "lng": 77.08805 },
    { "place": "Sector 57", "lat": 28.425, "lng": 77.08775 },
    { "place": "Sector 52, Gurgaon", "lat": 28.44111, "lng": 77.08205 },
    { "place": "Sector 57", "lat": 28.4247, "lng": 77.08787 },
    { "place": "Sector 7, Gurgaon", "lat": 28.45758, "lng": 76.98719 },
    { "place": "Sector 46", "lat": 28.43484, "lng": 77.0584 },
    { "place": "Sector 56, Gurgaon", "lat": 28.42157, "lng": 77.10382 },
    { "place": "Sector 24", "lat": 28.50382, "lng": 77.06898 },
    { "place": "Sector 24", "lat": 28.50435, "lng": 77.06902 },
    { "place": "Sector 14", "lat": 28.47721, "lng": 77.04276 },
    { "place": "Sector 14", "lat": 28.48898, "lng": 77.05598 },
    { "place": "Sector 10, Gurgaon", "lat": 28.44983, "lng": 77.00096 },
    { "place": "Sector 47", "lat": 28.42693, "lng": 77.04626 },
    { "place": "Sector 48, Gurgaon", "lat": 28.42693, "lng": 77.04626 },
    { "place": "Sector 48, Gurgaon", "lat": 28.43244, "lng": 77.03633 },
    { "place": "Sector 43, Gurgaon", "lat": 28.46062, "lng": 77.0838 },
    { "place": "IMT Manesar", "lat": 28.37268, "lng": 76.9093 },
    { "place": "Sector 24", "lat": 28.50179, "lng": 77.08344 },
    { "place": "Sector 109, Gurgaon", "lat": 28.50244, "lng": 76.99546 },
    { "place": "Sector 7, Gurgaon", "lat": 28.50244, "lng": 76.99546 },
    { "place": "Sector 15", "lat": 28.45791, "lng": 77.03452 },
    { "place": "Sector 31", "lat": 28.45168, "lng": 77.04414 },
    { "place": "Sector 31", "lat": 28.45282, "lng": 77.05023 },
    { "place": "Sector 24", "lat": 28.50028, "lng": 77.083 },
    { "place": "Sector 56, Gurgaon", "lat": 28.42728, "lng": 77.09829 },
    { "place": "Sector 56, Gurgaon", "lat": 28.42828, "lng": 77.09881 },
    { "place": "Sector 56, Gurgaon", "lat": 28.42729, "lng": 77.09832 },
    { "place": "Sector 48, Gurgaon", "lat": 28.41283, "lng": 77.04263 },
    { "place": "Sector 49", "lat": 28.41283, "lng": 77.04263 },
    { "place": "Sector 23", "lat": 28.50432, "lng": 77.05391 },
    { "place": "Sector 48, Gurgaon", "lat": 28.41198, "lng": 77.04336 },
    { "place": "Sector 49", "lat": 28.41198, "lng": 77.04336 },
    { "place": "Sector 56, Gurgaon", "lat": 28.42726, "lng": 77.09824 },
    { "place": "Sector 48, Gurgaon", "lat": 28.41159, "lng": 77.04229 },
    { "place": "Sector 49", "lat": 28.41159, "lng": 77.04229 },
    { "place": "Patli Hajipur", "lat": 28.37544, "lng": 76.90667 },
    { "place": "IMT Manesar", "lat": 28.37544, "lng": 76.90667 },
    { "place": "Sector 48, Gurgaon", "lat": 28.41177, "lng": 77.04279 },
    { "place": "Sector 49", "lat": 28.41177, "lng": 77.04279 },
    { "place": "Sector 49", "lat": 28.39673, "lng": 77.03954 },
    { "place": "Sector 48, Gurgaon", "lat": 28.39673, "lng": 77.03954 },
    { "place": "Sector 56, Gurgaon", "lat": 28.42725, "lng": 77.0983 },
    { "place": "Sector 56, Gurgaon", "lat": 28.42719, "lng": 77.09815 },
    { "place": "Sector 56, Gurgaon", "lat": 28.42732, "lng": 77.0983 },
    { "place": "Sector 10, Gurgaon", "lat": 28.44008, "lng": 77.00677 },
    { "place": "Sector 31", "lat": 28.45349, "lng": 77.05103 },
    { "place": "IMT Manesar", "lat": 28.42029, "lng": 76.90793 },
    { "place": "Patli Hajipur", "lat": 28.42029, "lng": 76.90793 },
    { "place": "Sector 7, Gurgaon", "lat": 28.47518, "lng": 77.00862 },
    { "place": "Sector 31", "lat": 28.45354, "lng": 77.05074 },
    { "place": "Sector 7, Gurgaon", "lat": 28.47467, "lng": 77.00926 },
    { "place": "Sector 31", "lat": 28.45356, "lng": 77.05119 },
    { "place": "Sector 31", "lat": 28.45343, "lng": 77.05109 },
    { "place": "Sector 31", "lat": 28.45357, "lng": 77.0509 },
    { "place": "Sector 7, Gurgaon", "lat": 28.48429, "lng": 77.01289 },
    { "place": "Sector 31", "lat": 28.45347, "lng": 77.05107 },
    { "place": "IMT Manesar", "lat": 28.37262, "lng": 76.89378 },
    { "place": "Sector 31", "lat": 28.45292, "lng": 77.05028 },
    { "place": "Palam Vihar, Gurgaon", "lat": 28.51168, "lng": 77.04068 },
    { "place": "Sector 23", "lat": 28.51168, "lng": 77.04068 },
    { "place": "Palam Vihar, Gurgaon", "lat": 28.51161, "lng": 77.04041 },
    { "place": "Sector 23", "lat": 28.51161, "lng": 77.04041 },
    { "place": "Palam Vihar, Gurgaon", "lat": 28.51111, "lng": 77.04008 },
    { "place": "Sector 23", "lat": 28.51111, "lng": 77.04008 },
    { "place": "Sector 31", "lat": 28.45085, "lng": 77.04839 },
    { "place": "Sector 56, Gurgaon", "lat": 28.42733, "lng": 77.09811 }
  ]
  let hub = [
    {"lat":28.512871083342556,"lng": 76.98965679466099},
    // {"lat":28.506535590041565, "lng": 77.0833839064799},
    {"lat":28.50804407534139, "lng": 77.08166729271034},
    {"lat":28.489337333243007, "lng": 77.05523144065884},
    {"lat": 28.47485241723225, "lng": 77.03257213890042},
    {"lat": 28.46821283347877, "lng": 76.99926983177063},
    {"lat":28.510457606953906, "lng": 77.03772198020914},
    {"lat": 28.458554512319033, "lng": 76.9697440749339},
    // {"lat":28.39454585275365, "lng":76.95120464622245},
    // {"lat": 28.41145756198129,"lng": 76.9275153762023},
    // {"lat": 28.38186029966025, "lng": 76.90142284690471},
    {"lat": 28.46549651986603, "lng": 77.05763469993624},
    {"lat": 28.442857858224755, "lng": 77.03909527122482},
    {"lat": 28.44044278157142, "lng": 77.06381450950673},
    {"lat": 28.435612462859396, "lng": 77.10295330345308},
    {"lat": 28.410249672275427, "lng": 77.06621776878413},
    {"lat": 28.52252443659806, "lng": 77.02192913352904},
    {"lat": 28.50261342731664, "lng": 76.98725353538359},
    {"lat": 28.44678224018359, "lng": 76.99549328147755},
    {"lat": 28.49325998939122, "lng": 77.01437603294289}
  ]

  let Locations = [
    {"place": 1,"lat": 28.47686, "lng": 77.08518},
    {"place": 2,"lat":28.462719876100092,"lng": 77.0802879999971},
    // {"place": 3,"lat":28.41584,"lng": 77.09116},
    // {"place": 4,"lat":28.40578,"lng": 77.09110},
    // {"place": 5,"lat":28.40148,"lng": 77.06147},
    // {"place": 6,"lat":28.44818,"lng": 77.07311},
    // {"place": 7,"lat":28.44134, "lng": 77.08910},
    {"place": 8,"lat":28.42659,"lng": 77.04637 },
    {"place": 9,"lat": 28.45185,"lng": 77.04287},
    {"lat": 28.44400807967219,"lng": 77.07265509195881},
    {"lat":28.397206666099986,"lng": 77.04948080606958},
    {"lat":28.40562961592259,"lng": 77.0913071734487},
    {"lat":28.431009634550463,"lng": 77.08613977632363}
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
        defaultCenter={{ "lat": 28.45185,"lng": 77.04287 }}
        defaultOptions={{ styles: myStyles }}
      >
        {Locations.map((map, index) => {
          console.log(map);
          return <Marker  
          style={{zIndex: 10000}}
          icon={{
            url: marker2, scaledSize: new window.google.maps.Size(37, 40),
            // origin: new window.google.maps.Point(0, 0),
            // anchor: new window.google.maps.Point(32,65),
            labelOrigin: new window.google.maps.Point(35, 25),
          }} onClick={() => setLocation("Zomato" + index)} position={{ lat: Number(map.lat), lng: Number(map.lng) }} >
            {
              location == `Zomato${index}` ?

                <InfoWindow>
                  <div>
                    {map.place}
                  </div>
                </InfoWindow>
                : null}
          </Marker>;
        })}
        {hub.map((map, index) => {
                    console.log(map);
                    return <Marker icon={{url: marker, scaledSize: new window.google.maps.Size(30, 30),
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
                
      </GoogleMap>
    </div>
  )
}
)

export default MyMapComponent
