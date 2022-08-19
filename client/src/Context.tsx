import React,
{
  useEffect,
  useState,
  useMemo,
  useContext,
  useCallback,
} from 'react';
import axios from 'axios';
import useGeolocation from './components/utils/useGeolocation';
import Loading from './components/Loading';
import {
  addMinutes,
  addSeconds,
  getFirstAlarm,
  getSecondAlarm,
  parseTimeData,
  swapBinaryAndBool,
  theCurrentTime,
} from './components/utils';

// type ContextType = string | number | Date | undefined;
type MemoContext = {
  currentTime: string | undefined;
  currentAlarm: string | null;
  alarm1: string | null;
  alarm2: string | null;
  streak: number;
  isDisarmed: boolean;
} | string | number;
const DataContext = React.createContext<MemoContext>(0);
// const DataContext = React.createContext<ContextType>(0);

export function useData() {
  return useContext(DataContext);
}

type ContextProps = {
  children: JSX.Element;
};

export default function Context({ children }: ContextProps) {
  // const {
  //   loading,
  //   error,
  //   data: { latitude, longitude },
  // } = useGeolocation();

  // const [changeLat, getChangeLat] = useState(0);
  // const [changeLon, getChangeLon] = useState(0);
  // type LType = number | undefined;
  // const [initialLat, setInitialLat] = useState<LType>(latitude);
  // const [initialLon, setInitialLon] = useState<LType>(longitude);
  // const [once, setOnce] = useState<boolean>(false);
  // const [once2, setOnce2] = useState<boolean>(false);
  // const [distance, setDistance] = useState<number>(0);
  // const [isDisarmed, setDisarmStatus] = useState<boolean>();

  const [alarm1, setAlarm1] = useState<string>();
  const [alarm2, setAlarm2] = useState<string>();
  const [tenSecAfterAlarm1, setTenSecAfterAlarm1] = useState<string>();
  const [currentAlarm, setCurrentAlarm] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>();
  const [streak, setStreak] = useState<number>(0);
  const [isDisarmed, setDisarmStatus] = useState<boolean>();
  const [currentPhase, setCurrentPhase] = useState<number>(0);

  let interval;
  let clock: Timer;

  // if (!once && latitude && longitude) {
  //   setInitialLat(() => latitude);
  //   setInitialLon(() => longitude);
  //   setOnce(() => true);
  // }

  // const dConvert = (input) => Math.floor(((input - 0) * 100) / (.003 - 0));

  // let dif = (c, l, i, cb, ccb) => { // calucate the difference between geolocation reading
  //   if (i !== l) {
  //     if (l) {
  //       let v = c + Math.abs(Math.abs(i) - Math.abs(l));
  //       ccb(() => v);
  //       cb(() => l);
  //     }
  //   }
  // };

  const getAlarmTime = async () => {
    try {
      const { data } = await axios.get('/get-alarm-time');
      const { hour, minute } = parseTimeData(data);
      console.log('context data alar; h, m:', hour, minute);
      const firstAlarmTimestamp = getFirstAlarm(hour, minute);
      const secondAlarmTimestamp = getSecondAlarm(firstAlarmTimestamp);
      const tenSecAfterTimestamp = addSeconds(firstAlarmTimestamp, 10);
      setAlarm1(() => firstAlarmTimestamp.toLocaleTimeString());
      setAlarm2(() => secondAlarmTimestamp.toLocaleTimeString());
      setTenSecAfterAlarm1(() => tenSecAfterTimestamp.toLocaleTimeString());
    } catch (err) {
      console.log('err?: ', err);
      const firstAlarmTimestamp = getFirstAlarm(6, 0);
      const secondAlarmTimestamp = getSecondAlarm(firstAlarmTimestamp);
      setAlarm1(() => firstAlarmTimestamp.toLocaleTimeString());
      setAlarm2(() => secondAlarmTimestamp.toLocaleTimeString());
    }
  };

  const getDisarmStatus = async () => {
    try {
      const { data } = await axios.get('/get-disarm-status');
      console.log('disarm get data', data);
      let { disarmedstatus } = data[0];
      disarmedstatus = swapBinaryAndBool(disarmedstatus);
      setDisarmStatus(() => disarmedstatus);
    } catch (err) {
      console.log('err?: ', err);
      setDisarmStatus(() => 0);
    }
  };

  const getStreak = async () => {
    try {
      const { data } = await axios.get('/get-streak-count');
      const { streak } = data[0];
      console.log('streak get data', data);
      setStreak(() => streak);
    } catch (err) {
      console.log('err?: ', err);
      setStreak(() => 0);
    }
  };

  interface TimeObj { hour: number; minute: number; tod: string }
  const updateAlarmTime = async (timeData: TimeObj) => {
    const { hour, minute, tod } = timeData;
    let hr = Number(hour);
    const min = Number(minute);
    if (tod === 'PM') hr += 12;
    console.log('time data', timeData);
    try {
      await axios.patch('/update-alarm-time', { hour: hr, minute: min, tod });
      await getAlarmTime();
    } catch (err) {
      console.log('err:', err);
    }
  };

  const updateDisarmStatus = async (statusData: boolean) => {
    const convertedStatusData = swapBinaryAndBool(statusData);
    try {
      await axios.patch('/update-disarm-status', { data: convertedStatusData });
      await getDisarmStatus();
    } catch (err) {
      console.log('Error update defuse data:', data);
    }
  };

  const updateStreakCount = async (newData: number) => {
    console.log('sending streak data:', newData);
    try {
      await axios.patch('/update-streak-count', { data: newData });
      await getStreak();
    } catch (err) {
      console.log('Error update streak data:', data);
    }
  };

  const handleCurrentTime = () => {
    setCurrentTime(() => theCurrentTime());
    if (alarm1) {
      // PHASE 1
      if (currentTime <= alarm1) {
        if (currentAlarm !== alarm1) {
          setCurrentAlarm(alarm1);
        }
        if (currentPhase !== 1) {
          setCurrentPhase(1);
        }
        if (currentTime === alarm1 && !isDisarmed) {
          // Run Sad functions
        }
        // console.log('phase 1')
      }
      // PHASE 2
      if (currentTime > alarm1 && currentTime <= alarm2) {
        if (currentAlarm !== alarm2) {
          setCurrentAlarm(alarm2);
        }
        if (currentAlarm === tenSecAfterAlarm1 && isDisarmed) {
          setDisarmStatus(false);
        }
        if (currentPhase !== 2) {
          setCurrentPhase(2);
        }
        // console.log('phase 2')
      }
      // AFTER 2ND ALARM
      if (currentTime > alarm2) {
        // console.log('phase 3')
        if (currentAlarm !== alarm1) {
          setCurrentAlarm(alarm1);
        }
        if (currentPhase !== 3) {
          setCurrentPhase(3);
        }
      }
    }
  };

  // useEffect(() => { // KEEP ALARM2 UP TO DATE
  //   setAlarm2(() => getSecondAlarm(alarm1).toLocaleTimeString());
  // }, [alarm1]);

  // useEffect(() => { // KEEP TRACK OF CURRENT ALARM
  //   // PHASE 1
  //   if (currentTime <= alarm1) {
  //     if (currentAlarm !== alarm1) {
  //       setCurrentAlarm(alarm1);
  //     }
  //   }
  //   // PHASE 2
  //   if (currentTime > alarm1 && currentTime <= alarm2) {
  //     if (currentAlarm !== alarm2) {
  //       setCurrentAlarm(alarm2);
  //     }
  //   }
  //   if (currentTime > alarm2) {
  //     if (currentAlarm !== alarm1) {
  //       setCurrentAlarm(alarm1);
  //     }
  //   }
  // }, [currentTime]);

  // useEffect(() => { // TRACK CURRENT LOCATION CHANGE
  //   dif(changeLat, latitude, initialLat, setInitialLat, getChangeLat);
  //   dif(changeLon, longitude, initialLon, setInitialLon, getChangeLon);
  //   setDistance(() => dConvert(changeLat));
  // }, [latitude]);

  useEffect(() => { // TRACK TIME CHANGE
    clock = setInterval(() => handleCurrentTime(), 1000);
    return () => clearInterval(clock);
  }, [currentTime]);

  useEffect(() => { // INITIAL GET ALARM DATA / ON MOUNT
    getAlarmTime();
    getStreak();
    getDisarmStatus();
  }, []);

  const value = useMemo(() => ({
    //   distance,
    //   setDistance,
    //   latitude,
    //   longitude,
    alarm1,
    alarm2,
    tenSecAfterAlarm1,
    currentAlarm,
    currentTime,
    streak,
    isDisarmed,
    currentPhase,
    //   setCurrentTime,
    //   setAlarm1,
    //   setAlarm2,
    //   getAlarmTime,
    //   getStreak,
    setDisarmStatus,
    getDisarmStatus,
    updateAlarmTime,
    updateDisarmStatus,
    updateStreakCount,
  }), [
    alarm1,
    alarm2,
    tenSecAfterAlarm1,
    currentAlarm,
    currentTime,
    streak,
    isDisarmed,
    currentPhase,
    //   distance,
    //   latitude,
    //   longitude,
    //   updateAlarmTime,
    //   updateDisarmStatus,
    //   updateStreakCount,
  ]);

  // return (!currentTime || !alarm1) ? <Loading /> : (
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}
