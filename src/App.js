import React from 'react'

import TypeTutor from './tutor';
// import Footer from './components/footer';
import Header from './components/header';
import PrimaryButton from './components/PrimaryButton';
import styled from 'styled-components';
import TypedReactDemo from './components/TypingAnim'

const AppDiv = styled.div`
     width: 100%;
     margin: auto;
`;

const ModalDiv = styled.div`
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 85vh;
    background: rgba(255, 255, 255, 1);
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;
    
    &.show {
        z-index:2;
        opacity:1;
    }
    
    &.hide {
      z-index: -2;
      opacity: 0;  
    }
    
    h4 {
        font-size: 1.42em;
        font-weight: 500;
    }
    
    p {
        width: 70%;
        text-align: center;
        line-height: 1.6em;
    }
`;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true,
        };

        this.hideModal = () => this.setState({ showModal: false });
        // this.showModal = () => this.setState({ showModal: true });
    }

    render() {
        const { showModal } = this.state;
        return (
            <AppDiv>
                <Header/>
                {showModal ? (<ModalDiv>
                    <TypedReactDemo
                        strings={[
                            'Lets get started',
                            'Increase your typing efficiency',
                            'Be a pro!'
                        ]}
                    />
                    <h4>Learn to type.</h4>
                    <p>Click button below to start your lesson.</p>
                    <PrimaryButton onClick={this.hideModal}>
                        Start
                    </PrimaryButton>
                </ModalDiv>): <TypeTutor/>}
                {/*<Footer/>*/}
            </AppDiv>
        )
    }
}

export default App;
