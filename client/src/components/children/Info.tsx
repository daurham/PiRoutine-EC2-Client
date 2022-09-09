import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useData } from '../../Context';
import RecordsModal from './Modal';
import {
  InfoContainer,
  InfoEntry,
  InfoRecEntry,
  InnerValRed,
  InnerValRedU,
  InnerValWhite,
  MainInfoContainer,
  MetaContainer,
  SeeMoreStyle,
} from '../styles/InfoStyles';
import Loading from '../Loading';

type Props = { phrase: string }

export default function Info({ phrase }: Props) {
  const {
    streak,
    currentAlarm,
    alarm1,
    alarm2,
    isDisarmed,
    tenSecAfterAlarm1,
    currentPhase,
    maxStreak,
    failed,
    longitude,
    latitude,
    distance,
    initialLat,
    initialLon,
    skippedCount,
    skipDate,
    setSkipped,
    setSoaked,
    soakedCount,
    disarmRecords,
    getMetaData,
  } = useData();
  const [seeMore, setSeeMore] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getMetaData();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // console.log('disarmRecords:', disarmRecords);

  return (
    <>
      <InfoContainer>
        <MainInfoContainer>
          {currentPhase === 3 && !failed && <InfoEntry>{phrase.toUpperCase()}</InfoEntry>}
          <br />
          <InfoEntry>Streak Count: {streak !== undefined ? streak : <Loading />}</InfoEntry>
          <InfoEntry>Alarm: {currentAlarm ? <InnerValRed className="alarm">{currentAlarm}</InnerValRed> : <Loading />}</InfoEntry>

          <InfoEntry>Status: {!isDisarmed ?
            <InnerValRed>Armed 💦</InnerValRed>
            : <InnerValWhite>Disarmed 😌</InnerValWhite>
          }</InfoEntry>
          {seeMore
            && (
              <MetaContainer>
                <InfoEntry>Alarm 1: {alarm1 ? <InnerValRed className="alarm">{alarm1}</InnerValRed> : <Loading />}</InfoEntry>
                <InfoEntry>Alarm 2: {alarm2 ? <InnerValRed className="alarm">{alarm2}</InnerValRed> : <Loading />}</InfoEntry>
                <InfoEntry>Longest Streak: {maxStreak !== undefined ? maxStreak : <Loading />}</InfoEntry>
                <InfoEntry>Current Phase: {currentPhase || <Loading />}</InfoEntry>
                <InfoEntry>Skipping: {skipDate !== undefined ? (<InnerValRed>{skipDate}</InnerValRed>) : (<div style={{ display: 'inline-flex' }}><Loading />Coming Soon<Loading /></div>)}</InfoEntry>
                <InfoEntry>Days Skipped: {skippedCount !== undefined ? skippedCount : (<div style={{ display: 'inline-flex' }}><Loading />Coming Soon<Loading /></div>)}</InfoEntry>
                <InfoEntry>Days Soaked: {soakedCount !== undefined ? soakedCount : (<div style={{ display: 'inline-flex' }}><Loading />Coming Soon<Loading /></div>)}</InfoEntry>
                <InfoEntry>Records: {disarmRecords ? <InfoRecEntry as={'u'} style={{ cursor: 'pointer' }} onClick={handleShow}>Show Records</InfoRecEntry> : <Loading />}</InfoEntry>
                <InfoEntry>Start Date: {<InnerValRedU>08/20/2022</InnerValRedU>}</InfoEntry>
              </MetaContainer>
            )}
          <InfoEntry><SeeMoreStyle onClick={() => setSeeMore(!seeMore)}>{!seeMore ? 'show more' : 'show less'}</SeeMoreStyle></InfoEntry>
        </MainInfoContainer>
        <br />
      </InfoContainer>
      {disarmRecords && <RecordsModal show={show} handleClose={handleClose} disarmRecords={disarmRecords} />}
    </>
  );
}
