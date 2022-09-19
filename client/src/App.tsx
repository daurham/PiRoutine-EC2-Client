import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import TimeDisplay from './components/TimeDisplay';
import DisarmButton from './components/DisarmButton';
import GeoProgressBar from './components/GeoProgressBar';
import UnlockModal from './components/UnlockModal';
import Info from './components/Info';
import EditButton from './components/EditButton';
import Loading from './components/utils/Loading';
import { AppContainer, CenteringContainer } from './components/styles/AppStyles';
import {
  statusGenerator,
  theCurrentTime,
  getPhase,
} from './components/utils';
import {
  getAlarmTime,
  getDisarmStatus,
  getDisarmRecords,
  getSkipDateAndCount,
  getSoakedCount,
  getStreakCount,
} from './components/requests/getData';
import { updateAlarmTime, updateDisarmStatus } from './components/requests/updateData';
import {
  AlarmStateObj,
  DisarmDataObj,
  SkipDataObj,
  StreakDataObj,
  DisarmRecordsData,
  TimeObj
} from '../../types';

export default function App() {
  const [currentTime, setCurrentTime] = useState<string>();
  const [alarmData, setAlarmData] = useState<AlarmStateObj>({});
  const [disarmData, setDisarmData] = useState<DisarmDataObj>({});
  const [skipData, setSkipData] = useState<SkipDataObj>({});
  const [streakData, setStreakData] = useState<StreakDataObj>({});
  const [soakedCount, setSoakedData] = useState<number>(0);
  const [disarmRecords, setDisarmRecords] = useState<DisarmRecordsData>([]);
  const [currentPhase, setCurrentPhase] = useState<1 | 2 | 3 | undefined>();
  const [hasFailed, setFailed] = useState<boolean>(false);
  // GeoProgressBar
  const [distance, setDistance] = useState<number | undefined>();
  // 
  const [notSignedIn, setLock] = useState<boolean>(true);
  const [inputPin, setInputPin] = useState<string>('');
  const [inputStatus, setInputStatus] = useState<string>('Submit');
  // 
  const [showModal, setShowModal] = useState<boolean>(false);
  const [motivation, setMotivation] = useState<string>('');
  const [showUnlockModal, setShowUnlockModal] = useState<boolean>(false);

  const {
    alarm1,
    alarm2,
    currentAlarm,
    tenSecAfterAlarm1,
    tenSecAfterAlarm2,
  } = alarmData;

  const {
    hideDisarmBtn,
    isDisarmed,
  } = disarmData;

  const {
    streak,
    maxStreak,
  } = streakData;

  const {
    skipDate,
    skippedCount,
  } = skipData;

  let clock: any;

  const closeUnlockModal = () => setShowUnlockModal(false);
  const launchUnlockModal = () => setShowUnlockModal(true);

  // Load Requests
  const getAlarmData = () => getAlarmTime({ setAlarmData });
  const getDisarmData = () => getDisarmStatus({ setDisarmData });
  const getStreakData = () => getStreakCount({ setStreakData });
  const getSoakedData = () => getSoakedCount({ setSoakedData });
  const getDisarmRecordsData = () => getDisarmRecords({ setDisarmRecords });
  const getSkipData = () => getSkipDateAndCount({ setSkipData });
  const getMetaData = () => {
    getSkipData();
    getSoakedData();
    getDisarmRecordsData();
  };

  const updateAlarmData = (newTime: TimeObj) => updateAlarmTime({ timeData: newTime, getAlarmData });
  const updateDisarmData = (newStatus: boolean) => updateDisarmStatus({ disarmData: newStatus, getDisarmData })


  const handleCurrentTime = async () => {
    setCurrentTime(() => theCurrentTime());

    // Set Phase
    if (alarm1 && currentTime && alarm2) {
      const phase = getPhase(alarm1, alarm2, currentTime);
      if (!currentPhase || currentPhase !== phase) {
        setCurrentPhase(phase);
      }

      // __ IF IN PHASE I __
      if (currentPhase === 1) {
        // Show disarm button
        if (hideDisarmBtn) setDisarmData((prevState) => ({ ...prevState, hideDisarmBtn: false }));

        // Set current alarm
        if (currentAlarm !== alarm1) setAlarmData((prevState) => ({ ...prevState, currentAlarm: alarm1 }));

        // Handle alarm1 Failure
        if (currentTime === alarm1 && !isDisarmed) setFailed(true);
      }

      // __ IF IN PHASE II __
      if (currentPhase === 2) {
        // Set Alarm
        if (currentAlarm !== alarm2) setAlarmData((prevState) => ({ ...prevState, currentAlarm: alarm2 }));
        
        // Set Disatnce
        if (currentPhase === 2 && distance === undefined) setDistance(0);
        
        // Refresh disarm status & streak data
        if (currentTime === tenSecAfterAlarm1) {
          await getDisarmData();
          await getStreakData();
        }
        
        // Handle alarm2 Failure
        if (currentTime === alarm2 && !isDisarmed) setFailed(true);
      }

      // __IF IN PHASE III__
      if (currentPhase === 3) {
        if (currentAlarm !== alarm1) setAlarmData((prevState) => ({ ...prevState, currentAlarm: alarm1 }));

        if (currentTime === tenSecAfterAlarm2) {
          await getStreakData();
          await getDisarmData();
          setTimeout(() => {
            getDisarmRecordsData();
            setFailed(false);
          }, 5000);
        }
      }
    }
  };

  useEffect(() => { // TRACK TIME CHANGE
    if (alarm1 && !currentAlarm) setAlarmData((prevState) => ({ ...prevState, currentAlarm: alarm1 }));
    clock = setInterval(() => handleCurrentTime(), 1000);
    return () => clearInterval(clock);
  }, [currentTime]);

  useEffect(() => { // INITIAL GET DATA ON MOUNT
    getAlarmData();
    getStreakData();
    getDisarmData();
    getMetaData()
    handleCurrentTime();
  }, []);
  

  return !currentTime || !currentPhase ? <Loading big={true} /> : (
    // return !currentTime ? <Loading big={true} /> : (
    <AppContainer>
      <CenteringContainer>
        <Header />
        <TimeDisplay currentTime={currentTime} />
        <DisarmButton
          showModal={showModal}
          setShowModal={setShowModal}
          currentPhase={currentPhase}
          hideDisarmBtn={hideDisarmBtn}
          setDisarmData={setDisarmData}
          distance={distance}
          hasFailed={hasFailed}
          isDisarmed={isDisarmed}
          currentTime={currentTime}
          updateDisarmData={updateDisarmData}
          notSignedIn={notSignedIn}
          inputStatus={inputStatus}
          setInputStatus={setInputStatus}
          inputPin={inputPin}
          setInputPin={setInputPin}
          setLock={setLock}
          launchUnlockModal={launchUnlockModal}
        />
        {currentAlarm === alarm2 && typeof distance === 'number' && currentAlarm && <GeoProgressBar
        // {<GeoProgressBar
          distance={distance}
          setDistance={setDistance}
          currentPhase={currentPhase}
          currentTime={currentTime}
        />}
        {disarmRecords.length > 0 && <Info
          motivation={motivation}
          setMotivation={setMotivation}
          statusGenerator={statusGenerator}
          getMetaData={getMetaData}
          hasFailed={hasFailed}
          currentPhase={currentPhase}
          streak={streak}
          currentAlarm={currentAlarm}
          isDisarmed={isDisarmed}
          alarm1={alarm1}
          alarm2={alarm2}
          skipDate={skipDate}
          maxStreak={maxStreak}
          skippedCount={skippedCount}
          disarmRecords={disarmRecords}
          soakedCount={soakedCount}
        />}
        <EditButton
          showModal={showModal}
          setShowModal={setShowModal}
          skipDate={skipDate}
          getSkipData={getSkipData}
          notSignedIn={notSignedIn}
          updateAlarmData={updateAlarmData}
          launchUnlockModal={launchUnlockModal}
        />
        {notSignedIn && <UnlockModal
          handleClose={closeUnlockModal}
          inputPin={inputPin}
          inputStatus={inputStatus}
          setInputPin={setInputPin}
          setInputStatus={setInputStatus}
          setLock={setLock}
          show={showUnlockModal}
        />}
      </CenteringContainer>
    </AppContainer>
  );
}
