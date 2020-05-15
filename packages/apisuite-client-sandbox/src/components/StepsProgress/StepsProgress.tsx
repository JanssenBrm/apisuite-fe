import * as React from 'react'
import { StepsProgressProps } from './types'
import {
  Container,
  StepProgress,
  StepCircle,
  Progress,
} from './subComponents'

const StepsProgress: React.FC<StepsProgressProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <Container>
      {Object.values(steps).slice(0, -1).map((step, indx) => (
        <>
          {indx === 0 &&
            <StepProgress>
              <StepCircle
                step={step}
                currentStep={currentStep}
                indx={indx}
              />
            </StepProgress>}

          {indx !== 0 &&
            <StepProgress>
              <Progress
                divideBy={Object.values(steps).slice(0, -1).length - 1}
                step={step}
                currentStep={currentStep}
                indx={indx}
              />
              <StepCircle
                step={step}
                currentStep={currentStep}
                indx={indx}
              />
            </StepProgress>}
        </>
      ))}
    </Container>
  )
}

export default StepsProgress
