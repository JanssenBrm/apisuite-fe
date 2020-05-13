import styled from 'styled-components'
import { Step } from 'components/RegisterForm/types'

export const StepCircle = styled.span<{
  step: string,
  currentStep: Step,
  indx: number,
}>`
  display: block;
  width: 20px;
  height: 20px;
  border: 3px solid ${props => props.currentStep > props.indx
    ? 'var(--secondary)' : 'var(--gray-100)'};
  border-radius: 50%;

  ::after {
    content: '${props => props.step}';
    height: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    transform: translateY(24px);
    font-size: 14px;
    line-height: 18px;
    font-weight: ${props => props.indx + 1 === props.currentStep ? 'bold' : 'normal'};
    color: ${props => props.currentStep > props.indx
    ? 'var(--gray-500)' : 'var(--gray-300)'};
    border-radius: 50%;
  }
`

export const Progress = styled.progress<{
  step: string,
  currentStep: Step,
  indx: number,
}>`
  -webkit-appearance: none;
  height: 4px;

  &::-webkit-progress-bar {
    background-image: ${props => props.indx === props.currentStep &&
      'linear-gradient(to right, var(--secondary), var(--gray-100))'};
    background-color: ${props => props.indx > props.currentStep
    ? 'var(--gray-100)' : 'var(--secondary)'};
  }
`

export const StepProgress = styled.li`
  display: flex;
  align-items: center;
`

export const Container = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 36px auto 76px auto;
`
