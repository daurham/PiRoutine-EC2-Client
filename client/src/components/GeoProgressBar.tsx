import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import useGeolocation from './utils/useGeolocation';

type Props = {
  distance: number;
  setDistance: (arg0: number | (() => number)) => void;
  currentPhase: number;
  currentTime: string;
  isDisarmed: boolean | undefined;
  notSignedIn: boolean | undefined;
};
type LType = number | undefined;

export default function GeoProgressBar({
  distance,
  setDistance,
  currentPhase,
  isDisarmed,
  currentTime,
  notSignedIn,
}: Props) {
  const {
    loading,
    error,
    data: { latitude, longitude },
  } = useGeolocation();

  const [changeLat, getChangeLat] = useState<number>(0);
  const [changeLon, getChangeLon] = useState<number>(0);
  const [initialLat, setInitialLat] = useState<LType>(latitude);
  const [initialLon, setInitialLon] = useState<LType>(longitude);
  const [testVal, setTestVal] = useState<number>(0);

  const convertToDistance = (input: number): number => {
    const result = Math.floor(((input - 0) * 100) / (0.003 - 0));
    setTestVal((n) => n + result);
    console.log(input, result);
    return result;
  };

  // Calculate the difference between geolocation reading
  const calculateDifference = (
    change: number,
    lonLat: number,
    initL: LType,
    setInitCb: (arg0: () => number) => void,
    setChangeCb: (arg0: () => number) => void,
  ) => {
    if (initL !== lonLat && initL !== undefined && lonLat !== undefined && change !== undefined) {
      const v = change + Math.abs(Math.abs(initL) - Math.abs(lonLat));
      setChangeCb(() => v);
      setInitCb(() => lonLat);
    }
  };

  useEffect(() => { // TRACK CURRENT LOCATION CHANGE
    if (currentPhase === 2 && distance < 100 && latitude && longitude) {
      calculateDifference(changeLat, latitude, initialLat, setInitialLat, getChangeLat);
      calculateDifference(changeLon, longitude, initialLon, setInitialLon, getChangeLon);
      setDistance((n) => n + Math.ceil(convertToDistance(changeLat))); // Comment out for Testing
    }
    if (distance > 100) setDistance(100);
  }, [latitude, longitude, initialLat, initialLon, distance]);

  useEffect(() => {
    if (!initialLat) {
      setInitialLat(() => latitude);
    }
    if (!initialLon) {
      setInitialLon(() => longitude);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    // if (distance || distance === 0) setDistance(distance + 5); // TESTING
  }, [currentTime, testVal]);

  if (isDisarmed) return null;

  return (
    <div>
      <ProgressBar animated variant="info" now={distance} label={`${distance || 0}%`} />
      <h1>{`test below: ${testVal}`}</h1>
      <h1>{`Distance: ${distance}`}</h1>
      <h1>{`Lat: ${latitude || 0}`}</h1>
      <h1>{`Lon: ${longitude || 0}`}</h1>
      <h3>{`cLat: ${changeLat}`}</h3>
      <h3>{`cLon: ${changeLon}`}</h3>
      <br />
    </div>
  );
}
