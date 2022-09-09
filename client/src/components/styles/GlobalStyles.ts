import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
  }
  * {
    color: white;
  }
  
  .modal-content {
    background-color: black;
    border-color: #00c1f5;
  }

  .modal-backdrop {
    // background-color: blue;
  }

  .modal-title {
    justify-content: spaced-between;

  }
  .oddtable {
    background-color: #091012;
  }

  .failed {
    color: red;
  }
`;

export const FlexCenteringContainer = styled.div`
display: flex;
justify-content: center;
`;

