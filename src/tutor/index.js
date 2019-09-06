import React, { Component } from 'react';
import './index.css';
import SecondaryButton from '../components/SecondaryButton';
import styled from 'styled-components';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';


// Initial state while typing
const INITIAL_STATE = {
    // The overall text data to type
    text: '',
    // state to store the index position for cursor after each word is typed
    wordIndexPosition: 0,
    // Initial loading timer
    timer: 5,
    // The array containing all the letters typed by the user
    typeState: [],
    // The array containing correct letters typed by the user
    progress: [],
    // Th time taken by user to type
    timeElapsed: 0,
    // state to show results after user finishes the text
    showResults: false,
    // the current word the user is typing
    currentWord: '',
    // words per minute
    wpm: 0,
    // Incorrect keys typed by the user stored in the format: [0,...,n-1] ;n= No. of consecutive errors typed
    incorrect: [],
    // Number of total incorrect
    incorrectNumber: 0,
};

const AppContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 85vh;
    min-height: fit-content;
    position: relative;
    top: 70px;
    width: 70%;
    margin: auto;
    max-width: 1300px;
    
    .watch {
        opacity: 1;
        padding: 1em 0 1em 1em;
    }
`;

const TutorContainer = styled.div`
    color: black;
    padding: 0 1em;
    width: 100%;
    line-height: 1.6em;
    font-weight: 400;
    position: relative;
    display: flex;
    flex-direction: column;
    font-size:20px;
`;

const CountDownTimer = styled.div`
    width: 70%;
    margin: auto;
    display: flex;
    box-sizing: border-box;
    background-color: rgba(1,167,88, 0.05);
    font-weight: bold;
    border-radius: 5px;
    color: rgba(1,167,88, 1);
    align-items: center;
    justify-content: center;
    transition: opacity .5s ease-in;
    transition-delay: .2s;
    margin-bottom: 0.7em;
    
    &.hide {
        opacity: 0;
    }
`;

const Loader = styled.div`
    display: inline-block;
    margin-top: 5em;
    align-self: center;
    justify-self: center;
    width: 64px;
    height: 64px;
    
    ::after {
        content: " ";
        display: block;
        width: 46px;
        height: 46px;
        margin: 1px;
        border-radius: 50%;
        will-change: transform;
        border-color: rgba(180, 241, 241, 0.678) transparent rgba(180, 241, 241, 0.678) transparent;
        animation: loadinganim 0.6s linear infinite;
    }
`;

const UserStats = styled.div`
    display:flex;
    flex-grow: 1;
    justify-content: space-around;
`;

const GeneratedText = styled.div`
    border: 1px solid rgb(1,167,88);
    padding: 1em;
    min-width: 100%;
    box-sizing: border-box;
    border-radius: 3.8px;
    margin: auto;
    text-align: center;
    
    .progressed {
        color: forestgreen;
        border-bottom: 1px solid forestgreen;
    }
    
    .error {
        background-color: #ef5145;
        border-bottom: 1px solid #ef5145;
        color: white;
    }
    
    span {
        font-size: 20px;
    }
    
    &.disabled {
        background-color: #ebe9e9cc;
        border: 1px solid #ebe9e9cc;
    }
`;


const ResultsDiv = styled.div`
    display:flex;
    flex-direction:column;
`;

const CurrentWord = styled.div`
    width: fit-content;
    margin: auto;
    padding: 2em 1em;
    
    .char {
        font-size: 1.42em;
        font-weight: 500;
        color: rgba(160, 160, 160, 0.43);
    }
    
    .char.typed {
        color: #5f5959;
    }
`;

const ResultsContainer = styled.div`
    margin-top: 2em;
    padding: 2em;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    
    p {
        margin: 0;
    } 
`;

const RetryButton = styled(SecondaryButton)`
    width: 30%;
    margin: auto;
