import React, { useState, useEffect } from 'react';

interface Coordinates {
  latitude?: number;
  longitude?: number;
};

export default function useGeolocation(options?: PositionOptions | undefined) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<GeolocationPositionError>();
  const [data, setData] = useState<Coordinates>({});

  useEffect(() => {
    const successHandler = (location: GeolocationPosition) => {
      setLoading(false);
      setError(null!);
      setData(location.coords);
    };
    const errorHandler = (error: GeolocationPositionError) => {
      setError(error);
      setLoading(false);
    };
    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options,
    );
    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options,
    );
    return () => navigator.geolocation.clearWatch(id);
  }, [options]);

  return { loading, error, data };
};
