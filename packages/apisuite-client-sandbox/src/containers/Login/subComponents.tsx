import styled from 'styled-components'
import loginImage from 'assets/loginImage.svg'
import registerImage from 'assets/registerImage.svg'
import { View } from './types'

export const Main = styled.main`
  display: flex;
  height: 100%;
  background-color: var(--light-background);

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
  }
`

export const FormSide = styled.section`
  display: flex;
  width: calc(100% - 55.75%);
  align-items: center;
  justify-content: end;

  @media (max-width: 1024px) {
    width: 100%;
    height: calc(100% - 41.5%);
    justify-content: center;
    align-items: start;
  }
`

export const ImageSide = styled.aside<{ view: View }>`
  display: flex;
  flex-direction: column;
  width: 55.75%;

  clip-path: polygon(0 0, 100% 0, 100% 100%, 51px 100%);
  backface-visibility: hidden;

  background-image: url(${props => props.view === 'login' ? loginImage : registerImage});
  background-color: var(--primary-background);
  background-repeat: no-repeat;
  background-position: 57px center;

  @media (max-width: 1440px) {
    background-size: 80% auto;
    background-position: center;
  }

  ::before {
    content: '';
    height: 100%;
    clip-path: polygon(0 0, 12px 0, calc(57px + 12px) 100%, 51px 100%);
    background-color: var(--primary);
  }

  @media (max-width: 1024px) {
    width: 100%;
    height: 41.5%;
    min-height: 375px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 22px));
    background-position: center -12px;
    background-size: auto 115%;

    ::before {
      position: absolute;
      width: 100%;
      height: 41.5%;
      min-height: 375px;
      background-color: var(--primary);
      opacity: 0.1;
      clip-path: polygon(0 calc(100% - 12px - 22px), 100% calc(100% - 12px), 100% 100%, 0 calc(100% - 22px));
    }
  }
`

export const FormContainer = styled.section`
  margin: 0 calc(100px - 68px) 0 auto;
  padding: 0 68px 0 68px;

  @media (max-width: 1024px) {
    margin: 0;
    padding: 0 20px 0 20px;
  }
`

export const WelcomeMsg = styled.p`
  color: var(--gray-600);
`

export const WelcomeTitle = styled.h1`
  color: var(--gray-800);
`

export const LoginRegisterSelector = styled.div`
  display: flex;
`

export const Option = styled.button<{ selected: boolean }>`
  flex: 1 1 0;
  height: 40px;
  
  color: ${props => props.selected ? 'var(--secondary)' : 'var(--gray-500)'};
  font-weight: ${props => props.selected ? 'bold' : 'normal'};
  border-bottom: ${props => props.selected ? '3px solid var(--secondary)' : '1px solid var(--gray-300)'};
`
