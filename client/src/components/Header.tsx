import React from 'react';
import { HeaderContainer, Title } from './styles/HeaderStyles';

export default React.memo(() => {
  return (
    <HeaderContainer>
      <Title className="title">PIROUTINE</Title>
    </HeaderContainer>
  );
});
