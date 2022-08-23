import React, { useState } from 'react';
import { useData } from '../../Context';
import { InfoContainer, InfoEntry, MainInfoContainer, MetaContainer, SeeMoreStyle } from '../styles/InfoStyles';
import Loading from '../Loading';

// type Props = {}

export default function Info() {
  const {
    streak,
    currentAlarm,
    alarm1,
    alarm2,
    isDisarmed,
    tenSecAfterAlarm1,
    currentPhase,
    longitude,
    latitude,
    distance,
    initialLat,
    initialLon,
  } = useData();
  const [seeMore, setSeeMore] = useState(false);

  return (
    <InfoContainer>
      <MainInfoContainer>
        <InfoEntry>Streak Count: {streak || <Loading />}</InfoEntry>

        <InfoEntry>Alarm: {currentAlarm ? <div style={{ display: 'inline-flex', color: 'red' }}>{currentAlarm}</div> : <Loading />}</InfoEntry>

        <InfoEntry>Status: {!isDisarmed ?
          <div style={{ display: 'inline-flex', color: 'red' }}>Armed 💦</div>
          : <div style={{ display: 'inline-flex', color: 'white' }}>Disarmed 😌</div>
        }</InfoEntry>
        {seeMore &&
          <MetaContainer>
            <InfoEntry>Longest Streak: {streak}</InfoEntry>
            <InfoEntry>Alarm 1: {alarm1 ? <div style={{ display: 'inline-flex', color: 'red' }}>{alarm1}</div> : <Loading />}</InfoEntry>
            <InfoEntry>Alarm 2: {alarm2 ? <div style={{ display: 'inline-flex', color: 'red' }}>{alarm2}</div> : <Loading />}</InfoEntry>
            <InfoEntry>Current Phase: {currentPhase || <Loading />}</InfoEntry>
            {/* <InfoEntry>Distance %: {`${distance}%` || <Loading />}</InfoEntry> */}
            <InfoEntry>Days Skipped: {<Loading />}</InfoEntry>
            <InfoEntry>Days Soaked: {<Loading />}</InfoEntry>
            <InfoEntry>Records of Data: {<Loading />}</InfoEntry>
            <InfoEntry>Start Date: {<u style={{ display: 'inline-flex', color: 'red' }}>{'08/19/2022'}</u>}</InfoEntry>
          </MetaContainer>
        }
        <InfoEntry><SeeMoreStyle onClick={() => setSeeMore(!seeMore)} >{!seeMore ? 'show more' : 'show less'}</SeeMoreStyle></InfoEntry>
      </MainInfoContainer>
      <br />
    </InfoContainer>
  );
}
