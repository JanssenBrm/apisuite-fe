import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-bottom: 68px;
`

export const Button = styled.button<{disabled: boolean}>`
  height: 35px;
  width: 100%;
  margin-top: 18px;
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
