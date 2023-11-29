import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { compose, withProps } from "recompose"
import React, { useState, useEffect } from 'react'
import marker from "./Mapmarkers02.png";
import marker2 from "./Mapmarkers03.png";
import marker3 from "./Food Hubs 2.png"
import marker4 from "./Food Hubs 4.png"

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

  let data = [
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041566080, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071899163, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130719940, course: 0.0, frommockprovider: false, latitude: 28.5179785, altitudeaccuracy: 1.7776999473571777, altitude: 208.0, accuracy: 16.510799407958984, longitude: 77.1994532 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128886922, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057605022, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127936795, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 17.060800552368164, altitude: 208.0, accuracy: 78.27320098876953, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130077630, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 18.251420974731445, altitude: 208.0, accuracy: 82.57340240478516, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041571083, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071277820, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 60.25114822387695, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071658967, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128247025, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130812270, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 30.509550094604492, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059998021, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041617119, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060330286, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060448385, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128339085, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691061014597, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 76.21117401123047, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041581092, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071170723, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 22.767200469970703, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128457168, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059967001, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128012845, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 43.67864990234375, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131035402, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130234745, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 73.24166870117188, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071965210, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060300261, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041473998, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060315273, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128451160, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071934185, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128017847, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 45.42900085449219, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060800653, course: 0.0, frommockprovider: false, latitude: 28.5176969, altitudeaccuracy: 2.990799903869629, altitude: 208.59999084472656, accuracy: 25.56719970703125, longitude: 77.2000152 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128273040, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130497409, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 22.802898406982422, altitude: 208.0, accuracy: 98.95659637451172, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127605640, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 42.12044906616211, altitude: 208.0, accuracy: 100.0, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041576087, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060136137, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060218191, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127956807, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 24.065000534057617, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129035040, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130107659, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 28.76156997680664, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128907945, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130974364, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 87.24244689941406, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058536156, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129568703, course: 0.0, frommockprovider: false, latitude: 28.5180005, altitudeaccuracy: 15.693349838256836, altitude: 208.0, accuracy: 70.64140319824219, longitude: 77.1994659 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128232006, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060305266, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060018035, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071904166, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127622138, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 2.316699981689453, altitude: 208.0, accuracy: 18.732799530029297, longitude: 77.1994363 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071534828, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071873145, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127528579, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 15.149099349975586, altitude: 208.0, accuracy: 70.49539947509766, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128841889, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130644210, course: 0.0, frommockprovider: false, latitude: 28.5179836, altitudeaccuracy: 26.010648727416992, altitude: 208.0, accuracy: 100.0, longitude: 77.1994573 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060975688, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 62.59302520751953, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060417360, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128293051, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128891923, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041432969, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071955203, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059822738, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 98.99404907226562, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691061045224, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 86.93062591552734, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072072289, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060325281, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128518216, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128195971, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129030036, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071211760, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 37.13050079345703, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128790855, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130558455, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 44.16899871826172, altitude: 208.0, accuracy: 100.0, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131055418, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071247795, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 49.742401123046875, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127895764, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 2.6999499797821045, altitude: 208.0, accuracy: 20.82979965209961, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071689987, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060146143, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128472178, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130699698, course: 0.0, frommockprovider: false, latitude: 28.5179868, altitudeaccuracy: 8.917349815368652, altitude: 208.0, accuracy: 45.4364013671875, longitude: 77.1994556 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059973002, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128968992, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130087642, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 21.7556209564209, altitude: 208.0, accuracy: 96.59020233154297, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041520032, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128329079, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071480424, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130898321, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 60.62739944458008, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130873305, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 51.871803283691406, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060049063, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128978995, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128805863, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128795858, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071414956, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128446155, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071643956, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057167134, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127723213, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 35.143550872802734, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072046274, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071419958, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131030399, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130649212, course: 0.0, frommockprovider: false, latitude: 28.5179836, altitudeaccuracy: 27.761348724365234, altitude: 208.0, accuracy: 100.0, longitude: 77.1994573 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058231257, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129538680, course: 0.0, frommockprovider: false, latitude: 28.5180005, altitudeaccuracy: 5.185299873352051, altitude: 208.0, accuracy: 28.60919952392578, longitude: 77.1994659 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060008029, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128876914, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058127468, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071884151, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129206861, course: 0.0, frommockprovider: false, latitude: 28.5179956, altitudeaccuracy: 7.463449478149414, altitude: 208.0, accuracy: 38.342796325683594, longitude: 77.199444 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127951804, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 22.314298629760742, altitude: 208.0, accuracy: 99.28719329833984, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130883314, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 55.37494659423828, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041495013, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691056935552, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058530458, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127910776, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 7.9541497230529785, altitude: 208.0, accuracy: 41.84659957885742, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130466383, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 11.94379997253418, altitude: 208.0, accuracy: 55.520198822021484, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060085095, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057146714, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128999012, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059993018, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071216766, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 38.88224792480469, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060881232, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 29.533428192138672, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.10295630246400833, speed: 0.20003540813922882, courseaccuracy: 0.0, timestamp: 1691070074464, course: 296.9951171875, frommockprovider: false, latitude: 28.5386082, altitudeaccuracy: 1.4636234045028687, altitude: 198.09999084472656, accuracy: 4.821000099182129, longitude: 77.2193864 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128103908, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 75.55069732666016, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127208271, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 32.53780746459961, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131025396, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129588720, course: 0.0, frommockprovider: false, latitude: 28.5180005, altitudeaccuracy: 22.69930076599121, altitude: 208.0, accuracy: 98.66520690917969, longitude: 77.1994659 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128303058, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130072627, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 16.5003719329834, altitude: 208.0, accuracy: 75.56919860839844, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127916783, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 10.056599617004395, altitude: 208.0, accuracy: 50.25639724731445, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129190848, course: 0.0, frommockprovider: false, latitude: 28.5179956, altitudeaccuracy: 1.8589000701904297, altitude: 208.0, accuracy: 15.924600601196289, longitude: 77.199444 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130776243, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 17.90009880065918, altitude: 208.0, accuracy: 81.81939697265625, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129075074, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071848122, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129045049, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127647160, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 8.524999618530273, altitude: 208.0, accuracy: 41.928001403808594, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127814284, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 67.01839447021484, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071186736, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 28.371749877929688, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060830132, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 11.64842700958252, altitude: 208.59999084472656, accuracy: 55.248199462890625, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071678981, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060351306, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129232204, course: 0.0, frommockprovider: false, latitude: 28.5180105, altitudeaccuracy: 2.895249843597412, altitude: 208.0, accuracy: 21.39299964904785, longitude: 77.1994699 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060044060, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071257803, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 53.245201110839844, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127728217, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 36.89495086669922, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128037862, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 52.43424987792969, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128200976, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071429084, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128165947, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 97.26399993896484, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128027851, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 48.93040084838867, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060090100, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041377918, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128400126, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060213188, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127718210, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 33.39250183105469, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060340298, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071206756, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 35.37874984741211, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057454099, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127764243, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 49.50404739379883, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128252027, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060850132, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 18.648427963256836, altitude: 208.59999084472656, accuracy: 83.24819946289062, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691056960577, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130938347, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 74.6364974975586, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127135216, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 6.9682111740112305, altitude: 207.89999389648438, accuracy: 34.043800354003906, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128815869, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129553692, course: 0.0, frommockprovider: false, latitude: 28.5180005, altitudeaccuracy: 10.439499855041504, altitude: 208.0, accuracy: 49.625999450683594, longitude: 77.1994659 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128154938, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 93.41120147705078, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127779254, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 54.757896423339844, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060248216, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130067624, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 14.749321937561035, altitude: 208.0, accuracy: 68.56500244140625, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691056940556, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060264229, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128221995, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041438971, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130517427, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 29.8091983795166, altitude: 208.0, accuracy: 100.0, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128836882, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072051276, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071853124, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129558696, course: 0.0, frommockprovider: false, latitude: 28.5180005, altitudeaccuracy: 12.190899848937988, altitude: 208.0, accuracy: 56.63159942626953, longitude: 77.1994659 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041637135, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041627127, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071832103, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071838110, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128769840, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127794264, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 60.01140213012695, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131004382, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 97.74874114990234, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128897933, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041647142, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128314064, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071592918, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128170950, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 99.01504516601562, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071787068, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131040406, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057301941, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127140218, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 8.718910217285156, altitude: 207.89999389648438, accuracy: 41.046600341796875, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129055057, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071272816, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 58.499752044677734, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128134922, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 86.4052505493164, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127667173, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 15.529549598693848, altitude: 208.0, accuracy: 69.94619750976562, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041427964, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059988012, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058105891, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127615646, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 45.6225471496582, altitude: 208.0, accuracy: 100.0, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060243212, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128063876, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 61.539146423339844, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071267811, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 56.74799728393555, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130461381, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 10.193099975585938, altitude: 208.0, accuracy: 48.517398834228516, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130219734, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 67.9878158569336, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059983012, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041387932, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071262808, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 54.9969482421875, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131080434, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060238208, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072112314, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130523433, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 31.911300659179688, altitude: 208.0, accuracy: 100.0, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060034047, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128268040, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041622123, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071868143, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057551447, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130203724, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 62.38432312011719, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128108902, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 77.29824829101562, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072107312, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057561895, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041479003, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071181731, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 26.619998931884766, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060289252, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128375110, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127652163, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 10.276049613952637, altitude: 208.0, accuracy: 48.93219757080078, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127119203, course: 0.0, frommockprovider: false, latitude: 28.5179988, altitudeaccuracy: 2.772749900817871, altitude: 208.0, accuracy: 20.19099998474121, longitude: 77.1994547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060392337, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128042864, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 54.1849479675293, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128426142, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060054068, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058170898, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057636134, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071358066, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 88.33724975585938, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130989374, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 92.4959487915039, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071878148, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127677181, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 19.032350540161133, altitude: 208.0, accuracy: 83.95740509033203, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060279245, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128319068, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691126709152, course: 0.0, frommockprovider: false, latitude: 28.5182185, altitudeaccuracy: 1.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1993761 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127114054, course: 0.0, frommockprovider: false, latitude: 28.517963, altitudeaccuracy: 1.0, altitude: 208.0, accuracy: 115.83000183105469, longitude: 77.1994416 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071985225, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129459369, course: 0.0, frommockprovider: false, latitude: 28.5179796, altitudeaccuracy: 64.99224853515625, altitude: 208.0, accuracy: 100.0, longitude: 77.1994338 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128937968, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127981823, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 32.82060241699219, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041602109, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130847290, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 42.76654815673828, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129131117, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130718940, course: 0.0, frommockprovider: false, latitude: 28.5179838, altitudeaccuracy: 4.442600250244141, altitude: 208.0, accuracy: 27.126399993896484, longitude: 77.1994582 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060320283, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058530458, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127976822, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 31.070249557495117, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127129212, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 4.8668107986450195, altitude: 207.89999389648438, accuracy: 25.638198852539062, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130954352, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 80.23825073242188, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060207184, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071663970, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129573705, course: 0.0, frommockprovider: false, latitude: 28.5180005, altitudeaccuracy: 17.444049835205078, altitude: 208.0, accuracy: 77.64419555664062, longitude: 77.1994659 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072143338, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071776060, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128861905, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071512794, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130112661, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 30.512271881103516, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060162156, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059842752, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127569608, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 29.50925064086914, altitude: 208.0, accuracy: 100.0, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041535048, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060817867, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 7.355677604675293, altitude: 208.59999084472656, accuracy: 38.07720184326172, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060223194, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072001239, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128349093, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057624806, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071571904, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129598727, course: 0.0, frommockprovider: false, latitude: 28.5180005, altitudeaccuracy: 26.20174789428711, altitude: 208.0, accuracy: 100.0, longitude: 77.1994659 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129174598, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071939188, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060990887, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 67.91267395019531, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072067287, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071150707, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 15.76159954071045, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041443974, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071377658, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 95.19445037841797, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060956166, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 55.76032638549805, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071252798, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 51.49380111694336, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071970212, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058211243, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127165242, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 17.477312088012695, altitude: 207.89999389648438, accuracy: 76.08020782470703, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128856901, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129548689, course: 0.0, frommockprovider: false, latitude: 28.5180005, altitudeaccuracy: 8.68844985961914, altitude: 208.0, accuracy: 42.621795654296875, longitude: 77.1994659 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060366319, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059817733, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 97.2426528930664, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060356310, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130893319, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 58.8766975402832, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071812086, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072062284, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128436148, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060432372, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130730214, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 1.789949893951416, altitude: 208.0, accuracy: 17.378799438476562, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130117664, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 32.26332092285156, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129243212, course: 0.0, frommockprovider: false, latitude: 28.5180105, altitudeaccuracy: 6.748050212860107, altitude: 208.0, accuracy: 36.80419921875, longitude: 77.1994699 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.3773561716079712, courseaccuracy: 0.0, timestamp: 1691070989317, course: 358.0334777832031, frommockprovider: false, latitude: 28.5387106, altitudeaccuracy: 2.785130023956299, altitude: 200.0, accuracy: 22.812000274658203, longitude: 77.2192692 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127855319, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 81.38064575195312, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127870330, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 86.6344985961914, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058206239, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130492407, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 21.052200317382812, altitude: 208.0, accuracy: 91.95380401611328, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072077292, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071622943, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130837283, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 39.26409912109375, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129065065, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129930212, course: 0.0, frommockprovider: false, latitude: 28.5179941, altitudeaccuracy: 7.717199802398682, altitude: 208.0, accuracy: 39.3307991027832, longitude: 77.1994629 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128785853, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060151146, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130193716, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 58.881874084472656, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060029043, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071328857, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 78.11409759521484, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127830298, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 72.62329864501953, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071510163, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691061028478, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 81.06952667236328, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060335289, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071924178, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060075088, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130512423, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 28.057798385620117, altitude: 208.0, accuracy: 100.0, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129227203, course: 0.0, frommockprovider: false, latitude: 28.5179943, altitudeaccuracy: 2.908900022506714, altitude: 208.0, accuracy: 20.187599182128906, longitude: 77.1994533 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130822273, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 34.01060104370117, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127155235, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 13.974861145019531, altitude: 207.89999389648438, accuracy: 62.07040023803711, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071766055, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128431146, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129578712, course: 0.0, frommockprovider: false, latitude: 28.5180005, altitudeaccuracy: 19.196500778198242, altitude: 208.0, accuracy: 84.65400695800781, longitude: 77.1994659 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071450108, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127498561, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 4.6427998542785645, altitude: 208.0, accuracy: 28.470199584960938, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060003024, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071145704, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 14.010549545288086, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130456377, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 8.441699981689453, altitude: 208.0, accuracy: 41.51179885864258, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128360100, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130138675, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 39.61717224121094, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127900768, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 4.451350212097168, altitude: 208.0, accuracy: 27.835399627685547, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057217620, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127941800, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 18.812549591064453, altitude: 208.0, accuracy: 85.28019714355469, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128380112, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060940351, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 50.22507858276367, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128825876, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041540051, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128395122, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071130698, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 8.75844955444336, altitude: 198.09999084472656, accuracy: 92.9927978515625, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072092303, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060412352, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130543447, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 38.91619873046875, altitude: 208.0, accuracy: 100.0, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127966815, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 27.567798614501953, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128098895, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 73.7957992553711, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071237791, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 46.240997314453125, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057566932, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691061008593, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 74.10977172851562, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127175248, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 20.97941017150879, altitude: 207.89999389648438, accuracy: 90.0886001586914, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128058873, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 59.78810119628906, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058246266, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041586096, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041468993, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128032854, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 50.68144989013672, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131050414, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041642141, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071715017, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130051611, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 9.144771575927734, altitude: 208.0, accuracy: 46.14680099487305, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127508568, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 8.14525032043457, altitude: 208.0, accuracy: 42.480003356933594, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057324735, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 1.1337107419967651, speed: 0.3863257169723511, courseaccuracy: 0.0, timestamp: 1691060474497, course: 3.8034868240356445, frommockprovider: false, latitude: 28.5177415, altitudeaccuracy: 1.0168991088867188, altitude: 208.09999084472656, accuracy: 4.5879998207092285, longitude: 77.1995336 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130548449, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 40.666900634765625, altitude: 208.0, accuracy: 100.0, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130659220, course: 0.0, frommockprovider: false, latitude: 28.5179836, altitudeaccuracy: 31.264150619506836, altitude: 208.0, accuracy: 100.0, longitude: 77.1994573 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059812219, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 95.31239318847656, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128002838, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 40.17620086669922, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127662168, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 13.778149604797363, altitude: 208.0, accuracy: 62.94059753417969, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127926788, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 13.558349609375, altitude: 208.0, accuracy: 64.26339721679688, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060233200, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041515030, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129111101, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071357065, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 87.98690032958984, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127860322, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 83.13169860839844, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127187253, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 25.18115997314453, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057427640, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060269233, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128180958, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072011249, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130710233, course: 0.0, frommockprovider: false, latitude: 28.5179844, altitudeaccuracy: 3.1738500595092773, altitude: 208.0, accuracy: 21.852399826049805, longitude: 77.1994522 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072016253, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130502415, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 24.55500030517578, altitude: 208.0, accuracy: 100.0, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057064654, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130633203, course: 0.0, frommockprovider: false, latitude: 28.5179836, altitudeaccuracy: 22.158199310302734, altitude: 208.0, accuracy: 97.34479522705078, longitude: 77.1994573 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059864964, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071628945, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128078886, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 66.79264831542969, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130507418, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 26.306049346923828, altitude: 208.0, accuracy: 100.0, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129040044, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127228283, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 39.54166030883789, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041371913, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060397341, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129277975, course: 0.0, frommockprovider: false, latitude: 28.5179878, altitudeaccuracy: 7.991600036621094, altitude: 208.0, accuracy: 41.863399505615234, longitude: 77.1994578 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127544589, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 20.752599716186523, altitude: 208.0, accuracy: 92.9094009399414, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130229742, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 71.49061584472656, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127124206, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 3.114710807800293, altitude: 207.89999389648438, accuracy: 18.62980079650879, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128947975, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130705231, course: 0.0, frommockprovider: false, latitude: 28.5180013, altitudeaccuracy: 2.471400022506714, altitude: 207.89999389648438, accuracy: 19.46860122680664, longitude: 77.1994575 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057572938, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041422960, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691061059811, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 92.03607177734375, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071298834, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 67.60604858398438, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058257276, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130434369, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129168595, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127708204, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 29.890748977661133, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071802080, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057266434, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060443378, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129096090, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130832279, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 37.512699127197266, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127819288, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 68.7697982788086, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129925208, course: 0.0, frommockprovider: false, latitude: 28.5179941, altitudeaccuracy: 5.965449810028076, altitude: 208.0, accuracy: 32.32379913330078, longitude: 77.1994629 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130092647, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 23.507369995117188, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128467175, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128932966, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127170245, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 19.228361129760742, altitude: 207.89999389648438, accuracy: 83.08440399169922, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072097305, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130751226, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 9.144149780273438, altitude: 208.0, accuracy: 46.79560089111328, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041612116, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130786249, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 21.402198791503906, altitude: 208.0, accuracy: 95.82779693603516, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130740221, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 5.292399883270264, altitude: 208.0, accuracy: 31.388599395751953, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127192256, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 26.932209014892578, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060105114, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130127670, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 35.76542282104492, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060961948, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 57.784027099609375, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691056950563, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071602924, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131020393, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060855136, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 20.39982795715332, altitude: 208.59999084472656, accuracy: 90.25379943847656, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071577908, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060936348, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 48.82402420043945, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129248214, course: 0.0, frommockprovider: false, latitude: 28.5180105, altitudeaccuracy: 8.498749732971191, altitude: 208.0, accuracy: 43.80699920654297, longitude: 77.1994699 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130036601, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 3.8912715911865234, altitude: 208.0, accuracy: 25.132801055908203, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130654217, course: 0.0, frommockprovider: false, latitude: 28.5179836, altitudeaccuracy: 29.51310157775879, altitude: 208.0, accuracy: 100.0, longitude: 77.1994573 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128344088, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071587913, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071827101, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071392442, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071160713, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 19.26369857788086, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129050053, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129121109, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060294256, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130041604, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 5.642321586608887, altitude: 208.0, accuracy: 32.137001037597656, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071919172, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130802271, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 27.010250091552734, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060254221, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130183709, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 55.37907028198242, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060284249, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130913329, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 65.88019561767578, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130178705, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 53.62767028808594, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130158689, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 46.622074127197266, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127589621, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 36.51380157470703, altitude: 208.0, accuracy: 100.0, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060192174, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130579096, course: 0.0, frommockprovider: false, latitude: 28.5179836, altitudeaccuracy: 3.220749855041504, altitude: 208.0, accuracy: 21.594999313354492, longitude: 77.1994573 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128810867, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060013031, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058236260, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071909168, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060126132, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128190967, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127203267, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 30.786060333251953, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127160237, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 15.725561141967773, altitude: 207.89999389648438, accuracy: 69.07320404052734, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127238290, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 43.04410934448242, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071336787, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 80.88959503173828, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058165759, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127180250, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 22.73011016845703, altitude: 207.89999389648438, accuracy: 97.09140014648438, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691056920542, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130745223, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 7.043100357055664, altitude: 208.0, accuracy: 38.39140319824219, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060187171, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691061039638, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 84.97552490234375, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060095103, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127626141, course: 0.0, frommockprovider: false, latitude: 28.5179806, altitudeaccuracy: 2.914149761199951, altitude: 208.0, accuracy: 19.89259910583496, longitude: 77.1994386 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127743227, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 42.1484489440918, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128820874, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127600633, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 40.36800003051758, altitude: 208.0, accuracy: 100.0, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128385116, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130994377, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 94.24700164794922, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130446371, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 4.939599990844727, altitude: 208.0, accuracy: 27.503398895263672, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128278043, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128007842, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 41.927249908447266, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131060421, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071996235, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129259896, course: 0.0, frommockprovider: false, latitude: 28.5180105, altitudeaccuracy: 12.587449073791504, altitude: 208.0, accuracy: 60.16179656982422, longitude: 77.1994699 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130858296, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 46.61865234375, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128022849, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 47.18004608154297, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128502207, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130168697, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 50.12487030029297, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128159942, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 95.16224670410156, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128068881, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 63.290897369384766, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060202181, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130570100, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 48.2447509765625, altitude: 208.0, accuracy: 100.0, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130984370, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 90.74454498291016, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128989004, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072102312, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128237009, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130533441, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 35.41409683227539, altitude: 208.0, accuracy: 100.0, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128866909, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131045411, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129543685, course: 0.0, frommockprovider: false, latitude: 28.5180005, altitudeaccuracy: 6.937049865722656, altitude: 208.0, accuracy: 35.6161994934082, longitude: 77.1994659 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071731025, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129492357, course: 0.0, frommockprovider: false, latitude: 28.5179946, altitudeaccuracy: 1.7769360542297363, altitude: 208.0, accuracy: 15.729000091552734, longitude: 77.1994536 }]
    },
    {
      "array": [{ speedaccuracy: 0.15000000596046448, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691070021464, course: 0.0, frommockprovider: false, latitude: 28.5385165, altitudeaccuracy: 2.266273021697998, altitude: 198.09999084472656, accuracy: 13.404999732971191, longitude: 77.2195395 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071781063, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041607112, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127753235, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 45.651248931884766, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127637150, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 5.0214996337890625, altitude: 208.0, accuracy: 27.913997650146484, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058185225, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071535829, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041632132, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060906249, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 38.28937530517578, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128851896, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131009385, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 99.49980163574219, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128309061, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127492553, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 2.5403499603271484, altitude: 208.0, accuracy: 20.060400009155273, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130797254, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 25.253948211669922, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041458984, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130046607, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 7.39337158203125, altitude: 208.0, accuracy: 39.141197204589844, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128129917, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 84.65349578857422, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041397944, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060467690, course: 0.0, frommockprovider: false, latitude: 28.5178941, altitudeaccuracy: 1.0, altitude: 207.89999389648438, accuracy: 500.0, longitude: 77.1997355 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128952978, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691061071711, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 96.2010726928711, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060131134, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128324076, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041484006, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071104680, course: 0.0, frommockprovider: false, latitude: 28.5386524, altitudeaccuracy: 1.5301892757415771, altitude: 198.09999084472656, accuracy: 38.05739974975586, longitude: 77.219269 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058183225, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130817270, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 32.25990295410156, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130766233, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 14.396599769592285, altitude: 208.0, accuracy: 67.8053970336914, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128119909, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 81.15069580078125, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127875334, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 88.38589477539062, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071633949, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128994007, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071863134, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059837745, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072128328, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129527674, course: 0.0, frommockprovider: false, latitude: 28.5180091, altitudeaccuracy: 3.0936999320983887, altitude: 208.0, accuracy: 21.09579849243164, longitude: 77.1994739 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071617939, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071125691, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 7.00600004196167, altitude: 198.09999084472656, accuracy: 85.98300170898438, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128830879, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071736029, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071308840, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 71.108154296875, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127513570, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 9.895949363708496, altitude: 208.0, accuracy: 49.48279571533203, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060980692, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 64.34442138671875, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131014389, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130031599, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 2.1405715942382812, altitude: 208.0, accuracy: 18.130001068115234, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129563699, course: 0.0, frommockprovider: false, latitude: 28.5180005, altitudeaccuracy: 13.941949844360352, altitude: 208.0, accuracy: 63.635799407958984, longitude: 77.1994659 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129609847, course: 0.0, frommockprovider: false, latitude: 28.5179889, altitudeaccuracy: 1.0, altitude: 208.0, accuracy: 13.416999816894531, longitude: 77.1994548 }]
    },
    {
      "array": [{ speedaccuracy: 0.08062257617712021, speed: 0.5408355593681335, courseaccuracy: 0.0, timestamp: 1691060541497, course: 66.42913818359375, frommockprovider: false, latitude: 28.5177035, altitudeaccuracy: 1.042360782623291, altitude: 208.59999084472656, accuracy: 4.796999931335449, longitude: 77.2001273 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060866176, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 24.26382827758789, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691056964578, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129163236, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128227003, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691061029479, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 81.41987609863281, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060156152, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060945354, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 51.97612380981445, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691056925545, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041366908, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060917950, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 42.384727478027344, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060346302, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041382921, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058190228, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127774250, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 53.00649642944336, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071135700, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 10.509150505065918, altitude: 198.09999084472656, accuracy: 99.99560546875, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041545055, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060901246, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 36.538326263427734, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072133331, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127218277, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 36.0395622253418, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060228197, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129507369, course: 0.0, frommockprovider: false, latitude: 28.5179946, altitudeaccuracy: 7.031136512756348, altitude: 208.0, accuracy: 36.74580001831055, longitude: 77.1994536 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071756050, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127485555, course: 0.0, frommockprovider: false, latitude: 28.517988, altitudeaccuracy: 84.6895523071289, altitude: 208.0, accuracy: 100.0, longitude: 77.1994427 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129533676, course: 0.0, frommockprovider: false, latitude: 28.5180005, altitudeaccuracy: 3.4338998794555664, altitude: 208.0, accuracy: 21.603599548339844, longitude: 77.1994659 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128846893, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071673977, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129024032, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128334082, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129915201, course: 0.0, frommockprovider: false, latitude: 28.5179941, altitudeaccuracy: 2.4629998207092285, altitude: 208.0, accuracy: 18.31399917602539, longitude: 77.1994629 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128973993, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060070083, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127986826, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 34.57164764404297, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129497360, course: 0.0, frommockprovider: false, latitude: 28.5179946, altitudeaccuracy: 3.5279860496520996, altitude: 208.0, accuracy: 22.733200073242188, longitude: 77.1994536 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060361313, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128962988, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129070069, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127145223, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 10.470661163330078, altitude: 207.89999389648438, accuracy: 48.0536003112793, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130852292, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 44.517250061035156, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128421139, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130143680, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 41.36892318725586, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041551063, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130472387, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 14.045199394226074, altitude: 208.0, accuracy: 63.92579650878906, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060310273, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127835301, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 74.37435150146484, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128390120, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071668973, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127213274, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 34.28851318359375, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130807262, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 28.756750106811523, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060886236, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 31.284828186035156, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071684983, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128175954, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.10816653817892075, speed: 0.007132296450436115, courseaccuracy: 0.0, timestamp: 1691070097464, course: 0.0, frommockprovider: false, latitude: 28.5386178, altitudeaccuracy: 1.5386470556259155, altitude: 198.09999084472656, accuracy: 3.9000000953674316, longitude: 77.2193746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129185845, course: 0.0, frommockprovider: false, latitude: 28.5180151, altitudeaccuracy: 1.8610000610351562, altitude: 208.0, accuracy: 16.57499885559082, longitude: 77.1994779 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071227775, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 42.73540115356445, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127809280, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 65.26699829101562, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059870008, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071475424, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071746038, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130056615, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 10.896171569824219, altitude: 208.0, accuracy: 53.15239715576172, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127799270, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 61.76350021362305, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071318850, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 74.61199951171875, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130735217, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 3.5410001277923584, altitude: 208.0, accuracy: 24.382999420166016, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127825292, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 70.87120056152344, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127533583, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 16.900501251220703, altitude: 208.0, accuracy: 77.5009994506836, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131065425, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127697196, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 26.037601470947266, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071695000, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128917958, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071771057, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058252270, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130477390, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 15.796250343322754, altitude: 208.0, accuracy: 70.93000030517578, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130132672, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 37.51647186279297, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058142478, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130153685, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 44.870670318603516, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127692193, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 24.286548614501953, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071140702, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 12.25985050201416, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060110118, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128477182, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071221772, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 40.63434982299805, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060059071, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129238208, course: 0.0, frommockprovider: false, latitude: 28.5180105, altitudeaccuracy: 4.996649742126465, altitude: 208.0, accuracy: 29.798599243164062, longitude: 77.1994699 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060861153, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 22.50577735900879, altitude: 208.59999084472656, accuracy: 98.67759704589844, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071817090, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130878312, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 53.62424850463867, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130771240, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 16.149049758911133, altitude: 208.0, accuracy: 74.81520080566406, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127682185, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 20.783750534057617, altitude: 208.0, accuracy: 90.96300506591797, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071323856, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 76.3637466430664, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071288825, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 64.1029052734375, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060840125, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 15.145977020263672, altitude: 208.59999084472656, accuracy: 69.2384033203125, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059978005, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041505021, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129593724, course: 0.0, frommockprovider: false, latitude: 28.5180005, altitudeaccuracy: 24.450698852539062, altitude: 208.0, accuracy: 100.0, longitude: 77.1994659 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127748230, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 43.89984893798828, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127185253, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 24.48116111755371, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041530043, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129278976, course: 0.0, frommockprovider: false, latitude: 28.5179796, altitudeaccuracy: 1.854699969291687, altitude: 208.0, accuracy: 17.209800720214844, longitude: 77.1994338 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060172162, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128185962, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071313847, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 72.860595703125, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129091088, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127523576, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 13.398050308227539, altitude: 208.0, accuracy: 63.49120330810547, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130999379, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 95.99769592285156, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128144930, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 89.90805053710938, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041500018, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130097653, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 25.259469985961914, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041402947, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072031264, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057630130, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057357825, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059807855, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 93.78500366210938, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128800860, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691061050798, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 88.88187408447266, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130725212, course: 0.0, frommockprovider: false, latitude: 28.5179872, altitudeaccuracy: 1.8004499673843384, altitude: 208.0, accuracy: 15.322799682617188, longitude: 77.1994536 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127769246, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 51.25510025024414, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127961812, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 25.816749572753906, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.9766546487808228, courseaccuracy: 0.0, timestamp: 1691070719857, course: 61.20256805419922, frommockprovider: false, latitude: 28.5387239, altitudeaccuracy: 5.078520774841309, altitude: 200.0, accuracy: 23.81999969482422, longitude: 77.2192907 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130827276, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 35.76165008544922, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127865326, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 84.88310241699219, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128775845, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129126114, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127890761, course: 0.0, frommockprovider: false, latitude: 28.5179679, altitudeaccuracy: 2.9633357524871826, altitude: 208.0, accuracy: 20.913999557495117, longitude: 77.1994436 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127921782, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 11.806249618530273, altitude: 208.0, accuracy: 57.25499725341797, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059961682, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.12806248664855957, speed: 0.902960479259491, courseaccuracy: 0.0, timestamp: 1691070050356, course: 262.3867492675781, frommockprovider: false, latitude: 28.53857, altitudeaccuracy: 1.7156816720962524, altitude: 198.09999084472656, accuracy: 18.238000869750977, longitude: 77.2194157 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128513212, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041417956, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041556069, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041448979, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127564607, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 27.75925064086914, altitude: 208.0, accuracy: 100.0, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041489010, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071720019, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130487404, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 19.301149368286133, altitude: 208.0, accuracy: 84.94960021972656, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072118319, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071485572, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072041272, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058221249, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060039052, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128114906, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 79.39964294433594, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071120688, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 5.254949569702148, altitude: 198.09999084472656, accuracy: 78.97879791259766, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071283822, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 62.352203369140625, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041463989, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130027596, course: 0.0, frommockprovider: false, latitude: 28.5179941, altitudeaccuracy: 41.801246643066406, altitude: 208.0, accuracy: 100.0, longitude: 77.1994629 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058196233, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691056955570, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072138334, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071990231, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128881921, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130969360, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 85.49140167236328, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071751043, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071303837, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 69.35710144042969, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060024040, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060402343, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127845309, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 77.87715148925781, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691061069709, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 95.500732421875, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 3.1769769191741943, courseaccuracy: 0.0, timestamp: 1691070178588, course: 276.0099182128906, frommockprovider: false, latitude: 28.5385984, altitudeaccuracy: 1.5112791061401367, altitude: 198.09999084472656, accuracy: 32.981998443603516, longitude: 77.2193747 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127657166, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 12.027099609375, altitude: 208.0, accuracy: 55.936397552490234, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130923339, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 69.38369750976562, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128416135, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127233287, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 41.29341125488281, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129060061, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041412953, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071176728, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 24.86894989013672, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130553451, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 42.417598724365234, altitude: 208.0, accuracy: 100.0, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071201753, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 33.62770080566406, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127687189, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 22.53514862060547, altitude: 208.0, accuracy: 97.96859741210938, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130482403, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 17.550798416137695, altitude: 208.0, accuracy: 77.94819641113281, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071191738, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 30.12244987487793, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060371322, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128355097, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071950200, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060812859, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 5.602877616882324, altitude: 208.59999084472656, accuracy: 31.06599998474121, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059827740, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128492191, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060100105, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071741033, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060951159, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 54.007877349853516, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072087301, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127538586, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 18.651548385620117, altitude: 208.0, accuracy: 84.50519561767578, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129086082, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060080092, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129502365, course: 0.0, frommockprovider: false, latitude: 28.5179946, altitudeaccuracy: 5.279735565185547, altitude: 208.0, accuracy: 29.74020004272461, longitude: 77.1994536 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127610643, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 43.871498107910156, altitude: 208.0, accuracy: 100.0, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071529773, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071165717, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 21.015100479125977, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130689693, course: 0.0, frommockprovider: false, latitude: 28.5179868, altitudeaccuracy: 5.415599822998047, altitude: 208.0, accuracy: 31.429399490356445, longitude: 77.1994556 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058122466, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071648960, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128149934, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 91.65945434570312, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129477604, course: 0.0, frommockprovider: false, latitude: 28.5179723, altitudeaccuracy: 2.257550001144409, altitude: 208.0, accuracy: 17.655200958251953, longitude: 77.1994481 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130061619, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 12.647571563720703, altitude: 208.0, accuracy: 60.157997131347656, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129014025, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130188713, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 57.13047409057617, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127886760, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 92.38500213623047, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129201859, course: 0.0, frommockprovider: false, latitude: 28.5179956, altitudeaccuracy: 5.71274995803833, altitude: 208.0, accuracy: 31.34000015258789, longitude: 77.199444 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128767367, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127631147, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 2.92044997215271, altitude: 208.0, accuracy: 19.50979995727539, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128283045, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129462858, course: 0.0, frommockprovider: false, latitude: 28.5179859, altitudeaccuracy: 3.900644302368164, altitude: 208.0, accuracy: 24.444799423217773, longitude: 77.1994484 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059832743, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130538444, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 37.1651496887207, altitude: 208.0, accuracy: 100.0, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130676687, course: 0.0, frommockprovider: false, latitude: 28.5179836, altitudeaccuracy: 37.37759780883789, altitude: 208.0, accuracy: 100.0, longitude: 77.1994573 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060891242, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 33.03692626953125, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058177916, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128411132, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129019028, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128871911, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128093893, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 72.04509735107422, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128083889, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 68.54369354248047, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041561074, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127223281, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 37.790958404541016, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058201237, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129920204, course: 0.0, frommockprovider: false, latitude: 28.5179941, altitudeaccuracy: 4.214049816131592, altitude: 208.0, accuracy: 25.318199157714844, longitude: 77.1994629 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071894161, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128242016, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130163694, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 48.37382125854492, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127880338, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 90.13729858398438, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060116121, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127584618, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 34.76274871826172, altitude: 208.0, accuracy: 100.0, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129116104, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129080078, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127198265, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 29.03536033630371, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058241264, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071822093, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127713207, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 31.641448974609375, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130664224, course: 0.0, frommockprovider: false, latitude: 28.5179836, altitudeaccuracy: 33.01554870605469, altitude: 208.0, accuracy: 100.0, longitude: 77.1994573 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129910198, course: 0.0, frommockprovider: false, latitude: 28.5179688, altitudeaccuracy: 20.268014907836914, altitude: 208.0, accuracy: 87.75719451904297, longitude: 77.1994411 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691056930547, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071705011, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128365103, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072057282, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130959354, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 81.98895263671875, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129106096, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130679687, course: 0.0, frommockprovider: false, latitude: 28.5179868, altitudeaccuracy: 1.9134999513626099, altitude: 208.0, accuracy: 17.42099952697754, longitude: 77.1994556 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130173700, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 51.87592315673828, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691056909464, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127703200, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 28.138999938964844, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128922959, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060141140, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058112330, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128047866, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 55.93564987182617, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127733220, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 38.645999908447266, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 1.0547511577606201, speed: 0.11246558278799057, courseaccuracy: 0.0, timestamp: 1691060564497, course: 33.4913444519043, frommockprovider: false, latitude: 28.5177104, altitudeaccuracy: 1.1697264909744263, altitude: 208.59999084472656, accuracy: 13.032999992370605, longitude: 77.2001372 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071293830, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 65.85464477539062, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129136121, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128942972, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071196741, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 31.873498916625977, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130209727, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 64.48536682128906, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127738223, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 40.39704895019531, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130863299, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 48.36969757080078, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129141124, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060453390, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060121125, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130082640, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 20.004920959472656, altitude: 208.0, accuracy: 89.58740234375, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060407347, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130639208, course: 0.0, frommockprovider: false, latitude: 28.5179836, altitudeaccuracy: 24.259950637817383, altitude: 208.0, accuracy: 100.0, longitude: 77.1994573 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041391933, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128088892, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 70.29474639892578, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071960206, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072021255, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129525677, course: 0.0, frommockprovider: false, latitude: 28.5179946, altitudeaccuracy: 13.438935279846191, altitude: 208.0, accuracy: 62.37699890136719, longitude: 77.1994536 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129482607, course: 0.0, frommockprovider: false, latitude: 28.5179723, altitudeaccuracy: 4.008599758148193, altitude: 208.0, accuracy: 24.659399032592773, longitude: 77.1994481 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041510025, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060922955, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 44.136474609375, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131574035, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 73.58929443359375, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057014616, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127248804, course: 0.0, frommockprovider: false, latitude: 28.5179803, altitudeaccuracy: 4.334371566772461, altitude: 208.0, accuracy: 24.10919952392578, longitude: 77.1994618 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127997835, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 38.424800872802734, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130868302, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 50.120750427246094, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128462172, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130949350, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 78.48789978027344, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131151933, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 7.810299873352051, altitude: 208.0, accuracy: 39.73419952392578, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128257031, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127804276, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 63.51559829711914, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128441151, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060896245, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 34.7879753112793, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072082299, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128497195, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128216992, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060876221, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 27.779577255249023, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127905773, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 6.203100204467773, altitude: 208.0, accuracy: 34.84239959716797, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060197177, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131075431, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060177166, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132119438, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127672177, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 17.280948638916016, altitude: 208.0, accuracy: 76.95179748535156, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071607932, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129004018, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129196854, course: 0.0, frommockprovider: false, latitude: 28.5179956, altitudeaccuracy: 3.9609999656677246, altitude: 208.0, accuracy: 24.33300018310547, longitude: 77.199444 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130964358, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 83.74034881591797, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.9860020279884338, speed: 0.5779992938041687, courseaccuracy: 61.09140396118164, timestamp: 1691060535497, course: 65.6959457397461, frommockprovider: false, latitude: 28.5177019, altitudeaccuracy: 1.019168496131897, altitude: 208.59999084472656, accuracy: 3.86299991607666, longitude: 77.200114 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127784257, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 56.509300231933594, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130438368, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 2.138550043106079, altitude: 208.0, accuracy: 16.2992000579834, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071431086, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057610388, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071242792, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 47.99134826660156, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691056914536, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130630133, course: 0.0, frommockprovider: false, latitude: 28.5179836, altitudeaccuracy: 21.08370018005371, altitude: 208.0, accuracy: 93.04679870605469, longitude: 77.1994573 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127991829, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 36.322696685791016, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130761231, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 12.645898818969727, altitude: 208.0, accuracy: 60.80259704589844, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131259020, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 45.290748596191406, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128927961, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071612933, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060871196, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 26.021177291870117, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071792071, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132189991, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060064078, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071725023, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130888316, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 57.125648498535156, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060259227, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071710013, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131086439, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127487552, course: 0.0, frommockprovider: false, latitude: 28.5179803, altitudeaccuracy: 2.561699867248535, altitude: 208.0, accuracy: 19.72679901123047, longitude: 77.199445 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131300054, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 59.65264892578125, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130224739, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 69.73957061767578, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128053869, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 58.03670120239258, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127503563, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 6.393499851226807, altitude: 208.0, accuracy: 35.472999572753906, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128124914, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 82.90245056152344, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127579617, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 33.01239776611328, altitude: 208.0, accuracy: 100.0, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127789261, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 58.26034927368164, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691061002153, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 71.85577392578125, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041596105, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131579039, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 75.34034729003906, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131070428, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127595628, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 38.616249084472656, altitude: 208.0, accuracy: 100.0, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130148683, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 43.119972229003906, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060966414, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 59.34712219238281, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128487189, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071929181, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133289758, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071761051, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130791252, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 23.153249740600586, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071469424, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128288048, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130928340, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 71.13404846191406, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132353398, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134015873, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130528437, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 33.663047790527344, altitude: 208.0, accuracy: 100.0, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060167161, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131431936, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 23.854297637939453, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127840305, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 76.12574768066406, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072123322, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127758239, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 47.40264892578125, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133156637, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132496500, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130684691, course: 0.0, frommockprovider: false, latitude: 28.5179868, altitudeaccuracy: 3.6648998260498047, altitude: 208.0, accuracy: 24.426599502563477, longitude: 77.1994556 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129473611, course: 0.0, frommockprovider: false, latitude: 28.5179834, altitudeaccuracy: 5.497849941253662, altitude: 208.0, accuracy: 29.660400390625, longitude: 77.1994537 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072026260, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129583715, course: 0.0, frommockprovider: false, latitude: 28.5180005, altitudeaccuracy: 20.94754981994629, altitude: 208.0, accuracy: 91.658203125, longitude: 77.1994659 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130198721, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 60.63327407836914, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130440368, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 2.838549852371216, altitude: 208.0, accuracy: 19.099199295043945, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128263033, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128298055, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127549594, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 22.504350662231445, altitude: 208.0, accuracy: 99.9164047241211, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127931791, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 15.309399604797363, altitude: 208.0, accuracy: 71.2676010131836, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060376325, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071464415, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128780848, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130918337, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 67.63300323486328, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058216246, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127642156, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 6.773600101470947, altitude: 208.0, accuracy: 34.922401428222656, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128983999, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833291360, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 85.48265075683594, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071700005, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127850316, course: 0.0, frommockprovider: false, latitude: 28.5179911, altitudeaccuracy: 79.62960052490234, altitude: 208.0, accuracy: 100.0, longitude: 77.1994449 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127574613, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 31.26099967956543, altitude: 208.0, accuracy: 100.0, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060835121, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 13.394577026367188, altitude: 208.59999084472656, accuracy: 62.2327995300293, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128912951, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131778722, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 7.745550155639648, altitude: 208.1999969482422, accuracy: 34.040199279785156, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128508210, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130102657, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 27.0108699798584, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131222985, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 32.67850112915039, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132018897, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 91.80680084228516, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130908331, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 64.13089752197266, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071975219, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128205982, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133075557, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132099943, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128957984, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130214731, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 66.23676300048828, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071980223, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059848756, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131548016, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 64.4822998046875, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060381330, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060985881, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 66.16057586669922, altitude: 208.59999084472656, accuracy: 100.0, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131502981, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 48.72005081176758, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691056945559, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130451374, course: 0.0, frommockprovider: false, latitude: 28.5179992, altitudeaccuracy: 6.69064998626709, altitude: 208.0, accuracy: 34.507598876953125, longitude: 77.1994464 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 1.8996306657791138, courseaccuracy: 0.0, timestamp: 1691070453155, course: 84.49849700927734, frommockprovider: false, latitude: 28.5386565, altitudeaccuracy: 1.1750049591064453, altitude: 200.0, accuracy: 34.29499816894531, longitude: 77.2194525 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132089938, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133969833, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131732126, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833392415, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057407920, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130574093, course: 0.0, frommockprovider: false, latitude: 28.5179723, altitudeaccuracy: 3.2224998474121094, altitude: 208.0, accuracy: 21.118999481201172, longitude: 77.1994484 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071889157, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131533003, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 59.227752685546875, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127559602, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 26.00714874267578, altitude: 208.0, accuracy: 100.0, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128073884, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 65.04195404052734, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132084936, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131126471, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130781244, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 19.650798797607422, altitude: 208.0, accuracy: 88.82219696044922, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131405923, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 14.749750137329102, altitude: 208.0, accuracy: 66.59500122070312, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071945196, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131808742, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 18.25255012512207, altitude: 208.1999969482422, accuracy: 76.06819915771484, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833326379, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 97.73930358886719, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128406129, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132134874, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131645091, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 98.45854949951172, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071653962, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129935218, course: 0.0, frommockprovider: false, latitude: 28.5179941, altitudeaccuracy: 9.468950271606445, altitude: 208.0, accuracy: 46.337799072265625, longitude: 77.1994629 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133964829, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131609061, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 85.84805297851562, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132435462, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129603729, course: 0.0, frommockprovider: false, latitude: 28.5180005, altitudeaccuracy: 27.952451705932617, altitude: 208.0, accuracy: 100.0, longitude: 77.1994659 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058132471, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132593571, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060422365, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132628601, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131289045, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 55.799503326416016, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131345090, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 75.41525268554688, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131156936, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 9.561349868774414, altitude: 208.0, accuracy: 46.738399505615234, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128139925, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 88.15630340576172, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134121962, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132440466, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133105588, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131471961, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 37.8630485534668, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133187667, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130903325, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 62.37879943847656, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058137482, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060437374, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071858128, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133197675, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071597921, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131350093, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 77.16629791259766, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058116464, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132079934, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071498912, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131564029, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 70.08685302734375, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134025884, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131972867, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 75.69629669189453, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833412434, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071109682, course: 0.0, frommockprovider: false, latitude: 28.5386524, altitudeaccuracy: 3.2808895111083984, altitude: 198.09999084472656, accuracy: 45.06019973754883, longitude: 77.219269 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133927795, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128211988, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133979844, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132170904, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131330078, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 70.1613998413086, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131696132, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132399425, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131269030, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 48.794246673583984, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133948813, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833331380, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 99.4896469116211, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041407949, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127554598, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 24.255748748779297, altitude: 208.0, accuracy: 100.0, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128370107, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130979366, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 88.99314880371094, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691057152719, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060274240, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041591101, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071914170, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833438450, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130933343, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 72.88510131835938, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691059860741, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127518574, course: 0.0, frommockprovider: false, latitude: 28.517975, altitudeaccuracy: 11.64734935760498, altitude: 208.0, accuracy: 56.48839569091797, longitude: 77.1994467 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127971818, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 29.318851470947266, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072036268, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132633603, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133253722, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041453982, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060182168, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130756228, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 10.89484977722168, altitude: 208.0, accuracy: 53.79840087890625, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129487353, course: 0.0, frommockprovider: false, latitude: 28.5179723, altitudeaccuracy: 5.6697001457214355, altitude: 208.0, accuracy: 31.303800582885742, longitude: 77.1994481 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127150226, course: 0.0, frommockprovider: false, latitude: 28.5180008, altitudeaccuracy: 12.221710205078125, altitude: 207.89999389648438, accuracy: 55.057796478271484, longitude: 77.1994722 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131599054, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 82.34559631347656, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132506512, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133943811, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131926838, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 59.586151123046875, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131824753, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 23.856399536132812, altitude: 208.1999969482422, accuracy: 98.48359680175781, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071638951, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060845128, course: 0.0, frommockprovider: false, latitude: 28.5177048, altitudeaccuracy: 16.89702796936035, altitude: 208.59999084472656, accuracy: 76.24259948730469, longitude: 77.1999901 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131702104, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131951853, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 68.34140014648438, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133258724, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071797077, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129009022, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132379414, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131426934, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 22.103599548339844, altitude: 208.0, accuracy: 96.0103988647461, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071517897, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691041525037, course: 0.0, frommockprovider: false, latitude: 28.5180206, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994991 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133319783, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132165902, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130694695, course: 0.0, frommockprovider: false, latitude: 28.5179868, altitudeaccuracy: 7.166299819946289, altitude: 208.0, accuracy: 38.43219757080078, longitude: 77.1994556 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058147480, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058105891, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134096945, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131921833, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 57.83440017700195, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833280353, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 81.63019561767578, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691058226253, course: 0.0, frommockprovider: false, latitude: 28.5180141, altitudeaccuracy: 100.0, altitude: 207.79998779296875, accuracy: 100.0, longitude: 77.1994862 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132053918, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071807083, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833321378, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 95.98895263671875, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131441951, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 27.35955047607422, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133217689, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071363070, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 90.0886459350586, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132180912, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133026528, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128902939, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691128482184, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132208694, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133954820, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131315068, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 64.90754699707031, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131111456, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130944349, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 76.73719787597656, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071232786, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 44.48925018310547, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131594049, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 80.5938491821289, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132659623, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071155709, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 17.512300491333008, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131844769, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 30.86199951171875, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071582910, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060386333, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132374411, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691129101099, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130842287, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 41.015499114990234, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691130122666, course: 0.0, frommockprovider: false, latitude: 28.5179629, altitudeaccuracy: 34.01402282714844, altitude: 208.0, accuracy: 100.0, longitude: 77.1994461 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134065921, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132124868, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134101949, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131456954, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 32.610599517822266, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132669627, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132302358, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132389419, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133151630, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132654619, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691060427367, course: 0.0, frommockprovider: false, latitude: 28.51802, altitudeaccuracy: 100.0, altitude: 207.89999389648438, accuracy: 100.0, longitude: 77.1994746 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133070553, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131936843, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 63.08789825439453, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134055911, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131264025, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 47.04249954223633, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131096446, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071843116, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071566901, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131829758, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 25.60849952697754, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833361401, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131244002, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 40.03445053100586, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133891767, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131410926, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 16.50079917907715, altitude: 208.0, accuracy: 73.59919738769531, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132526529, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133238705, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131604057, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 84.09664916992188, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131655102, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133141622, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131177951, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 16.91659927368164, altitude: 208.0, accuracy: 76.1594009399414, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132033905, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 97.05995178222656, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131481966, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 41.36479949951172, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132058931, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131486971, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 43.11655044555664, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691072006245, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 100.0, altitude: 198.09999084472656, accuracy: 100.0, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131380907, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 5.994150161743164, altitude: 208.0, accuracy: 31.572601318359375, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134116959, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132572556, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131491974, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 44.86759948730469, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131635080, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 94.95469665527344, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132455473, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133273741, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133227695, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131905818, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 52.229148864746094, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131284040, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 54.048095703125, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131182954, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 18.66765022277832, altitude: 208.0, accuracy: 83.16360473632812, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.5220153331756592, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691071115686, course: 0.0, frommockprovider: false, latitude: 28.5386523, altitudeaccuracy: 3.5042500495910645, altitude: 198.09999084472656, accuracy: 71.97599792480469, longitude: 77.2192683 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131161940, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 11.312749862670898, altitude: 208.0, accuracy: 53.74399948120117, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131091442, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133037532, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133054545, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132074932, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131864783, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 37.86689758300781, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131946848, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 66.58965301513672, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131620068, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 89.70049285888672, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833341387, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833351393, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132104945, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132023901, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 93.55819702148438, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131956856, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 70.09244537353516, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133126606, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132460478, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132618597, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132674629, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131212977, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 29.17569923400879, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131977871, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 77.44770050048828, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131375903, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 4.24275016784668, altitude: 208.0, accuracy: 24.567001342773438, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131625071, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 91.45155334472656, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131962860, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 72.19384765625, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132638608, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131254013, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 43.53865051269531, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133309774, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833306371, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 90.73650360107422, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131451951, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 30.85955047607422, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131997888, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 84.45364379882812, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132450471, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132689638, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131895809, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 48.72599792480469, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131461956, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 34.36130142211914, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131727123, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131295052, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 57.901947021484375, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132531532, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133294762, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132480490, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132002890, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 86.204345703125, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134010869, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132175908, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132562550, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134071925, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134152996, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691127946800, course: 0.0, frommockprovider: false, latitude: 28.517981, altitudeaccuracy: 20.562549591064453, altitude: 208.0, accuracy: 92.28019714355469, longitude: 77.1994487 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132557547, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131849772, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 32.6130485534668, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131116462, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132043912, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133889992, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133897780, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131722120, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132491498, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133021066, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833336385, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833407431, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132552544, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131310064, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 63.156150817871094, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833311374, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 92.487548828125, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133131612, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132160895, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133202679, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131788727, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 11.247300148010254, altitude: 208.1999969482422, accuracy: 48.04719924926758, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131589046, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 78.84280395507812, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132343393, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132139880, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134076932, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134126969, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131227988, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 34.42955017089844, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132536533, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132144884, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132224282, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131553019, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 66.23334503173828, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132048914, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133042534, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833296366, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 87.23474884033203, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133120600, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133192670, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132323375, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133907783, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133182662, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131192961, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 22.17009925842285, altitude: 208.0, accuracy: 97.17340087890625, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131166944, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 13.0641508102417, altitude: 208.0, accuracy: 60.749603271484375, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133299767, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131131919, course: 0.0, frommockprovider: false, latitude: 28.5179976, altitudeaccuracy: 2.5333499908447266, altitude: 208.0, accuracy: 18.166400909423828, longitude: 77.1994447 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131335082, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 71.91244506835938, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833301368, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 88.98544311523438, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133059548, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131941845, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 64.83859252929688, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134081936, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133248717, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833397423, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132129870, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133922791, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833433447, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131569033, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 71.83824920654297, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132008892, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 88.30504608154297, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134091942, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134060915, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133233700, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833387412, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131538007, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 60.979148864746094, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132195298, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131814747, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 20.354299545288086, altitude: 208.1999969482422, accuracy: 84.4751968383789, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133207682, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833428444, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132268481, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133278748, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133912786, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131803739, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 16.50149917602539, altitude: 208.1999969482422, accuracy: 69.06400299072266, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833423441, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131691129, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131507985, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 50.47145080566406, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131798736, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 14.750449180603027, altitude: 208.1999969482422, accuracy: 62.05979537963867, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131931843, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 61.33789825439453, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133994856, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131707108, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134086939, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133917788, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132511518, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833286356, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 83.73124694824219, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131121468, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134158000, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131320072, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 66.65895080566406, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132684636, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133304771, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833356395, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132649614, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132394420, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833443457, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131880799, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 43.47249984741211, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133095571, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133052546, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833346388, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131340085, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 73.66384887695312, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131466958, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 36.11199951171875, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132318371, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833382409, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133959825, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133974836, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131197964, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 23.9211483001709, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133314779, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134147992, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131870790, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 39.9693489074707, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833402428, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131274033, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 50.5452995300293, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134030888, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132465481, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133212686, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131773720, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 5.994849681854248, altitude: 208.1999969482422, accuracy: 27.037399291992188, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131207972, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 27.4239501953125, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132298201, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131356097, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 79.2677001953125, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131390914, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 9.496599197387695, altitude: 208.0, accuracy: 45.5823974609375, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131365897, course: 0.0, frommockprovider: false, latitude: 28.5179947, altitudeaccuracy: 3.0219500064849854, altitude: 208.0, accuracy: 21.197799682617188, longitude: 77.1994496 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131146929, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 6.058899879455566, altitude: 208.0, accuracy: 32.728599548339844, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131360894, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 80.94664764404297, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131900814, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 50.477752685546875, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131279038, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 52.29705047607422, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134045906, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131249008, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 41.78654861450195, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131665110, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134035891, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131416931, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 18.602548599243164, altitude: 208.0, accuracy: 82.00619506835938, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133064550, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133942804, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132644611, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132404431, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132598577, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132521527, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131819751, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 22.10569953918457, altitude: 208.1999969482422, accuracy: 91.48079681396484, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132328380, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833377408, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132230373, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132486494, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132213635, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133999858, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132338387, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133989849, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131187957, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 20.419050216674805, altitude: 208.0, accuracy: 90.16920471191406, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132113779, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131834764, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 27.36025047302246, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131793731, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 12.998700141906738, altitude: 208.1999969482422, accuracy: 55.052799224853516, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132475487, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132149890, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132308362, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131982876, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 79.19944763183594, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132516527, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131370901, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 2.4920499324798584, altitude: 208.0, accuracy: 17.564199447631836, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133902779, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132414447, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134005863, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131987879, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 80.95049285888672, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131497978, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 46.968997955322266, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133243710, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131640085, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 96.7064437866211, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131141926, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 4.307849884033203, altitude: 208.0, accuracy: 25.72439956665039, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132694642, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132013895, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 90.05609893798828, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133263731, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133136615, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131543011, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 62.73054885864258, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131325074, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 68.4096450805664, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132587570, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131558022, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 67.9843978881836, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131476964, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 39.614097595214844, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132470488, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131584043, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 77.09210205078125, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131967866, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 73.94595336914062, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131680121, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132542536, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133146627, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131915827, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 55.7322998046875, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131238998, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 38.283050537109375, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131527999, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 57.47669982910156, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131737128, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132679632, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131890805, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 46.97460174560547, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134020878, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131446949, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 29.108848571777344, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131614065, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 87.59944915771484, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833418440, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133268735, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131768714, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 4.24275016784668, altitude: 208.1999969482422, accuracy: 20.029001235961914, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 1.3640015125274658, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131757708, course: 0.0, frommockprovider: false, latitude: 28.517789, altitudeaccuracy: 2.1325998306274414, altitude: 208.0, accuracy: 12.26039981842041, longitude: 77.1995308 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132419445, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131675117, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131217982, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 30.92745018005371, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133080561, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833372406, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132358400, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132348397, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131738866, course: 0.0, frommockprovider: false, latitude: 28.5178941, altitudeaccuracy: 1.0, altitude: 208.0, accuracy: 500.0, longitude: 77.1997355 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133177655, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132218640, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133984847, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133166646, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133047540, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131686123, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833275287, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 79.85710144042969, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131421932, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 20.3528995513916, altitude: 208.0, accuracy: 89.00759887695312, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131395917, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 11.247649192810059, altitude: 208.0, accuracy: 52.58659744262695, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131859779, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 36.115501403808594, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132364405, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132664625, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133222692, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131202968, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 25.672548294067383, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131717116, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133085563, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133932797, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131172948, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 15.165549278259277, altitude: 208.0, accuracy: 69.15519714355469, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131763710, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 2.4913501739501953, altitude: 208.1999969482422, accuracy: 13.02340030670166, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131101450, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134137982, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131754711, course: 0.0, frommockprovider: false, latitude: 28.5178941, altitudeaccuracy: 6.545750141143799, altitude: 208.0, accuracy: 500.0, longitude: 77.1997355 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131400920, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 12.998700141906738, altitude: 208.0, accuracy: 59.59080123901367, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131522996, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 55.72529983520508, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131233992, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 36.530948638916016, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133171651, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131875796, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 41.72145080566406, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132028903, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 95.30889892578125, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133161642, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131630075, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 93.20294952392578, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132369407, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133283753, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132069927, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132409441, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132038908, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 98.81065368652344, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131854775, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 34.364097595214844, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134050907, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132501507, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131910822, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 53.98089599609375, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131670113, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132313369, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131106454, course: 0.0, frommockprovider: false, latitude: 28.5179783, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.19944 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133090567, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132384417, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131660107, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132613589, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132608585, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132425457, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132237655, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132155891, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132603579, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133115595, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131436943, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 25.60675048828125, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134111955, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132623597, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132333382, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132582563, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833316377, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 94.23859405517578, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132577562, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131512988, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 52.22249984741211, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132430459, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132445469, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132064926, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133032531, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131885803, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 45.223899841308594, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132547541, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131992882, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 82.70154571533203, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132567553, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131712112, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134132974, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134106952, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134142989, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131783725, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 9.496599197387695, altitude: 208.1999969482422, accuracy: 41.044395446777344, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131650095, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 100.0, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131305060, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 61.40475082397461, altitude: 208.0, accuracy: 100.0, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131385911, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 7.745550155639648, altitude: 208.0, accuracy: 38.57820129394531, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132297201, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131136924, course: 0.0, frommockprovider: false, latitude: 28.5179816, altitudeaccuracy: 2.557149887084961, altitude: 208.0, accuracy: 18.721599578857422, longitude: 77.1994551 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691134040898, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133100576, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133110592, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691133937801, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691132094946, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 100.0, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131517992, course: 0.0, frommockprovider: false, latitude: 28.5179895, altitudeaccuracy: 53.973899841308594, altitude: 208.0, accuracy: 100.0, longitude: 77.1994594 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1691131839767, course: 0.0, frommockprovider: false, latitude: 28.5177733, altitudeaccuracy: 29.111299514770508, altitude: 208.1999969482422, accuracy: 100.0, longitude: 77.199547 }]
    },
    {
      "array": [{ speedaccuracy: 0.0, speed: 0.0, courseaccuracy: 0.0, timestamp: 1698833366403, course: 0.0, frommockprovider: false, latitude: 28.5180007, altitudeaccuracy: 100.0, altitude: 208.79998779296875, accuracy: 100.0, longitude: 77.1994349 }]
    }
  ]
  let route = [
    {"lat": 28.5154244072736, "lng": 77.1979366076593 },
    {"lat": 28.5154611528025, "lng": 77.1979132316831 },
    {"lat": 28.5154611528025, "lng": 77.1979132316831 },
    {"lat": 28.5155644274906, "lng": 77.1990027654238 },
    {"lat": 28.5155687536534, "lng": 77.1976270970726 },
    {"lat": 28.5155696062497, "lng": 77.1976907150808 },
    {"lat": 28.5156072378203, "lng": 77.1990101582403 },
    {"lat": 28.5156207659473, "lng": 77.1990171915659 },
    {"lat": 28.5156219664565, "lng": 77.1990224908404 },
    {"lat": 28.5156252790101, "lng": 77.1990287770055 },
    {"lat": 28.5156287213313, "lng": 77.1990014728075 },
    {"lat": 28.5156287452016, "lng": 77.1989952892968 },
    {"lat": 28.5156288421977, "lng": 77.1989950557697 },
    {"lat": 28.5156314048635, "lng": 77.1990193284406 },
    {"lat": 28.5156364798926, "lng": 77.1988141093383 },
    {"lat": 28.515637906292, "lng": 77.1988214475366 },
    {"lat": 28.5156770921003, "lng": 77.1990548373286 },
    {"lat": 28.5156915831412, "lng": 77.1990608586103 },
    {"lat": 28.5157007673235, "lng": 77.1988045927907 },
    {"lat": 28.5157355562518, "lng": 77.197665985301 },
    {"lat": 28.5157393698991, "lng": 77.1989740197302 },
    {"lat": 28.5157429726372, "lng": 77.1989750947431 },
    {"lat": 28.5157544416653, "lng": 77.1976478523565 },
    {"lat": 28.5157811810024, "lng": 77.1989883073749 },
    {"lat": 28.5158390102847, "lng": 77.1990462106194 },
    {"lat": 28.5158528980768, "lng": 77.1972257556611 },
    {"lat": 28.5158547525642, "lng": 77.1991194131187 },
    {"lat": 28.5158624031043, "lng": 77.1972889223486 },
    {"lat": 28.5158683995374, "lng": 77.1988065843877 },
    {"lat": 28.5158753995268, "lng": 77.1990131353453 },
    {"lat": 28.5158796648597, "lng": 77.1990111500029 },
    {"lat": 28.5158880767126, "lng": 77.1987625692017 },
    {"lat": 28.5159030292753, "lng": 77.1987611386153 },
    {"lat": 28.5159067622506, "lng": 77.1965311491831 },
    {"lat": 28.5160498738452, "lng": 77.1970490176811 },
    {"lat": 28.5160625368224, "lng": 77.1970642461139 },
    {"lat": 28.5160905861215, "lng": 77.1986631009696 },
    {"lat": 28.5161010658499, "lng": 77.1986463755911 },
    {"lat": 28.516101990853, "lng": 77.1987145767335 },
    {"lat": 28.5161464442442, "lng": 77.19716473702 },
    {"lat": 28.5161520660913, "lng": 77.1987137664533 },
    {"lat": 28.5161527558151, "lng": 77.1987248175888 },
    {"lat": 28.5161552656485, "lng": 77.1987112550464 },
    {"lat": 28.5161869971653, "lng": 77.1985993578191 },
    {"lat": 28.5162901930502, "lng": 77.1974921309522 },
    {"lat": 28.5163316344443, "lng": 77.1975092295504 },
    {"lat": 28.516343015576, "lng": 77.1974992093417 },
    {"lat": 28.516366134864, "lng": 77.1974758042582 },
    {"lat": 28.5164077532962, "lng": 77.1974834252115 },
    {"lat": 28.5164155879293, "lng": 77.1974856032781 },
    {"lat": 28.5169901915241, "lng": 77.1978200805855 },
    {"lat": 28.5170375230712, "lng": 77.197833268258 },
    {"lat": 28.5170643740684, "lng": 77.1978490428237 },
    {"lat": 28.5170679625317, "lng": 77.1978512932338 },
    {"lat": 28.5175867760405, "lng": 77.198221907608 },
    {"lat": 28.5176178675146, "lng": 77.1982384213814 },
    {"lat": 28.5178011027478, "lng": 77.1994708542663 },
    {"lat": 28.5178019864497, "lng": 77.1983297940208 },
    {"lat": 28.5178432063166, "lng": 77.1993736348629 },
    {"lat": 28.5178480222949, "lng": 77.1993797550554 },
    {"lat": 28.5178487521667, "lng": 77.1993786802828 },
    {"lat": 28.517860315932, "lng": 77.1993744824458 },
    {"lat": 28.5178612457621, "lng": 77.1993889847145 },
    {"lat": 28.5178628297591, "lng": 77.1993870442565 },
    {"lat": 28.5178677029669, "lng": 77.1993643949125 },
    {"lat": 28.5178717748918, "lng": 77.1984328233322 },
    {"lat": 28.5179148067162, "lng": 77.1984673280274 },
    {"lat": 28.5179862356341, "lng": 77.1993100063027 },
    {"lat": 28.5180420315105, "lng": 77.1991005407121 },
    {"lat": 28.5180433444451, "lng": 77.1986816732678 },
    {"lat": 28.5180638040922, "lng": 77.1990669682496 },
    {"lat": 28.5181050233785, "lng": 77.1990057074472 },
    {"lat": 28.5181094201658, "lng": 77.1994920130962 },
    {"lat": 28.5181094201658, "lng": 77.1994920130962 },
    {"lat": 28.5181168714231, "lng": 77.1987626544945 },
    {"lat": 28.5181290284712, "lng": 77.1987875428849 },
    {"lat": 28.518139109003, "lng": 77.1989474585298 },
    {"lat": 28.5181471393763, "lng": 77.1988039318267 },
    {"lat": 28.5181508326116, "lng": 77.1989282855229 },
    {"lat": 28.5181794396742, "lng": 77.1988846302766 },
    {"lat": 28.5181808410783, "lng": 77.1988825251444 },
    {"lat": 28.5181837505235, "lng": 77.1988604309746 },
    {"lat": 28.5183280270472, "lng": 77.198937471589 },
    {"lat": 28.5183845943572, "lng": 77.1989958048979 },
    {"lat": 28.5184932496365, "lng": 77.1992348128241 },
    {"lat": 28.5184966462545, "lng": 77.1991738432424 },
    {"lat": 28.5185106898921, "lng": 77.1992149233804 },
    {"lat": 28.5185259362104, "lng": 77.2120088181453 },
    {"lat": 28.5185385766269, "lng": 77.1991435092587 },
    {"lat": 28.518557741346, "lng": 77.2120274562039 },
    {"lat": 28.5185718083696, "lng": 77.1991404067185 },
    {"lat": 28.5185848619126, "lng": 77.2120019695941 },
    {"lat": 28.5185931652596, "lng": 77.2119979874283 },
    {"lat": 28.5185942649714, "lng": 77.2119929385692 },
    {"lat": 28.5185969060288, "lng": 77.2119080950756 },
    // {"lat": 28.5186193029882, "lng": 77.1992083140621 },
    // {"lat": 28.5186323138414, "lng": 77.1991883890544 },
    // {"lat": 28.5186323138414, "lng": 77.1991883890544 },
    // {"lat": 28.5186323138414, "lng": 77.1991883890544 },
    // {"lat": 28.5186348203716, "lng": 77.1992608903734 },
    {"lat": 28.5186580943834, "lng": 77.2118575940367 },
    // {"lat": 28.5186591261813, "lng": 77.1992535497825 },
    {"lat": 28.5188074421156, "lng": 77.2115505166764 },
    {"lat": 28.5188245103645, "lng": 77.2115077961452 },
    {"lat": 28.5188265106044, "lng": 77.2115045452055 },
    {"lat": 28.5190354603749, "lng": 77.2088982030728 },
    {"lat": 28.5190472531866, "lng": 77.2089180190592 },
    {"lat": 28.5191510775524, "lng": 77.2090195926598 },
    {"lat": 28.5192066603814, "lng": 77.2090154100165 },
    {"lat": 28.519241076818, "lng": 77.2087317019926 },
    {"lat": 28.5192415212311, "lng": 77.2086465240887 },
    {"lat": 28.5192825171256, "lng": 77.2075177322381 },
    {"lat": 28.519291541807, "lng": 77.2075519378641 },
    {"lat": 28.5192984843121, "lng": 77.2105725718402 },
    {"lat": 28.5193460455485, "lng": 77.2076661295352 },
    {"lat": 28.5193521884338, "lng": 77.2077372052119 },
    {"lat": 28.5193740812391, "lng": 77.2076191879281 },
    {"lat": 28.5193935949886, "lng": 77.2075066875641 },
    {"lat": 28.5194579226362, "lng": 77.2072039074221 },
    {"lat": 28.5194608365207, "lng": 77.2101917218701 },
    {"lat": 28.5194737827441, "lng": 77.2101752186096 },
    {"lat": 28.5194737827441, "lng": 77.2101752186096 },
    {"lat": 28.5197520030095, "lng": 77.2063240322078 },
    {"lat": 28.5197526248904, "lng": 77.2062888156502 },
    {"lat": 28.5198046283068, "lng": 77.2061081216619 },
    {"lat": 28.5198083109937, "lng": 77.2060642565467 },
    {"lat": 28.5198622972455, "lng": 77.2058723615299 },
    {"lat": 28.519879869064, "lng": 77.2058114577892 },
    {"lat": 28.5199400046, "lng": 77.2056247977138 },
    {"lat": 28.5199450777961, "lng": 77.2055080965969 },
    {"lat": 28.5199580386237, "lng": 77.2057707629269 },
    {"lat": 28.5199592909293, "lng": 77.2055353944995 },
    {"lat": 28.519961822422, "lng": 77.2055075676886 },
    {"lat": 28.5199653959934, "lng": 77.2057884427928 },
    {"lat": 28.5199873242518, "lng": 77.2053418724895 },
    {"lat": 28.5199963225619, "lng": 77.2052577333899 },
    {"lat": 28.5200024222401, "lng": 77.2048260471391 },
    {"lat": 28.5200025793704, "lng": 77.2050281419249 },
    {"lat": 28.5200090912598, "lng": 77.2047305879878 },
    {"lat": 28.5200522162706, "lng": 77.2047328787356 },
    {"lat": 28.520059292641, "lng": 77.2050296462773 },
    {"lat": 28.5200773387919, "lng": 77.2058036059461 },
    {"lat": 28.5201836602878, "lng": 77.2006403374375 },
    {"lat": 28.5201881365556, "lng": 77.2058270513572 },
    {"lat": 28.5201934714578, "lng": 77.2006983073767 },
    {"lat": 28.5202199571775, "lng": 77.2008544557484 },
    {"lat": 28.5202225992213, "lng": 77.2008599452999 },
    {"lat": 28.5202225992213, "lng": 77.2008599452999 },
    {"lat": 28.5202225992213, "lng": 77.2008599452999 },
    {"lat": 28.5202565104921, "lng": 77.2006916827591 },
    {"lat": 28.5202591800785, "lng": 77.203659881036 },
    {"lat": 28.5202610726789, "lng": 77.2044696797868 },
    {"lat": 28.5202610726789, "lng": 77.2044696797868 },
    {"lat": 28.5202610726789, "lng": 77.2044696797868 },
    {"lat": 28.5202704806075, "lng": 77.2036576603829 },
    {"lat": 28.5202706415765, "lng": 77.2036633057652 },
    {"lat": 28.5202749266215, "lng": 77.2037756626288 },
    {"lat": 28.5202871821697, "lng": 77.2007336537622 },
    {"lat": 28.5202980473322, "lng": 77.2035185212728 },
    {"lat": 28.5203166646784, "lng": 77.2019290963736 },
    {"lat": 28.5203241947875, "lng": 77.2006525424587 },
    {"lat": 28.5203242017834, "lng": 77.2034139934968 },
    {"lat": 28.5203344511337, "lng": 77.2033845177058 },
    {"lat": 28.5203429068532, "lng": 77.2019468059881 },
    {"lat": 28.5203473360296, "lng": 77.2007990452469 },
    {"lat": 28.5203499242404, "lng": 77.2006538155694 },
    {"lat": 28.520377529351, "lng": 77.2032611888718 },
    {"lat": 28.5203938630597, "lng": 77.2007064555288 },
    {"lat": 28.5204170567339, "lng": 77.2007862430224 },
    {"lat": 28.5204219357303, "lng": 77.2030160409832 },
    {"lat": 28.5204286873576, "lng": 77.2029897160396 },
    {"lat": 28.5204852496682, "lng": 77.2026669183735 },
    {"lat": 28.5204916201656, "lng": 77.2007705545397 },
    {"lat": 28.5204918372602, "lng": 77.2007700281555 },
    {"lat": 28.5204933344588, "lng": 77.200768419238 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204948429974, "lng": 77.2007668709908 },
    {"lat": 28.5204964506181, "lng": 77.2026368074149 },
    {"lat": 28.5205081296174, "lng": 77.2028665804674 },
    {"lat": 28.5205131792668, "lng": 77.2028088172583 },
    {"lat": 28.5205457823654, "lng": 77.2025626969108 },
    {"lat": 28.5205471719658, "lng": 77.2007659890117 },
    {"lat": 28.5205471719658, "lng": 77.2007659890117 },
    {"lat": 28.5205471719658, "lng": 77.2007659890117 },
    {"lat": 28.5205471719658, "lng": 77.2007659890117 },
    {"lat": 28.5205509868588, "lng": 77.2022638216511 },
    {"lat": 28.520556631106, "lng": 77.2025554684247 },
    {"lat": 28.5205567466971, "lng": 77.2009431049905 },
    {"lat": 28.5205568427206, "lng": 77.2018275320953 },
    {"lat": 28.520562382729, "lng": 77.2007655292975 },
    {"lat": 28.5205649936924, "lng": 77.2009667622941 },
    {"lat": 28.5205673558346, "lng": 77.2009735413135 },
    {"lat": 28.5205674370257, "lng": 77.202097080992 },
    {"lat": 28.5205675904239, "lng": 77.2025449289428 },
    {"lat": 28.5205740445204, "lng": 77.2025367279304 },
    {"lat": 28.5205889074398, "lng": 77.2005312704269 },
    {"lat": 28.5205897128666, "lng": 77.2017974692199 },
    {"lat": 28.5206102351198, "lng": 77.2024416528725 },
    {"lat": 28.5206104043999, "lng": 77.2024440901881 },
    {"lat": 28.5206131047047, "lng": 77.2020942006711 },
    {"lat": 28.520614520742, "lng": 77.2016840006031 },
    {"lat": 28.5206166049916, "lng": 77.2024663202977 },
    {"lat": 28.5206183276574, "lng": 77.2020952136986 },
    {"lat": 28.5206187925033, "lng": 77.202095102233 },
    {"lat": 28.5206193616179, "lng": 77.2016612062561 },
    {"lat": 28.5206296857672, "lng": 77.2024279250765 },
    {"lat": 28.5206296857672, "lng": 77.2024279250765 },
    {"lat": 28.5206499912812, "lng": 77.2012273017075 },
    {"lat": 28.5206503879057, "lng": 77.2011113166408 },
    {"lat": 28.5206510517345, "lng": 77.2012735596272 },
    {"lat": 28.520660123549, "lng": 77.2022974456635 },
    {"lat": 28.5207916065468, "lng": 77.20592299609 },
    {"lat": 28.5209107904082, "lng": 77.2059387924279 },
    {"lat": 28.5209358564735, "lng": 77.2059419004302 },
    {"lat": 28.5212176241013, "lng": 77.2059857505952 },
    {"lat": 28.5212661842495, "lng": 77.2059940955846 },
    {"lat": 28.521648029551, "lng": 77.2060797883029 },
    {"lat": 28.5216905592419, "lng": 77.2060916189531 },
    {"lat": 28.5220577825573, "lng": 77.2062396851218 },
    {"lat": 28.5220866506241, "lng": 77.206254544039 },
    {"lat": 28.5224303923403, "lng": 77.2063657014406 },
    {"lat": 28.5227126673925, "lng": 77.1964841767501 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227144427812, "lng": 77.1964814541364 },
    {"lat": 28.5227283591745, "lng": 77.1964608530761 },
    {"lat": 28.5228681159212, "lng": 77.1962468803733 },
    {"lat": 28.5228889306395, "lng": 77.1962186636313 },
    {"lat": 28.5229646810822, "lng": 77.2068560907592 },
    {"lat": 28.522970296728, "lng": 77.2068596499574 },
    {"lat": 28.5230369943041, "lng": 77.2069680588737 },
    {"lat": 28.5230579711695, "lng": 77.2069815045401 },
    {"lat": 28.5230633203893, "lng": 77.2068705647266 },
    {"lat": 28.5230776327634, "lng": 77.206942716381 },
    {"lat": 28.523099430828, "lng": 77.2069530879568 },
    {"lat": 28.523199586946, "lng": 77.2068952536692 },
    {"lat": 28.5231998563243, "lng": 77.2069006888383 },
    {"lat": 28.5232283235806, "lng": 77.2068678875172 },
    {"lat": 28.5232389897676, "lng": 77.2068684471058 },
    {"lat": 28.5232818601598, "lng": 77.2068433898488 },
    {"lat": 28.5232860514364, "lng": 77.2068979027398 },
    {"lat": 28.5233271346774, "lng": 77.2077062997696 },
    {"lat": 28.5233709137125, "lng": 77.2069376122061 },
    {"lat": 28.523384976006, "lng": 77.2074447495739 },
    {"lat": 28.5234033669837, "lng": 77.2074144029493 },
    {"lat": 28.5234465299928, "lng": 77.2069775652458 },
    {"lat": 28.5234630292682, "lng": 77.207295127995 },
    {"lat": 28.5234631230521, "lng": 77.2072950521799 },
    {"lat": 28.5234789557788, "lng": 77.2072713062113 },
    {"lat": 28.5235356683113, "lng": 77.2071041831829 },
    {"lat": 28.5235392255499, "lng": 77.2071058328581 },
  ]

  const fun = dt => {
    return {
      "lat": dt["array"][0]["latitude"],
      "lng": dt["array"][0].longitude,
      "time": dt["array"][0].timestamp
    }
  }
  let data2 = data.map(fun)

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
        defaultZoom={13}
        defaultCenter={{ "lat": 28.5180206, "lng": 77.1994991 }}
      // defaultOptions={{ styles: myStyles }}
      >
        {route.map((map, index) => {
          console.log(map);
          return <Marker zIndex={100} icon={{
            url: (map.lat < 28.5186 && map.lng < 77.201) ? marker2 : marker, scaledSize: new window.google.maps.Size(22, 33),
            labelOrigin: new window.google.maps.Point(30, 20),
          }} onClick={() => setLocation("MCD" + index)} position={{ lat: Number(map.lat), lng: Number(map.lng) }} >
            {
              location == `MCD${index}` ?

                <InfoWindow>
                  <div>
                    {index}
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
