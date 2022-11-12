import styled from 'styled-components';
import { FlexCenteringContainer } from './GlobalStyles';

export const SelectStyle = styled.select`
  height: 100%;
  background: black;
  color: white;
  // scrollbar-width: thin
`;
export const OptionStyle = styled.option`
  // scrollbar-width: thin
`;

export const UnlockContainer = styled.div`
  justify-content: center;
  display: flex;
`;

export const EditTimeContainer = styled.div`
  display: inherit;
  justify-content: center;
`;

export const FormContainer = FlexCenteringContainer;
