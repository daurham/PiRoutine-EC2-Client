import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    background-color: black;
    color: white;
    // margin: 5%
  }
`;

export const FlexCenteringContainer = styled.div`
display: flex;
justify-content: center;
`;
