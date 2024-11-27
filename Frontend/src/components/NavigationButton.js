import React from "react";
import { Box, Button } from "@mui/material";

const NavigationButtons = ({ activeStep, steps, handleBack, handleNext, formData }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
    <Button
      disabled={activeStep === 0}
      onClick={handleBack}
      sx={{
        color: "#FFFFFF",
        borderColor: "#FF0000",
        "&:hover": { backgroundColor: "#FF0000", color: "#FFFFFF" },
      }}
    >
      Geri
    </Button>
    <Button
      onClick={handleNext}
      disabled={
        (activeStep === 0 && !formData.genre) ||
        (activeStep === 1 && !formData.director) ||
        (activeStep === 2 && !formData.previousMovie)
      }
      sx={{
        color: "#FFFFFF",
        borderColor: "#FF0000",
        "&:hover": { backgroundColor: "#FF0000", color: "#FFFFFF" },
      }}
    >
      {activeStep === steps.length - 1 ? "Tamamla" : "İleri"}
    </Button>
  </Box>
);

export default NavigationButtons;
