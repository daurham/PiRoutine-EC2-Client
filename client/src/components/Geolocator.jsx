import React, { useState, useEffect } from 'react';
// import { ProgressBar } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar'
import useGeolocation from "./useGeolocation";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function GeolocationComponent({distance}) {
  // const {
  //   loading,
  //   error,
  //   data: { latitude, longitude },
  // } = useGeolocation();
  // let distance = 100;

  // const [changeLat, getChangeLat] = useState(0);
  // const [changeLon, getChangeLon] = useState(0);
  // const [initialLat, setInitialLat] = useState(latitude);
  // const [initialLon, setInitialLon] = useState(longitude);
  // const [once, setOnce] = useState(false);

  // if (!once && latitude && longitude) {
  //   setInitialLat(() => latitude);
  //   setInitialLon(() => longitude);
  //   setOnce(() => true);
  // }
  // const dConvert = (input) => Math.floor(((input - 0) * 100) / (.003 - 0));

  // let dif = (c, l, i, cb, ccb) => {
  //   if (i !== l) {
  //     if (l === undefined) { console.log('not yet...', l) } else {
  //       let v = c + Math.abs(Math.abs(i) - Math.abs(l));
  //       ccb(() => v);
  //       cb(() => l);
  //     }
  //   }
  // }

  // useEffect(() => {
  //   dif(changeLat, latitude, initialLat, setInitialLat, getChangeLat);
  //   dif(changeLon, longitude, initialLon, setInitialLon, getChangeLon);
  //   distance = dConvert(changeLat);
  // }, [latitude]);

  // if (changeLat > 0.003) { enableButton(() => true) }

  // <div>Loading: {loading.toString()}</div>
  // <div>Error: {error?.message}</div>
  // <div>
  // </div>
  // <div>~Change In Lon:{changeLon}~</div>
  // <div>~Change In Lat:{changeLat}~</div>
  return (
    <ProgressBar isChild={true} now={distance} label={`${distance}%`} />
  )
}