`;

export default class TypeTutor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            wordIndexPosition: 0,
            timer: 5,
            typeState: [],
            progress: [],
            timeElapsed: 0,
            showResults: false,
            currentWord: '',
            wpm: 0,
            incorrect: [],
            incorrectNumber: 0,
        };
    }

    // Get text data on component load
    componentDidMount() {
        this.getTextData();
    }

    // Remove the event listener binding on unmount
    componentWillUnmount() {
        document.removeEventListener('keydown');
    }

    // Get the text, current Word to type, start timer and the watch
    getTextData = () => {
        const { wordIndexPosition } = this.state;
        const text = "This is a random typed text for demo purpose only. A demo text. Just a demo and nothing more, nothing less. Enjoy while it lasts. I am not sure why but good day sir!";
        this.setState({ text, currentWord: text.split(' ')[wordIndexPosition] });
        this.timer = setInterval(() => {
            const { timer } = this.state;
            if (timer === 0) {
                document.addEventListener('keydown', this.registerKeyDown);
                clearInterval(this.timer);
                this.startWatch()
            } else {
                this.setState(prev => ({ timer: prev.timer - 1 }))
            }
        }, 1000)
    };

    // Show the current word to type
    generateCurrentTypingWord = () => {
        const { currentWord, typeState } = this.state;
        const alphabets = currentWord.split('');
        return alphabets.map((char, index) => {
            const state = typeState[index] === char ? 'typed char' : 'char';
            return (
                <span className={state}>{char}</span>
            )
        })
    };

    // Show the text with typed, remaining as well as errored letters
    generateText = () => {
        const { text, progress, incorrect } = this.state;
        return text
            ? text.split('').map((char, index) => {
                const isErrored = incorrect.indexOf(index) >= 0;
                const correct = char === progress[index] ? 'progressed' : undefined;
                const className = isErrored ? 'error' : correct;
                return (
                    <span className={className}>
              {char}
            </span>
                )
            })
            : null
    };

    //Key down event register so as to know the typing info
    registerKeyDown = ({ key }) => {
        const { currentWord, typeState, text, wordIndexPosition, progress, timeElapsed, incorrect, incorrectNumber } = this.state;

        if (key === 'Shift') {
            return;
        }
        if (key === 'Backspace') {
            this.setState({
                incorrect: [...incorrect.slice(0, incorrect.length - 1)],
            });
            return
        }
        if (currentWord.length === typeState.length && !incorrect.length && key === ' ') {
            progress.push(key);

            this.keyboardRef.keyboard.removeButtonTheme("{space}", "currentKey");
            this.keyboardRef.keyboard.addButtonTheme(text.split(' ')[wordIndexPosition+1][0], "currentKey");

            this.setState({
                currentWord: text.split(' ')[wordIndexPosition + 1],
                wordIndexPosition: wordIndexPosition + 1,
                typeState: [],
                progress: [...progress],
                wpm: Math.floor(((wordIndexPosition + 1) / timeElapsed) * 60),
            })
        } else if (currentWord.charAt(typeState.length) === key && !incorrect.length) {
            typeState.push(key);
            progress.push(key);

            this.keyboardRef.keyboard.removeButtonTheme(currentWord.charAt(typeState.length-1), "currentKey");

            if (currentWord.charAt(typeState.length) === ''){
                this.keyboardRef.keyboard.addButtonTheme("{space}", "currentKey");
            }
            this.keyboardRef.keyboard.addButtonTheme(currentWord.charAt(typeState.length), "currentKey");

            this.setState({
                typeState: [...typeState],
                progress: [...progress],
            })
        } else if (incorrect.indexOf(progress.length + incorrect.length) < 0) {
            this.setState({
                incorrect: [...incorrect, progress.length + incorrect.length],
                incorrectNumber: incorrectNumber+1,
            })
        }
        if (text.length === progress.length) {
            clearInterval(this.watch);
            document.removeEventListener('keydown', this.registerKeyDown)
            this.setState({
                showResults: true,
                wpm: Math.floor((text.split(' ').length / timeElapsed) * 60),
            })
        }
    };

    // Reset everything
    reset = () => {
        if (this.timer) clearInterval(this.timer);
        if (this.watch) clearInterval(this.watch);
        this.setState(INITIAL_STATE, () => {
            this.getTextData()
        });
        this.setState({
            typeState: [],
            progress: []
        });
    };

    // Start watch
    startWatch = () => {
        this.watch = setInterval(() => {
            this.setState(prev => ({
                timeElapsed: prev.timeElapsed + 1,
            }))
        }, 1000)
    };

    onKeyBoardChange = (input) => {
        console.log("Input changed", input);
    };

    onKeyBoardKeyPress = (button) => {
        console.log("Button pressed", button);
    };

    render() {
        const { text, timer, currentWord, timeElapsed, showResults, wpm, incorrectNumber } = this.state;
        const seconds = timeElapsed % 60 > 9 ? timeElapsed % 60 : `0${timeElapsed % 60}`;
        const minutes =
            (timeElapsed - seconds) / 60 > 10
                ? (timeElapsed - seconds) / 60
                : `0${(timeElapsed - seconds) / 60}`;
        const accuracy = 100 - ((incorrectNumber/text.length)* 100).toFixed(2);
        const totalLength = text.length;
        const totalWords = text.split(" ").length;
        return (
            <AppContainer>
                <TutorContainer>
                    <CountDownTimer className={`${timer === 0 && 'hide'}`}>
                        {text.length
                            ? `${timer === 0 ? "Let's go!!" : `${timer} seconds to start!`}`
                            : 'Fetching text..'}
                    </CountDownTimer>
                    <div style={{ position: 'relative' }}>
                        {!showResults && (
                            <UserStats>
                                <p>{`Current Speed : ${wpm} wpm`}</p>
                                {/*<SecondaryButton onClick={this.reset}>*/}
                                    {/*Reset*/}
                                {/*</SecondaryButton>*/}
                                {(timeElapsed===0) ? null:(
                                    <SecondaryButton onClick={this.reset}>
                                    Reset
                                    </SecondaryButton>)
                                }
                                {(timeElapsed===0) ? (<div className='watch'>
                                    Time elapsed  00 : 00
                                </div>):(
                                    <div className='watch'>
                                    {`Time elapsed  ${minutes} : ${seconds}`}
                                    </div>)
                                }
                            </UserStats>
                        )}
                    </div>
                    {text.length ? (
                        <GeneratedText className={`${timer !== 0 && 'disabled'}`}>{this.generateText()}</GeneratedText>
                    ) : (
                        <Loader/>
                    )}
                    {!showResults ? (
                        <>
                        <CurrentWord>
                            {currentWord && this.generateCurrentTypingWord(currentWord)}
                        </CurrentWord>
                        <Keyboard
                            ref={r => this.keyboardRef = r}
                            onChange={input =>
                                this.onKeyBoardChange(input)}
                            onKeyPress={button =>
                                this.onKeyBoardKeyPress(button)}
                            layout={{
                                'default': [
                                    '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                                    '{tab} q w e r t y u i o p [ ] \\',
                                    '{lock} a s d f g h j k l ; \' {enter}',
                                    '{shift} z x c v b n m , . / {shift}',
                                    '{space}'
                                ],
                                'shift': [
                                    '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
                                    '{tab} Q W E R T Y U I O P { } |',
                                    '{lock} A S D F G H J K L : " {enter}',
                                    '{shift} Z X C V B N M < > ? {shift}',
                                    '{space}'
                                ]
                            }}
                            display={{
                                '{bksp}': 'backspace',
                                '{enter}': 'enter',
                                '{tab}': 'tab',
                                '{lock}': 'caps lock',
                                '{shift}': 'shift',
                                '{space}': ' ',
                            }}
                        />
                        </>
                    ) : (
                        <ResultsDiv>
                            <ResultsContainer>
                                <h4>Results</h4>
                                <p>{`Total time : ${minutes} minutes, ${seconds} seconds`}</p>
                                <p>{`Total letters : ${totalLength} letters`}</p>
                                <p>{`Total Words: ${totalWords} words`}</p>
                                <p>{`Speed : ${wpm} words per minute`}</p>
                                <p>{`Accuracy : ${accuracy} %`}</p>
                            </ResultsContainer>
                            <RetryButton onClick={this.reset}>
                                Try again
                            </RetryButton>
                        </ResultsDiv>
                    )}
                </TutorContainer>
            </AppContainer>
        )
    }
}
