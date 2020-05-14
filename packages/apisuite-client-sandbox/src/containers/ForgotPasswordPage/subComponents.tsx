import styled from 'styled-components'
import keyIllustration from 'assets/keyIllustration.png'

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

  background-image: url(${keyIllustration});
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
  margin-bottom: 12px;
`

export const MessageTitle = styled.h1`
  color: var(--gray-800);
  margin-bottom: 16px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-bottom: 68px;
`

export const Button = styled.button<{disabled: boolean}>`
  height: 35px;
  width: 100%;
  margin-top: 6px;
  text-transform: uppercase;
  background-color: ${props => props.disabled
    ? 'var(--secondary-disabled)' : 'var(--secondary)'};
  color: ${props => props.disabled
    ? 'var(--light-typography-disabled)' : 'var(--light-typography)'};;
  border-radius: 5px;
  box-shadow: ${props => !props.disabled && '0 2px 5px var(--shadow-dark)'};
  cursor: ${props => !props.disabled && 'pointer'};

  :hover {
    box-shadow: ${props => !props.disabled && '0 0 10px var(--shadow-dark)'};
  }
`

export const Input = styled.input<{
  focused: boolean,
  error: boolean,
}>`
  height: 38px;
  border-radius: 5px;
  width: 100%;
  font-family: var(--font-family);
  border: 1px solid ${props => props.error ? 'var(--warning-red)' : 'var(--gray-200)'};
  color: ${props => props.focused ? 'var(--gray-500)' : 'var(--gray-300)'};
  font-size: 14px;
  line-height: 14px;
  padding: 12px;

  :focus {
    border: 1px solid ${props => props.error ? 'var(--warning-red)' : 'var(--secondary)'};
    outline: none;
  }

  ::placeholder {
    color: var(--gray-200);
  }
`

export const Label = styled.label<{
  focused: boolean,
  error: boolean,
}>`
  height: 100%;
  display: ${props => !props.focused ? 'none' : 'flex'};
  font-size: 12px;
  line-height: 14px;
  font-weight: medium;
  width: max-content;
  color: ${props => props.error ? 'var(--warning-red)' : 'var(--secondary)'};
  padding: 0 8px 0 8px;
  background-color: var(--light-background);
  transform: translateX(12px) translateY(2px);
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-end;
  height: calc(38px + 24px);
  margin-bottom: 12px;
`

export const ErrorMsg = styled.p`
  height: 100%;
  color: var(--warning-red);
  padding: 5px;
  font-size: 11px;
  line-height: 14px;
`

export const Placeholder = styled.div`
  height: 12px;
`
