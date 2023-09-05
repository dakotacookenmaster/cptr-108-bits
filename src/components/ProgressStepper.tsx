import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

type ProgressMobileStepperProps = {
    steps: React.ReactElement[]
}

export default function ProgressMobileStepper(props: ProgressMobileStepperProps) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [canMove, setCanMove] = React.useState(false)

    const handleNext = () => {
        setCanMove(false)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <>
            <h1 style={{textAlign: "center"}}>CPTR-108 Lab 3 Warmup - Binary Representation</h1>
            { React.cloneElement(props.steps[activeStep], { setCanMove, canMove} )}
            <MobileStepper
                variant="progress"
                steps={props.steps.length}
                sx={{ background: "#3F3F3F", position: "absolute", bottom: "0px", width: "calc(100% - 16px)", overflow: "hidden" }}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button variant={"contained"} onClick={handleNext} disabled={!canMove || activeStep === props.steps.length - 1}>
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={<div></div>}
            />
        </>
    );
}