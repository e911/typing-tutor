import styled from 'styled-components';

const PrimaryButton = styled.button`
  background-color: rgb(1,167,88);
  color: white;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  border: 0.5px solid rgb(1,167,88);
  border-radius: 50px;
  outline: none;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  cursor: pointer;  
  min-width: 100px;
  height: 34px;
  user-select: none;

  &:hover:not([disabled]),
  &:focus:not([disabled]) {
    background-color: rgb(1,167,88);
    border-color: rgb(1,167,88);
  }

  &:disabled,
  &:hover:disabled,
  &:focus:disabled {
    cursor: not-allowed;
    color: white;
    background-color: rgb(1,167,88);
    border-color: rgb(1,167,88);
    opacity: 0.5;
  }
`;

export default PrimaryButton;
