import React from 'react';
import styled from 'styled-components';


const FooterContainer = styled.div`
  width: 100%
  bottom: 0;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  height: 50px;
  z-index: 100;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  padding: 20px;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  padding: 20px;
  color: rgb(11,102,35);
`;

const Footer = () => {
    return (
        <>
            <FooterContainer>
                <LeftContainer>Typing Tutor</LeftContainer>
                <RightContainer href="https://github.com/e911" target="_newtab">Pujan Thapa</RightContainer>
            </FooterContainer>
        </>
    );
};

export default Footer;
