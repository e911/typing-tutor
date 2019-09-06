import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  grid-area: header;
  position: fixed;
  width: 100%
  top: 0;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  height: 60px;
  box-shadow: 0 2px 2px 0 #b2b2b2;
  z-index: 100;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  padding: 20px;
  color: rgb(1,167,88);
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  padding: 20px;
`;

const Header = () => {
    return (
        <>
            <HeaderContainer>
                <LeftContainer>Typing Tutor</LeftContainer>
                <RightContainer>Pujan Thapa</RightContainer>
            </HeaderContainer>
        </>
    );
};

export default Header;
