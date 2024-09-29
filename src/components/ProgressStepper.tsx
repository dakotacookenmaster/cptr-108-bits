import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

type ProgressMobileStepperProps = {
    steps: React.ReactElement[]
    data: { title: string, question: string, answer: string }[]
}

export default function ProgressMobileStepper(props: ProgressMobileStepperProps) {
    const theme = useTheme()
    const [activeStep, setActiveStep] = React.useState(0)
    const [canMove, setCanMove] = React.useState(false)
    const [displayHelp, setDisplayHelp] = React.useState(false)

    const handleNext = () => {
        setCanMove(false)
        setDisplayHelp(false)
        setActiveStep((prevActiveStep) => {
            const newStep = prevActiveStep + 1
            localStorage.setItem("title", props.data[newStep].title)

            return newStep
        });
    };

    React.useEffect(() => {
        const title = localStorage.getItem("title")

        if (title) {
            const newLevel = props.data.findIndex(value => value.title === title)

            if(newLevel !== -1) {
                setActiveStep(newLevel)
            }
        }
    }, [])

    return (
        <>
            <h1 style={{ textAlign: "center" }}>CPTR-108 Lab 5 Warmup - Binary Representation</h1>
            {React.cloneElement(props.steps[activeStep], { setCanMove, canMove, displayHelp, setDisplayHelp })}
            <MobileStepper
                steps={props.steps.length}
                sx={{ background: "#3F3F3F" }}
                className="stepper"
                position="static"
                variant="dots"
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