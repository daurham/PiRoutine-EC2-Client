import React from 'react';
import Spinner, {
  BigSpinner,
  SpinnerContainer,
  SpinnerInnerContainer,
  BigSpinnerContainer,
} from './Spinner';

type Props = {
  big?: boolean;
};

export default function Loading({ big }: Props) {
  return big ? (
    <BigSpinnerContainer>
      <SpinnerInnerContainer>
        <BigSpinner />
      </SpinnerInnerContainer>
    </BigSpinnerContainer>
  ) : (
    <SpinnerContainer>
      <SpinnerInnerContainer>
        <Spinner />
      </SpinnerInnerContainer>
    </SpinnerContainer>
  );
}
