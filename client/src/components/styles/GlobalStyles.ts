import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
    color: white;
    margin: 5%
  }
`;

export const FlexCenteringContainer = styled.div`
display: flex;
justify-content: center;
`;
