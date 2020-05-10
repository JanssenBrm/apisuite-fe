import styled from 'styled-components'

export const Main = styled.main.attrs({
  className: 'main',
})`
  /* TODO: remove height if in the future #root becomes a flex column container */
  height: 100%;
  width: 100vw;
  background-color: var(--light-background);
`

export const FormSide = styled.section`
  display: flex;
  width: calc(100% - 55.75%);
  align-items: center;
  justify-content: end;
`

export const Stripe = styled.aside`
  width: 55.75%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 41px 100%);
  background-color: var(--primary-accent);
`

export const ImageSide = styled.aside`
  display: flex;
  height: 100%;
  width: 100%;
  clip-path: polygon(10px 0, 100% 0, 100% 100%, calc(41px + 10px) 100%);
  align-items: center;
  justify-content: start;
  background-color: var(--primary-background);
`

export const FormContainer = styled.section`
  margin: 0 100px 0 auto;
`

export const ImageContainer = styled.aside`
  margin: 0 auto 0 100px;
`
