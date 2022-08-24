import React, { useState } from 'react';
import { useData } from '../../Context';
import { InfoContainer, InfoEntry, InnerValRed, InnerValRedU, InnerValWhite, MainInfoContainer, MetaContainer, SeeMoreStyle } from '../styles/InfoStyles';
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

        <InfoEntry>Alarm: {currentAlarm ? <InnerValRed>{currentAlarm}</InnerValRed> : <Loading />}</InfoEntry>

        <InfoEntry>Status: {!isDisarmed ?
          <InnerValRed>Armed 💦</InnerValRed>
          : <InnerValWhite>Disarmed 😌</InnerValWhite>
        }</InfoEntry>
        {seeMore &&
          <MetaContainer>
            <InfoEntry>Longest Streak: {streak}</InfoEntry>
            <InfoEntry>Alarm 1: {alarm1 ? <InnerValRed>{alarm1}</InnerValRed> : <Loading />}</InfoEntry>
            <InfoEntry>Alarm 2: {alarm2 ? <InnerValRed>{alarm2}</InnerValRed> : <Loading />}</InfoEntry>
            <InfoEntry>Current Phase: {currentPhase || <Loading />}</InfoEntry>
            <InfoEntry>Days Skipped: <Loading />Coming Soon<Loading /></InfoEntry>
            <InfoEntry>Days Soaked: <Loading /> Coming Soon <Loading /></InfoEntry>
            <InfoEntry>Records of Data: <Loading />Coming Soon<Loading /></InfoEntry>
            <InfoEntry>Start Date: {<InnerValRedU>08/19/2022</InnerValRedU>}</InfoEntry>
          </MetaContainer>
        }
        <InfoEntry><SeeMoreStyle onClick={() => setSeeMore(!seeMore)} >{!seeMore ? 'show more' : 'show less'}</SeeMoreStyle></InfoEntry>
      </MainInfoContainer>
      <br />
    </InfoContainer>
  );
}
