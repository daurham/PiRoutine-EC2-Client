import React, { useCallback, useEffect, useState } from 'react';
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
  TimeObj,
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
  // 
  const [distance, setDistance] = useState<number | undefined>();
  //
  const [notSignedIn, setLock] = useState<boolean>(true);
  const [inputPin, setInputPin] = useState<string>('');
  const [inputStatus, setInputStatus] = useState<string>('Submit');
  //
  const [motivation, setMotivation] = useState<string>('');
  const [showUnlockModal, setShowUnlockModal] = useState<boolean>(false);

  const {
    alarm1,
    alarm2,
    currentAlarm,
    threeSecAfterAlarm1,
    threeSecAfterAlarm2,
    // tenSecAfterAlarm1,
    // tenSecAfterAlarm2,
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

  const closeUnlockModal = useCallback(() => setShowUnlockModal(false), [setShowUnlockModal]);
  const launchUnlockModal = useCallback(() => setShowUnlockModal(true), [setShowUnlockModal]);

  // Load Requests
  const getAlarmData = useCallback(() => getAlarmTime({ setAlarmData }), [setAlarmData]);
  const getDisarmData = useCallback(() => getDisarmStatus({ setDisarmData }), [setDisarmData]);
  const getStreakData = useCallback(() => getStreakCount({ setStreakData }), [setStreakData]);
  const getSoakedData = useCallback(() => getSoakedCount({ setSoakedData }), [setSoakedData]);
  const getDisarmRecordsData = useCallback(() => getDisarmRecords({ setDisarmRecords }), [setDisarmRecords]);
  const getSkipData = useCallback(() => getSkipDateAndCount({ setSkipData }), [setSkipData]);
  const getMetaData = () => {
    getSkipData()
      .catch(console.warn);
    getSoakedData()
      .catch(console.warn);
    getDisarmRecordsData()
      .catch(console.warn);
  };

  const updateAlarmData = useCallback((newTime: TimeObj): Promise<void> => updateAlarmTime(
    { timeData: newTime, getAlarmData },
  ), [getAlarmData]);

  const updateDisarmData = useCallback((newStatus: boolean): Promise<void> => updateDisarmStatus(
    { disarmData: newStatus, getDisarmData },
  ), [getDisarmData]);

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
        if (hideDisarmBtn) setDisarmData((prevS) => ({ ...prevS, hideDisarmBtn: false }));

        // Set current alarm
        if (currentAlarm !== alarm1) setAlarmData((prevS) => ({ ...prevS, currentAlarm: alarm1 }));

        // Handle alarm1 Failure
        if (currentTime === alarm1 && !isDisarmed) setFailed(true);
      }

      // __ IF IN PHASE II __
      if (currentPhase === 2) {
        // Set Alarm
        if (currentAlarm !== alarm2) setAlarmData((prevS) => ({ ...prevS, currentAlarm: alarm2 }));

        // Set Distance once logged in & ready to run
        if (currentPhase === 2 && distance === undefined) {
          setDistance(0);
        }

        // Refresh disarm status & streak data
        if (currentTime === threeSecAfterAlarm1) {
          await getDisarmData();
          await getStreakData();
        }

        // Handle alarm2 Failure
        if (currentTime === alarm2 && !isDisarmed) setFailed(true);
      }

      // __IF IN PHASE III__
      if (currentPhase === 3) {
        if (currentAlarm !== alarm1) setAlarmData((prevS) => ({ ...prevS, currentAlarm: alarm1 }));

        if (currentTime === threeSecAfterAlarm2) {
          await getStreakData();
          await getDisarmData();
          setTimeout(() => {
            getDisarmRecordsData()
              .catch(console.warn);
            setFailed(false);
          }, 5000);
        }
      }
    }
  };

  useEffect(() => { // TRACK TIME CHANGE
    if (alarm1 && !currentAlarm) setAlarmData((prevS) => ({ ...prevS, currentAlarm: alarm1 }));
    const clock: NodeJS.Timer = setInterval(() => handleCurrentTime(), 1000);
    return () => clearInterval(clock);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime]);

  useEffect(() => { // INITIAL GET DATA ON MOUNT
    getAlarmData()
      .catch(console.warn);
    getStreakData()
      .catch(console.warn);
    getDisarmData()
      .catch(console.warn);
    handleCurrentTime()
      .catch(console.warn);
    getMetaData();
    statusGenerator(setMotivation, hasFailed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !currentTime || !currentPhase ? <Loading big /> : (
    <AppContainer>
      <CenteringContainer>
        <Header />
        <TimeDisplay currentTime={currentTime} />
        <DisarmButton
          currentPhase={currentPhase}
          hideDisarmBtn={hideDisarmBtn}
          setDisarmData={setDisarmData}
          distance={distance}
          hasFailed={hasFailed}
          isDisarmed={isDisarmed}
          currentTime={currentTime}
          updateDisarmData={updateDisarmData}
          notSignedIn={notSignedIn}
          launchUnlockModal={launchUnlockModal}
        />
        {currentAlarm === alarm2 && typeof distance === 'number' && currentAlarm && (
          <GeoProgressBar
            distance={distance}
            setDistance={setDistance}
            currentPhase={currentPhase}
            currentTime={currentTime}
            isDisarmed={isDisarmed}
          />
        )}
        {disarmRecords.length > 0 && (
          <Info
            motivation={motivation}
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
          />
        )}
        <EditButton
          skipDate={skipDate}
          notSignedIn={notSignedIn}
          alarmTime={currentAlarm}
          getSkipData={getSkipData}
          updateAlarmData={updateAlarmData}
          launchUnlockModal={launchUnlockModal}
        />
        {notSignedIn && (
          <UnlockModal
            handleClose={closeUnlockModal}
            inputPin={inputPin}
            inputStatus={inputStatus}
            setInputPin={setInputPin}
            setInputStatus={setInputStatus}
            setLock={setLock}
            show={showUnlockModal}
          />
        )}
      </CenteringContainer>
    </AppContainer>
  );
}
