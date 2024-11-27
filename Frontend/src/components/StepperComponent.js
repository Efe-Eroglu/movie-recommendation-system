import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";

const StepperComponent = ({ steps, activeStep }) => {
  return (
    <Stepper activeStep={activeStep} alternativeLabel sx={{ width: "80%", mb: 4 }}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel sx={{ color: "#FFFFFF" }}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperComponent;
