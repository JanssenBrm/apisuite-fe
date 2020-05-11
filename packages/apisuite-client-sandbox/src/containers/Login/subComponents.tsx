import styled from 'styled-components'

export const Main = styled.main.attrs({
  className: 'main',
})`
  /* TODO: remove height if in the future #root becomes a flex column container */
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

export const Stripe = styled.aside`
  width: 55.75%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 41px 100%);
  background-color: var(--primary-accent);

  @media (max-width: 1024px) {
    width: 100%;
    height: 41.5%;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 22px));
    background-color: var(--primary-accent-low-opacity);
  }
`

export const ImageSide = styled.aside`
  display: flex;
  height: 100%;
  width: 100%;
  clip-path: polygon(10px 0, 100% 0, 100% 100%, calc(41px + 10px) 100%);
  align-items: center;
  justify-content: start;
  background-color: var(--primary-background);

  @media (max-width: 1024px) {
    justify-content: center;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 12px), 0 calc(100% - 22px - 12px));
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

export const ImageContainer = styled.aside`
  margin: 0 auto 0 calc(57px - 10px);
  padding: 0 10px 0 10px;

  @media (max-width: 1024px) {
    margin: 0;
  }
`

export const WelcomeMsg = styled.p`
  color: var(--gray-600);
`

export const WelcomeTitle = styled.h1`
  color: var(--gray-800);
`

export const SignInSignUpSelector = styled.div`
  display: flex;
`

export const Option = styled.button`
  flex: 1 1 0;
`

export const Img = styled.img`
  @media (max-width: 1024px) {
    width: 385px;
    height: 391px;
    transform: translateY(36px);
  }
`
