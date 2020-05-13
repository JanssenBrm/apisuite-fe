import styled from 'styled-components'
import manSendingEmail from 'assets/manSendingEmail.png'

export const Main = styled.main`
  display: flex;
  height: 100%;
  background-color: var(--light-background);

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
  }
`

export const ImageSide = styled.aside`
  display: flex;
  flex: 1 1 0;

  background-image: url(${manSendingEmail});
  background-repeat: no-repeat;
  background-position: 10px 42%;
  background-size: 60% auto;

  @media (max-width: 1440px) {
    background-size: 80% auto;
  }

  @media (max-width: 1024px) {
    background-position: center;
    background-size: 50% auto;
  }

  @media (max-width: 640px) {
    width: 100%;
    height: 41.5%;
    min-height: 375px;
    background-position: center;
    background-size: 70% auto;
  }
`

export const MessageSide = styled.section`
  display: flex;
  flex: 1 1 0;
  align-items: center;
  justify-content: end;

  @media (max-width: 1024px) {
    width: 100%;
    height: calc(100% - 41.5%);
    justify-content: center;
    align-items: start;
  }
`

export const MessageContainer = styled.section`
  margin: 0 auto 0 auto;
  padding: 16px;
  max-width: 583px;
  transform: translateY(-28px);

  @media (max-width: 1024px) {
    margin: 0;
    padding: 48px 20px 0 20px;
  }
`

export const Message = styled.p`
  color: var(--gray-600);
`

export const MessageTitle = styled.h1`
  color: var(--gray-800);
  margin-bottom: 16px;
`
