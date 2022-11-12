import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import useGeolocation from './utils/useGeolocation';

type Props = {
  distance: number;
  setDistance: (arg0: number | (() => number)) => void;
  currentPhase: number;
  currentTime: string;
  isDisarmed: boolean | undefined;
};
type LType = number | undefined;

export default function GeoProgressBar({
  distance,
  setDistance,
  currentPhase,
  isDisarmed,
  currentTime,
}: Props) {
  const {
    data: { latitude, longitude },
  } = useGeolocation();

  const [changeLat, getChangeLat] = useState<number>(0);
  const [changeLon, getChangeLon] = useState<number>(0);
  const [initialLat, setInitialLat] = useState(latitude);
  const [initialLon, setInitialLon] = useState(longitude);

  const convertToDistance = (input: number): number => {
    const result = Math.floor(((input - 0) * 100) / (0.004)); // Edit 2
    // const result = Math.floor(((input - 0) * 100) / (0.002 - 0)); // Edit 1
    // const result = Math.floor(((input - 0) * 100) / (0.003 - 0)); // Original Value
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
    if (
      initL !== lonLat
      && initL !== undefined
      && lonLat !== undefined
      && change !== undefined
    ) {
      const v = change + Math.abs(Math.abs(initL) - Math.abs(lonLat));
      setChangeCb(() => v);
      setInitCb(() => lonLat);
    }
  };

  useEffect(() => {
    // TRACK CURRENT LOCATION CHANGE
    if (currentPhase === 2 && distance < 100 && latitude && longitude) {
      calculateDifference(
        changeLat,
        latitude,
        initialLat,
        setInitialLat,
        getChangeLat,
      );
      calculateDifference(
        changeLon,
        longitude,
        initialLon,
        setInitialLon,
        getChangeLon,
      );
      // setDistance(convertToDistance(changeLat)); // Comment out for Testing
      setDistance(convertToDistance(changeLat) + convertToDistance(changeLon)); // Testing
    }
    if (distance > 100) setDistance(100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude, initialLat, initialLon, distance]);

  useEffect(() => {
    if (!initialLat) {
      setInitialLat(() => latitude);
    }
    if (!initialLon) {
      setInitialLon(() => longitude);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude]);

  useEffect(() => {
    // if (distance || distance === 0) setDistance(distance + 5); // TESTING
  }, [currentTime]);

  if (isDisarmed) return null;

  return (
    <div>
      <ProgressBar
        animated
        variant="info"
        now={distance}
        label={`${distance || 0}%`}
      />
      <br />
    </div>
  );
}
