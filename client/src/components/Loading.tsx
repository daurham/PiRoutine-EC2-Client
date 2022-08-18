import React from 'react';
import Spinner, {
  SpinnerContainer,
  SpinnerInnerContainer,
} from './utils/Spinner';

// type Props = {}

export default function Loading() {
  return (
    <SpinnerContainer>
      <SpinnerInnerContainer>
        <Spinner />
      </SpinnerInnerContainer>
    </SpinnerContainer>
  );
}
