import styled, { keyframes } from 'styled-components';

// Spinner Styles:

export const SpinnerContainer = styled.div`
  display: inline-flex;
`;
export const SpinnerInnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const BigSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
`;

// Spinner:
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid light-grey;
  border-right: 2px solid light-grey;
  border-bottom: 2px solid light-grey;
  border-left: 3px solid red;
  background: transparent;
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

export const BigSpinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid light-grey;
  border-right: 2px solid light-grey;
  border-bottom: 2px solid light-grey;
  border-left: 3px solid red;
  background: transparent;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export default Spinner;
