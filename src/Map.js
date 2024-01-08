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
    {"place":"6","lat": 28.44887,"lng":77.07144},
{"place":"8","lat": 28.42009,"lng":77.0508},
{"place":"10","lat": 28.42008,"lng":77.05168},
{"place":"11","lat": 28.42043,"lng":77.05148},
{"place":"14","lat": 28.41981,"lng":77.05181},
{"place":"17","lat": 28.41974,"lng":77.05148},
{"place":"70","lat": 28.44775,"lng":77.03304},
{"place":"111","lat": 28.40691,"lng":77.09151},
{"place":"112","lat": 28.40667,"lng":77.09151},
{"place":"113","lat": 28.42206,"lng":77.05342},
{"place":"114","lat": 28.40562,"lng":77.09175},
{"place":"128","lat": 28.46104,"lng":77.04124},
{"place":"130","lat": 28.39089,"lng":77.05666},
{"place":"143","lat": 28.40078,"lng":77.0916},
{"place":"153","lat": 28.40075,"lng":77.0916},
{"place":"160","lat": 28.40078,"lng":77.092},
{"place":"168","lat": 28.40109,"lng":77.09132},
{"place":"172","lat": 28.4008,"lng":77.09209},
{"place":"183","lat": 28.43774,"lng":77.07257},
{"place":"184","lat": 28.43741,"lng":77.07265},
{"place":"185","lat": 28.43786,"lng":77.07283},
{"place":"208","lat": 28.39779,"lng":77.07169},
{"place":"224","lat": 28.40253,"lng":77.04523},
{"place":"231","lat": 28.43114,"lng":77.0899},
{"place":"233","lat": 28.431,"lng":77.08982},
{"place":"248","lat": 28.43869,"lng":77.0878},
{"place":"263","lat": 28.44485,"lng":77.08082},
{"place":"272","lat": 28.44488,"lng":77.08067},
{"place":"275","lat": 28.44487,"lng":77.08059},
{"place":"276","lat": 28.44493,"lng":77.08072},
{"place":"284","lat": 28.47201,"lng":77.08318},
{"place":"288","lat": 28.42498,"lng":77.03909},
{"place":"289","lat": 28.40215,"lng":77.06094},
{"place":"290","lat": 28.42526,"lng":77.03889},
{"place":"291","lat": 28.46048,"lng":77.07882},
{"place":"292","lat": 28.46038,"lng":77.07921},
{"place":"293","lat": 28.46037,"lng":77.07876},
{"place":"302","lat": 28.42046,"lng":77.05018},
{"place":"304","lat": 28.47373,"lng":77.08018},
{"place":"306","lat": 28.4016,"lng":77.08454},
{"place":"307","lat": 28.45943,"lng":77.07287},
{"place":"308","lat": 28.44575,"lng":77.04826},
{"place":"312","lat": 28.40152,"lng":77.08515},
{"place":"329","lat": 28.47908,"lng":77.08193},
{"place":"331","lat": 28.47921,"lng":77.08056},
{"place":"368","lat": 28.48089,"lng":77.08545},
{"place":"383","lat": 28.45691,"lng":77.03657},
{"place":"388","lat": 28.42471,"lng":77.08805},
{"place":"389","lat": 28.425,"lng":77.08775},
{"place":"391","lat": 28.4247,"lng":77.08787},
{"place":"401","lat": 28.42693,"lng":77.04626},
{"place":"403","lat": 28.46062,"lng":77.0838},
{"place":"409","lat": 28.45168,"lng":77.04414},
{"place":"428","lat": 28.39673,"lng":77.03954},
{"place":"452","lat": 28.45085,"lng":77.04839},
  ]
  let z2 = [
    {"place":"1","lat": 28.41458,"lng":77.06567},
  {"place":"2","lat": 28.41397,"lng":77.06599},
  {"place":"3","lat": 28.50346,"lng":77.00706},
  {"place":"4","lat": 28.50534,"lng":77.00414},
  {"place":"5","lat": 28.50534,"lng":77.00414},
  {"place":"7","lat": 28.46764,"lng":77.01704},
  {"place":"9","lat": 28.43388,"lng":77.03335},
  {"place":"12","lat": 28.4338,"lng":77.03336},
  {"place":"13","lat": 28.43387,"lng":77.0333},
  {"place":"15","lat": 28.46765,"lng":77.01694},
  {"place":"16","lat": 28.46734,"lng":77.01743},
  {"place":"18","lat": 28.49188,"lng":77.09613},
  {"place":"19","lat": 28.44496,"lng":77.02763},
  {"place":"20","lat": 28.46708,"lng":77.08141},
  {"place":"21","lat": 28.41113,"lng":77.04118},
  {"place":"22","lat": 28.41113,"lng":77.04118},
  {"place":"23","lat": 28.47886,"lng":77.02447},
  {"place":"24","lat": 28.46798,"lng":77.06322},
  {"place":"25","lat": 28.46757,"lng":77.08181},
  {"place":"26","lat": 28.4675,"lng":77.08128},
  {"place":"27","lat": 28.46708,"lng":77.08115},
  {"place":"28","lat": 28.46762,"lng":77.08173},
  {"place":"29","lat": 28.46771,"lng":77.08176},
  {"place":"30","lat": 28.46762,"lng":77.08233},
  {"place":"31","lat": 28.46749,"lng":77.08155},
  {"place":"32","lat": 28.37021,"lng":76.96594},
  {"place":"33","lat": 28.37021,"lng":76.96594},
  {"place":"34","lat": 28.46722,"lng":77.08199},
  {"place":"35","lat": 28.46761,"lng":77.08231},
  {"place":"36","lat": 28.41117,"lng":77.04136},
  {"place":"37","lat": 28.41117,"lng":77.04136},
  {"place":"38","lat": 28.37405,"lng":76.95317},
  {"place":"39","lat": 28.37405,"lng":76.95317},
  {"place":"40","lat": 28.5026,"lng":77.0973},
  {"place":"41","lat": 28.45698,"lng":77.05802},
  {"place":"42","lat": 28.48288,"lng":77.0956},
  {"place":"43","lat": 28.38953,"lng":77.0671},
  {"place":"44","lat": 28.48277,"lng":77.0957},
  {"place":"45","lat": 28.39076,"lng":77.06712},
  {"place":"46","lat": 28.48284,"lng":77.09579},
  {"place":"47","lat": 28.48466,"lng":77.09455},
  {"place":"48","lat": 28.40164,"lng":77.0194},
  {"place":"49","lat": 28.48298,"lng":77.09569},
  {"place":"50","lat": 28.39038,"lng":77.06751},
  {"place":"51","lat": 28.3908,"lng":77.06728},
  {"place":"52","lat": 28.3908,"lng":77.06725},
  {"place":"53","lat": 28.48276,"lng":77.09581},
  {"place":"54","lat": 28.48284,"lng":77.09539},
  {"place":"55","lat": 28.39078,"lng":77.06688},
  {"place":"56","lat": 28.42464,"lng":76.93065},
  {"place":"57","lat": 28.42464,"lng":76.93065},
  {"place":"58","lat": 28.42436,"lng":76.93147},
  {"place":"59","lat": 28.42436,"lng":76.93147},
  {"place":"60","lat": 28.42424,"lng":76.93102},
  {"place":"61","lat": 28.42424,"lng":76.93102},
  {"place":"62","lat": 28.46575,"lng":76.98745},
  {"place":"63","lat": 28.42468,"lng":76.93089},
  {"place":"64","lat": 28.42468,"lng":76.93089},
  {"place":"65","lat": 28.40143,"lng":77.01916},
  {"place":"66","lat": 28.45669,"lng":76.97505},
  {"place":"67","lat": 28.45669,"lng":76.97505},
  {"place":"68","lat": 28.35914,"lng":76.97255},
  {"place":"69","lat": 28.44775,"lng":77.03304},
  {"place":"71","lat": 28.42092,"lng":77.09051},
  {"place":"72","lat": 28.42092,"lng":77.09051},
  {"place":"73","lat": 28.38678,"lng":76.90965},
  {"place":"74","lat": 28.38678,"lng":76.90965},
  {"place":"75","lat": 28.39274,"lng":76.96717},
  {"place":"76","lat": 28.39274,"lng":76.96717},
  {"place":"77","lat": 28.48792,"lng":77.10358},
  {"place":"78","lat": 28.41981,"lng":77.09077},
  {"place":"79","lat": 28.41981,"lng":77.09077},
  {"place":"80","lat": 28.48765,"lng":77.10396},
  {"place":"81","lat": 28.48765,"lng":77.1038},
  {"place":"82","lat": 28.4874,"lng":77.10464},
  {"place":"83","lat": 28.4874,"lng":77.10387},
  {"place":"84","lat": 28.48718,"lng":77.10412},
  {"place":"85","lat": 28.42106,"lng":77.09057},
  {"place":"86","lat": 28.42106,"lng":77.09057},
  {"place":"87","lat": 28.48702,"lng":77.10422},
  {"place":"88","lat": 28.49541,"lng":77.08121},
  {"place":"89","lat": 28.49541,"lng":77.08121},
  {"place":"90","lat": 28.5052,"lng":77.03778},
  {"place":"91","lat": 28.5052,"lng":77.03778},
  {"place":"92","lat": 28.4041,"lng":76.94766},
  {"place":"93","lat": 28.4041,"lng":76.94766},
  {"place":"94","lat": 28.40346,"lng":76.94785},
  {"place":"95","lat": 28.40346,"lng":76.94785},
  {"place":"96","lat": 28.40346,"lng":76.94785},
  {"place":"97","lat": 28.40346,"lng":76.94785},
  {"place":"98","lat": 28.40349,"lng":76.9478},
  {"place":"99","lat": 28.40349,"lng":76.9478},
  {"place":"100","lat": 28.40398,"lng":76.94765},
  {"place":"101","lat": 28.40398,"lng":76.94765},
  {"place":"102","lat": 28.49552,"lng":77.08091},
  {"place":"103","lat": 28.49552,"lng":77.08091},
  {"place":"104","lat": 28.49552,"lng":77.0812},
  {"place":"105","lat": 28.49552,"lng":77.0812},
  {"place":"106","lat": 28.44843,"lng":77.0991},
  {"place":"107","lat": 28.40182,"lng":76.98884},
  {"place":"108","lat": 28.44365,"lng":77.05328},
  {"place":"109","lat": 28.40141,"lng":76.94703},
  {"place":"110","lat": 28.40141,"lng":76.94703},
  {"place":"115","lat": 28.43661,"lng":77.13499},
  {"place":"116","lat": 28.50278,"lng":77.06302},
  {"place":"117","lat": 28.50279,"lng":77.06268},
  {"place":"118","lat": 28.47315,"lng":77.0033},
  {"place":"119","lat": 28.4975,"lng":76.99783},
  {"place":"120","lat": 28.50283,"lng":77.0638},
  {"place":"121","lat": 28.50276,"lng":77.0626},
  {"place":"122","lat": 28.50292,"lng":77.06454},
  {"place":"123","lat": 28.5029,"lng":77.06357},
  {"place":"124","lat": 28.50287,"lng":77.00758},
  {"place":"125","lat": 28.50321,"lng":77.00777},
  {"place":"126","lat": 28.47693,"lng":77.0942},
  {"place":"127","lat": 28.47693,"lng":77.0942},
  {"place":"129","lat": 28.39084,"lng":77.02999},
  {"place":"131","lat": 28.42864,"lng":77.09969},
  {"place":"132","lat": 28.46906,"lng":77.06399},
  {"place":"133","lat": 28.38069,"lng":76.96376},
  {"place":"134","lat": 28.38069,"lng":76.96376},
  {"place":"135","lat": 28.42883,"lng":77.09992},
  {"place":"136","lat": 28.51137,"lng":77.07767},
  {"place":"137","lat": 28.42864,"lng":77.09971},
  {"place":"138","lat": 28.49651,"lng":76.98935},
  {"place":"139","lat": 28.39166,"lng":77.03013},
  {"place":"140","lat": 28.4622,"lng":77.08746},
  {"place":"141","lat": 28.44268,"lng":77.1011},
  {"place":"142","lat": 28.46256,"lng":77.08693},
  {"place":"144","lat": 28.50216,"lng":77.06958},
  {"place":"145","lat": 28.41333,"lng":77.07283},
  {"place":"146","lat": 28.34204,"lng":76.93747},
  {"place":"147","lat": 28.34204,"lng":76.93747},
  {"place":"148","lat": 28.40073,"lng":77.09175},
  {"place":"149","lat": 28.46233,"lng":77.08756},
  {"place":"150","lat": 28.46239,"lng":77.08752},
  {"place":"151","lat": 28.44289,"lng":77.10083},
  {"place":"152","lat": 28.46244,"lng":77.08731},
  {"place":"154","lat": 28.4428,"lng":77.10091},
  {"place":"155","lat": 28.46247,"lng":77.08759},
  {"place":"156","lat": 28.46248,"lng":77.08757},
  {"place":"157","lat": 28.46235,"lng":77.08763},
  {"place":"158","lat": 28.35561,"lng":76.93773},
  {"place":"159","lat": 28.35561,"lng":76.93773},
  {"place":"161","lat": 28.46244,"lng":77.08687},
  {"place":"162","lat": 28.46237,"lng":77.08697},
  {"place":"163","lat": 28.44297,"lng":77.10087},
  {"place":"164","lat": 28.44253,"lng":77.10094},
  {"place":"165","lat": 28.44247,"lng":77.10093},
  {"place":"166","lat": 28.50885,"lng":77.08328},
  {"place":"167","lat": 28.46233,"lng":77.08691},
  {"place":"169","lat": 28.36306,"lng":76.95131},
  {"place":"170","lat": 28.36306,"lng":76.95131},
  {"place":"171","lat": 28.46236,"lng":77.08767},
  {"place":"173","lat": 28.4428,"lng":77.10103},
  {"place":"174","lat": 28.46251,"lng":77.08743},
  {"place":"175","lat": 28.46235,"lng":77.08768},
  {"place":"176","lat": 28.44297,"lng":77.10091},
  {"place":"177","lat": 28.46228,"lng":77.08765},
  {"place":"178","lat": 28.44295,"lng":77.10096},
  {"place":"179","lat": 28.46236,"lng":77.08711},
  {"place":"180","lat": 28.46227,"lng":77.08762},
  {"place":"181","lat": 28.41629,"lng":77.08456},
  {"place":"182","lat": 28.41629,"lng":77.08456},
  {"place":"186","lat": 28.4023,"lng":76.9687},
  {"place":"187","lat": 28.38308,"lng":77.05218},
  {"place":"188","lat": 28.38308,"lng":77.05218},
  {"place":"189","lat": 28.46683,"lng":76.96941},
  {"place":"190","lat": 28.49061,"lng":77.06798},
  {"place":"191","lat": 28.45569,"lng":76.97626},
  {"place":"192","lat": 28.48186,"lng":76.9905},
  {"place":"193","lat": 28.47519,"lng":76.96201},
  {"place":"194","lat": 28.42555,"lng":77.06483},
  {"place":"195","lat": 28.48984,"lng":76.99991},
  {"place":"196","lat": 28.41075,"lng":77.02081},
  {"place":"197","lat": 28.51495,"lng":77.0752},
  {"place":"198","lat": 28.39235,"lng":76.96748},
  {"place":"199","lat": 28.41541,"lng":77.03351},
  {"place":"200","lat": 28.39233,"lng":76.96749},
  {"place":"201","lat": 28.39244,"lng":76.96743},
  {"place":"202","lat": 28.50235,"lng":77.08572},
  {"place":"203","lat": 28.39261,"lng":76.96736},
  {"place":"204","lat": 28.3976,"lng":77.0721},
  {"place":"205","lat": 28.39805,"lng":77.07224},
  {"place":"206","lat": 28.39842,"lng":77.07259},
  {"place":"207","lat": 28.45987,"lng":76.99706},
  {"place":"209","lat": 28.39815,"lng":77.07213},
  {"place":"210","lat": 28.39746,"lng":77.07199},
  {"place":"211","lat": 28.39805,"lng":77.07207},
  {"place":"212","lat": 28.39852,"lng":77.07257},
  {"place":"213","lat": 28.3981,"lng":77.07213},
  {"place":"214","lat": 28.39733,"lng":77.0725},
  {"place":"215","lat": 28.40315,"lng":76.91558},
  {"place":"216","lat": 28.39229,"lng":76.96754},
  {"place":"217","lat": 28.50245,"lng":77.08562},
  {"place":"218","lat": 28.39277,"lng":76.96761},
  {"place":"219","lat": 28.39225,"lng":76.96761},
  {"place":"220","lat": 28.4254,"lng":77.06761},
  {"place":"221","lat": 28.4251,"lng":77.06795},
  {"place":"222","lat": 28.42506,"lng":77.06747},
  {"place":"223","lat": 28.51142,"lng":77.08032},
  {"place":"225","lat": 28.42542,"lng":77.0675},
  {"place":"226","lat": 28.47331,"lng":77.00919},
  {"place":"227","lat": 28.49621,"lng":77.02235},
  {"place":"228","lat": 28.49621,"lng":77.02235},
  {"place":"229","lat": 28.39036,"lng":76.95927},
  {"place":"230","lat": 28.39036,"lng":76.95927},
  {"place":"232","lat": 28.41264,"lng":77.0556},
  {"place":"234","lat": 28.49802,"lng":77.08972},
  {"place":"235","lat": 28.42793,"lng":77.10001},
  {"place":"236","lat": 28.51587,"lng":77.03594},
  {"place":"237","lat": 28.49654,"lng":77.089},
  {"place":"238","lat": 28.49653,"lng":77.08906},
  {"place":"239","lat": 28.49649,"lng":77.08902},
  {"place":"240","lat": 28.49821,"lng":77.08981},
  {"place":"241","lat": 28.49652,"lng":77.08905},
  {"place":"242","lat": 28.39322,"lng":76.96727},
  {"place":"243","lat": 28.42839,"lng":77.09975},
  {"place":"244","lat": 28.42802,"lng":77.09972},
  {"place":"245","lat": 28.46697,"lng":76.96952},
  {"place":"246","lat": 28.49651,"lng":77.08907},
  {"place":"247","lat": 28.46709,"lng":76.96918},
  {"place":"249","lat": 28.39636,"lng":77.0273},
  {"place":"250","lat": 28.38247,"lng":77.05214},
  {"place":"251","lat": 28.38247,"lng":77.05214},
  {"place":"252","lat": 28.45817,"lng":77.02757},
  {"place":"253","lat": 28.45817,"lng":77.02757},
  {"place":"254","lat": 28.39351,"lng":76.91505},
  {"place":"255","lat": 28.44494,"lng":77.08074},
  {"place":"256","lat": 28.42574,"lng":77.05771},
  {"place":"257","lat": 28.42581,"lng":77.0575},
  {"place":"258","lat": 28.41451,"lng":76.91334},
  {"place":"259","lat": 28.41451,"lng":76.91334},
  {"place":"260","lat": 28.4257,"lng":77.0578},
  {"place":"261","lat": 28.42553,"lng":77.05764},
  {"place":"262","lat": 28.42546,"lng":77.05756},
  {"place":"264","lat": 28.445,"lng":77.08059},
  {"place":"265","lat": 28.42542,"lng":77.05758},
  {"place":"266","lat": 28.43424,"lng":77.10551},
  {"place":"267","lat": 28.42578,"lng":77.05666},
  {"place":"268","lat": 28.42561,"lng":77.05781},
  {"place":"269","lat": 28.42545,"lng":77.05756},
  {"place":"270","lat": 28.42572,"lng":77.05774},
  {"place":"271","lat": 28.42587,"lng":77.05766},
  {"place":"273","lat": 28.42569,"lng":77.05789},
  {"place":"274","lat": 28.42566,"lng":77.05788},
  {"place":"277","lat": 28.445,"lng":77.08076},
  {"place":"278","lat": 28.42572,"lng":77.05779},
  {"place":"279","lat": 28.40501,"lng":77.05917},
  {"place":"280","lat": 28.45081,"lng":77.07876},
  {"place":"281","lat": 28.41321,"lng":77.05502},
  {"place":"282","lat": 28.47317,"lng":77.048},
  {"place":"283","lat": 28.43387,"lng":77.03343},
  {"place":"285","lat": 28.40446,"lng":76.93656},
  {"place":"286","lat": 28.40458,"lng":76.93587},
  {"place":"287","lat": 28.4648,"lng":77.00799},
  {"place":"294","lat": 28.40434,"lng":76.9364},
  {"place":"295","lat": 28.40436,"lng":76.93604},
  {"place":"296","lat": 28.41077,"lng":77.02956},
  {"place":"297","lat": 28.41334,"lng":77.0548},
  {"place":"298","lat": 28.47352,"lng":77.04799},
  {"place":"299","lat": 28.40541,"lng":77.05841},
  {"place":"300","lat": 28.49467,"lng":76.98451},
  {"place":"301","lat": 28.49467,"lng":76.98451},
  {"place":"303","lat": 28.41801,"lng":77.03912},
  {"place":"305","lat": 28.44219,"lng":77.09488},
  {"place":"309","lat": 28.48199,"lng":77.09663},
  {"place":"310","lat": 28.48199,"lng":77.09663},
  {"place":"311","lat": 28.47056,"lng":77.04498},
  {"place":"313","lat": 28.39442,"lng":77.0321},
  {"place":"314","lat": 28.4587,"lng":77.07221},
  {"place":"315","lat": 28.45857,"lng":77.04394},
  {"place":"316","lat": 28.39384,"lng":77.03138},
  {"place":"317","lat": 28.45832,"lng":77.0434},
  {"place":"318","lat": 28.473,"lng":77.01785},
  {"place":"319","lat": 28.49076,"lng":77.09651},
  {"place":"320","lat": 28.44729,"lng":77.02405},
  {"place":"321","lat": 28.48023,"lng":77.0806},
  {"place":"322","lat": 28.48023,"lng":77.0806},
  {"place":"323","lat": 28.473,"lng":77.01785},
  {"place":"324","lat": 28.39117,"lng":76.9397},
  {"place":"325","lat": 28.47323,"lng":77.01817},
  {"place":"326","lat": 28.40229,"lng":76.96078},
  {"place":"327","lat": 28.40229,"lng":76.96078},
  {"place":"328","lat": 28.47908,"lng":77.08193},
  {"place":"330","lat": 28.47921,"lng":77.08056},
  {"place":"332","lat": 28.44861,"lng":77.02305},
  {"place":"333","lat": 28.36566,"lng":76.94604},
  {"place":"334","lat": 28.36566,"lng":76.94604},
  {"place":"335","lat": 28.43848,"lng":77.05141},
  {"place":"336","lat": 28.3659,"lng":76.9459},
  {"place":"337","lat": 28.3659,"lng":76.9459},
  {"place":"338","lat": 28.51519,"lng":77.01596},
  {"place":"339","lat": 28.51519,"lng":77.01596},
  {"place":"340","lat": 28.36561,"lng":76.94605},
  {"place":"341","lat": 28.36561,"lng":76.94605},
  {"place":"342","lat": 28.36563,"lng":76.94598},
  {"place":"343","lat": 28.36563,"lng":76.94598},
  {"place":"344","lat": 28.36576,"lng":76.94612},
  {"place":"345","lat": 28.36576,"lng":76.94612},
  {"place":"346","lat": 28.36566,"lng":76.94595},
  {"place":"347","lat": 28.36566,"lng":76.94595},
  {"place":"348","lat": 28.36583,"lng":76.94538},
  {"place":"349","lat": 28.36583,"lng":76.94538},
  {"place":"350","lat": 28.36571,"lng":76.94627},
  {"place":"351","lat": 28.36571,"lng":76.94627},
  {"place":"352","lat": 28.36653,"lng":76.94609},
  {"place":"353","lat": 28.36653,"lng":76.94609},
  {"place":"354","lat": 28.36625,"lng":76.94646},
  {"place":"355","lat": 28.36625,"lng":76.94646},
  {"place":"356","lat": 28.36561,"lng":76.94601},
  {"place":"357","lat": 28.36561,"lng":76.94601},
  {"place":"358","lat": 28.36682,"lng":76.94683},
  {"place":"359","lat": 28.36682,"lng":76.94683},
  {"place":"360","lat": 28.36568,"lng":76.94602},
  {"place":"361","lat": 28.36568,"lng":76.94602},
  {"place":"362","lat": 28.38602,"lng":76.89323},
  {"place":"363","lat": 28.43516,"lng":77.10466},
  {"place":"364","lat": 28.51138,"lng":77.07658},
  {"place":"365","lat": 28.51141,"lng":77.07659},
  {"place":"366","lat": 28.43725,"lng":77.10443},
  {"place":"367","lat": 28.51611,"lng":77.03639},
  {"place":"369","lat": 28.51199,"lng":77.07481},
  {"place":"370","lat": 28.36354,"lng":76.93522},
  {"place":"371","lat": 28.36354,"lng":76.93522},
  {"place":"372","lat": 28.51065,"lng":77.04834},
  {"place":"373","lat": 28.51065,"lng":77.04834},
  {"place":"374","lat": 28.49068,"lng":77.06744},
  {"place":"375","lat": 28.44439,"lng":77.05201},
  {"place":"376","lat": 28.45335,"lng":77.08169},
  {"place":"377","lat": 28.50341,"lng":77.03317},
  {"place":"378","lat": 28.51114,"lng":77.04861},
  {"place":"379","lat": 28.51114,"lng":77.04861},
  {"place":"380","lat": 28.51073,"lng":77.04822},
  {"place":"381","lat": 28.51073,"lng":77.04822},
  {"place":"382","lat": 28.43463,"lng":77.05857},
  {"place":"384","lat": 28.51068,"lng":77.04823},
  {"place":"385","lat": 28.51068,"lng":77.04823},
  {"place":"386","lat": 28.4981,"lng":77.08402},
  {"place":"387","lat": 28.44467,"lng":77.05187},
  {"place":"390","lat": 28.44111,"lng":77.08205},
  {"place":"392","lat": 28.45758,"lng":76.98719},
  {"place":"393","lat": 28.43484,"lng":77.0584},
  {"place":"394","lat": 28.42157,"lng":77.10382},
  {"place":"395","lat": 28.50382,"lng":77.06898},
  {"place":"396","lat": 28.50435,"lng":77.06902},
  {"place":"397","lat": 28.47721,"lng":77.04276},
  {"place":"398","lat": 28.48898,"lng":77.05598},
  {"place":"399","lat": 28.44983,"lng":77.00096},
  {"place":"400","lat": 28.42693,"lng":77.04626},
  {"place":"402","lat": 28.43244,"lng":77.03633},
  {"place":"404","lat": 28.37268,"lng":76.9093},
  {"place":"405","lat": 28.50179,"lng":77.08344},
  {"place":"406","lat": 28.50244,"lng":76.99546},
  {"place":"407","lat": 28.50244,"lng":76.99546},
  {"place":"408","lat": 28.45791,"lng":77.03452},
  {"place":"410","lat": 28.45282,"lng":77.05023},
  {"place":"411","lat": 28.50028,"lng":77.083},
  {"place":"412","lat": 28.42728,"lng":77.09829},
  {"place":"413","lat": 28.42828,"lng":77.09881},
  {"place":"414","lat": 28.42729,"lng":77.09832},
  {"place":"415","lat": 28.41283,"lng":77.04263},
  {"place":"416","lat": 28.41283,"lng":77.04263},
  {"place":"417","lat": 28.50432,"lng":77.05391},
  {"place":"418","lat": 28.41198,"lng":77.04336},
  {"place":"419","lat": 28.41198,"lng":77.04336},
  {"place":"420","lat": 28.42726,"lng":77.09824},
  {"place":"421","lat": 28.41159,"lng":77.04229},
  {"place":"422","lat": 28.41159,"lng":77.04229},
  {"place":"423","lat": 28.37544,"lng":76.90667},
  {"place":"424","lat": 28.37544,"lng":76.90667},
  {"place":"425","lat": 28.41177,"lng":77.04279},
  {"place":"426","lat": 28.41177,"lng":77.04279},
  {"place":"427","lat": 28.39673,"lng":77.03954},
  {"place":"429","lat": 28.42725,"lng":77.0983},
  {"place":"430","lat": 28.42719,"lng":77.09815},
  {"place":"431","lat": 28.42732,"lng":77.0983},
  {"place":"432","lat": 28.44008,"lng":77.00677},
  {"place":"433","lat": 28.45349,"lng":77.05103},
  {"place":"434","lat": 28.42029,"lng":76.90793},
  {"place":"435","lat": 28.42029,"lng":76.90793},
  {"place":"436","lat": 28.47518,"lng":77.00862},
  {"place":"437","lat": 28.45354,"lng":77.05074},
  {"place":"438","lat": 28.47467,"lng":77.00926},
  {"place":"439","lat": 28.45356,"lng":77.05119},
  {"place":"440","lat": 28.45343,"lng":77.05109},
  {"place":"441","lat": 28.45357,"lng":77.0509},
  {"place":"442","lat": 28.48429,"lng":77.01289},
  {"place":"443","lat": 28.45347,"lng":77.05107},
  {"place":"444","lat": 28.37262,"lng":76.89378},
  {"place":"445","lat": 28.45292,"lng":77.05028},
  {"place":"446","lat": 28.51168,"lng":77.04068},
  {"place":"447","lat": 28.51168,"lng":77.04068},
  {"place":"448","lat": 28.51161,"lng":77.04041},
  {"place":"449","lat": 28.51161,"lng":77.04041},
  {"place":"450","lat": 28.51111,"lng":77.04008},
  {"place":"451","lat": 28.51111,"lng":77.04008},
  {"place":"453","lat": 28.42733,"lng":77.09811}
]

  let Locations = [
    {"place": "A","lat": 28.47686, "lng": 77.08518},
    {"place": "B","lat":28.462719876100092,"lng": 77.0802879999971},
    {"place": "C","lat":28.42659,"lng": 77.04637 },
    {"place": "D","lat": 28.45185,"lng": 77.04287},
    {"place": "E","lat": 28.44400807967219,"lng": 77.07265509195881},
    {"place": "F","lat":28.397206666099986,"lng": 77.04948080606958},
    {"place": "G","lat":28.40562961592259,"lng": 77.0913071734487},
    {"place": "H","lat":28.431009634550463,"lng": 77.08613977632363}
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
        defaultCenter={{ "lat":28.462719876100092,"lng": 77.0802879999971 }}
        // defaultCenter={{ "lat":28.462719876100092,"lng": 77.0802879999971 }}
        defaultOptions={{ styles: myStyles }}
      >
        {z2.map((map, index) => {
          return <Marker  
          key = {"x"+index}
          // zIndex={1000000}
          icon={{
            url: marker3, scaledSize: new window.google.maps.Size(20, 30),
            // origin: new window.google.maps.Point(0, 0),
            // anchor: new window.google.maps.Point(32,65),
            labelOrigin: new window.google.maps.Point(35, 25),
          }} onClick={() => setLocation("Zomato1" + index)} position={{ lat: Number(map.lat), lng: Number(map.lng) }} >
            {
              // location == false ?
              location == `Zomato1${index}` ?

                <InfoWindow>
                  <div>
                    {map.place}
                  </div>
                </InfoWindow>
                : null}
          </Marker>
        })}
        {final.map((map, index) => {
          return <Marker  
          key = {"y"+index}
          // zIndex={1000000}
          icon={{
            url: marker2, scaledSize: new window.google.maps.Size(20, 30),
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
        {Locations.map((map, index) => {
          return <Marker  
          key = {"z"+index}
          // zIndex={1000000}
          icon={{
            url: marker, scaledSize: new window.google.maps.Size(20, 30),
            // origin: new window.google.maps.Point(0, 0),
            // anchor: new window.google.maps.Point(32,65),
            labelOrigin: new window.google.maps.Point(35, 25),
          }} onClick={() => setLocation("Zomato3" + index)} position={{ lat: Number(map.lat), lng: Number(map.lng) }} >
            {
              // location == false ?
              location == `my` ?

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
