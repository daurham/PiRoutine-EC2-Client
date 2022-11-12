import React, { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import RecordsModal from './RecordsModal';
import Loading from './utils/Loading';
import {
  InfoContainer,
  InfoEntry,
  InnerValRed,
  InnerValWhite,
  MainInfoContainer,
  MetaContainer,
  SeeMoreStyle,
} from './styles/InfoStyles';
import { DisarmRecordsObj } from '../../../types';

type Props = {
  motivation: string | undefined;
  hasFailed: boolean;
  currentPhase: 1 | 2 | 3;
  currentAlarm: string | undefined;
  alarm1: string | undefined;
  alarm2: string | undefined;
  isDisarmed: boolean | undefined;
  streak: number | undefined;
  maxStreak: number | undefined;
  skipDate: string | undefined;
  skippedCount: number | undefined;
  soakedCount: number | undefined;
  disarmRecords: DisarmRecordsObj[];
};

export default React.memo(
  ({
    motivation,
    hasFailed,
    currentPhase,
    streak,
    currentAlarm,
    isDisarmed,
    alarm1,
    alarm2,
    skipDate,
    maxStreak,
    skippedCount,
    disarmRecords,
    soakedCount,
  }: Props) => {
    const [seeMore, setSeeMore] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = useCallback(() => setShow(false), [setShow]);
    const handleShow = () => setShow(true);

    return (
      <>
        <InfoContainer>
          <MainInfoContainer>
            {currentPhase === 3 && !hasFailed && motivation && (
              <>
                <InfoEntry>{motivation.toUpperCase()}</InfoEntry>
                <br />
              </>
            )}

            <InfoEntry>
              {'Streak Count: '}
              {streak !== undefined ? streak : <Loading />}
            </InfoEntry>

            <InfoEntry>
              {'Alarm: '}
              {currentAlarm ? (
                <InnerValRed className="alarm">{currentAlarm}</InnerValRed>
              ) : (
                <Loading />
              )}
            </InfoEntry>

            <InfoEntry>
              {'Status: '}
              {!isDisarmed ? (
                <InnerValRed>Armed 💦</InnerValRed>
              ) : (
                <InnerValWhite>Disarmed 😌</InnerValWhite>
              )}
            </InfoEntry>

            {seeMore && (
              <MetaContainer>
                <InfoEntry>
                  {'Alarm 1: '}
                  {alarm1 ? (
                    <InnerValRed className="alarm">{alarm1}</InnerValRed>
                  ) : (
                    <Loading />
                  )}
                </InfoEntry>

                <InfoEntry>
                  {'Alarm 2: '}
                  {alarm2 ? (
                    <InnerValRed className="alarm">{alarm2}</InnerValRed>
                  ) : (
                    <Loading />
                  )}
                </InfoEntry>

                <InfoEntry>
                  {'Longest Streak: '}
                  {maxStreak !== undefined ? maxStreak : <Loading />}
                </InfoEntry>

                <InfoEntry>
                  {'Current Phase: '}
                  {currentPhase || <Loading />}
                </InfoEntry>

                <InfoEntry>
                  {'Skipping: '}
                  {skipDate ? (
                    <InnerValRed>{skipDate}</InnerValRed>
                  ) : (
                    <Loading />
                  )}
                </InfoEntry>

                <InfoEntry>
                  {'Days Skipped: '}
                  {skippedCount !== undefined ? skippedCount : <Loading />}
                </InfoEntry>

                <InfoEntry>
                  {'Days Soaked: '}
                  {soakedCount !== undefined ? soakedCount : <Loading />}
                </InfoEntry>

                <InfoEntry>
                  {disarmRecords ? (
                    <Button
                      size="sm"
                      variant="outline-warning"
                      onClick={handleShow}
                    >
                      Show Records
                    </Button>
                  ) : (
                    <Loading />
                  )}
                </InfoEntry>
              </MetaContainer>
            )}

            <InfoEntry>
              <SeeMoreStyle onClick={() => setSeeMore(!seeMore)}>
                {!seeMore ? 'show more' : 'show less'}
              </SeeMoreStyle>
            </InfoEntry>
          </MainInfoContainer>
          <br />
        </InfoContainer>
        {disarmRecords && (
          <RecordsModal
            show={show}
            handleClose={handleClose}
            disarmRecords={disarmRecords}
          />
        )}
      </>
    );
  },
);
