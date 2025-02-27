import React, { useState } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

function CustomStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['1', 'Step 2', 'Step 3'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const StepIcon = (props) => {
    const { active, completed } = props;

    return (
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: active
            ? 'linear-gradient(270deg, rgb(245, 18, 117) 0%, rgb(98, 32, 152) 100%)' // Active circle color
            : completed
            ? 'linear-gradient(270deg, rgb(245, 18, 117) 0%, rgb(98, 32, 152) 100%)' // Completed circle color
            : 'grey', // Default circle color
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {completed ? '✔' : null} {/* Display checkmark for completed steps */}
      </div>
    );
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <button onClick={handleBack} disabled={activeStep === 0}>
          Back
        </button>
        <button onClick={handleNext} disabled={activeStep === steps.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default CustomStepper;
