import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import useGeolocation from './utils/useGeolocation';

type Props = {
  distance: number | undefined;
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

  const convertToDistance = (input: number): number => {
    const result = Math.floor(((input - 0) * 100) / (0.003 - 0));
    // console.log('resutl: ', result);
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
    if (initL !== lonLat && initL && lonLat && change) {
      const v = change + Math.abs(Math.abs(initL) - Math.abs(lonLat));
      setChangeCb(() => v);
      setInitCb(() => lonLat);
    }
  };

  useEffect(() => { // TRACK CURRENT LOCATION CHANGE
    if (distance !== undefined) {
      if (currentPhase === 2 && distance < 100 && latitude && longitude) {
        calculateDifference(changeLat, latitude, initialLat, setInitialLat, getChangeLat);
        calculateDifference(changeLon, longitude, initialLon, setInitialLon, getChangeLon);
        setDistance(() => convertToDistance(changeLat)); // Comment out for Testing
      }
      if (distance > 100) setDistance(100);
    }
  }, [latitude, longitude, initialLat, initialLon, distance]);

  useEffect(() => {
    if (!initialLat) {
      setInitialLat(() => latitude);
    }
    if (!initialLon) {
      setInitialLon(() => longitude);
    }
  }, [latitude, longitude]);

  // useEffect(() => {
  // if (distance || distance === 0) setDistance(distance + 5); // TESTING
  // }, [currentTime]);

  if (isDisarmed) return null;

  return (
    <div>
      <ProgressBar animated variant="info" now={distance} label={`${distance || 0}%`} />
      <br />
    </div>
  );
}
