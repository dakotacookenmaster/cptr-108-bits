import { Button, Switch, } from "@mui/material"
import React from "react"
import "../App.css"
import { enqueueSnackbar } from "notistack"
import { useMediaQuery } from "@mui/material"
import { IconButton } from "@mui/material"
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

const BinaryQuestion = (props: { data: { title: string, question: string, answer: string }, canMove: boolean, setCanMove: Function, displayHelp: boolean, setDisplayHelp: Function }) => {
    const { data, setCanMove, canMove, displayHelp, setDisplayHelp } = props
    const [state, setState] = React.useState({} as Record<string, string>)
    const isMobile = useMediaQuery("(max-width: 600px)")

    const handleChange = (event: any) => {
        const { name, checked } = event.target

        setState(prevState => {
            return {
                ...prevState,
                [name]: checked ? "1" : "0"
            }
        })
    }

    const checkAnswer = () => {
        let userAnswer = ""
        for (let i = 0; i < data.answer.length; i++) {
            userAnswer += !state[`switch-${i}`] ? "0" : state[`switch-${i}`]
        }

        setCanMove((_: any) => {
            if (userAnswer === data.answer) {
                enqueueSnackbar("You got it right!", {
                    variant: "success"
                })
                return true
            } else {
                enqueueSnackbar("Hmm, that's not quite right.", {
                    variant: "error"
                })
                return false
            }
        })
    }

    return (
        <div className={"question-wrapper"}>
            <h2 style={{ margin: 0 }}>{data.title}</h2>
            <p style={{ fontSize: "20px", textAlign: "center" }}>{data.question}</p>
            <div className={"switch-wrapper"}>
                {
                    data.answer.split('').map((_, index) => {
                        return (
                            <div key={`switch-${index}`} style={{ display: "flex", flexDirection: !isMobile ? "column" : "row", gap: "10px", alignItems: "center" }}>
                                <Switch
                                    sx={{
                                        '& .MuiSwitch-thumb': {
                                            '&:before': {
                                                content: "'" + (!state[`switch-${index}`] ? "0" : state[`switch-${index}`]) + "'",
                                                color: `${state[`switch-${index}`] === "1" ? "white" : "black"}`,
                                                position: "absolute",
                                                width: "100%",
                                                height: "100%",
                                                top: !isMobile ? "14.5px" : "6.5px",
                                                right: !isMobile ? "6px" : "-15px",
                                                transform: !isMobile ? "rotate(90deg)" : "none"
                                            }
                                        },
                                        transform: !isMobile ? "rotate(-90deg)" : "none"
                                    }}
                                    checked={state[`switch-${index}`] === "1"}
                                    name={`switch-${index}`}
                                    onChange={handleChange}
                                    disabled={canMove}
                                />
                                <span style={{ display: displayHelp ? "initial" : "none" }}>2 <sup>{data.answer.length - 1 - index}</sup></span>
                            </div>
                        )
                    })
                }
            </div>
            <div style={{ marginTop: "10px", display: "flex", gap: "20px", alignItems: "center", padding: "20px" }}>
                <Button disabled={canMove} variant="contained" onClick={checkAnswer}>Check Answer</Button>
                <IconButton onClick={() => setDisplayHelp((prevDisplayHelp: boolean) => !prevDisplayHelp)} title={ !displayHelp ? "Need some help?" : "I don't need help anymore." } size="small" sx={{
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "primary.main",
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": {
                        borderColor: "white",
                        color: "primary.main",
                        backgroundColor: "white",
                    }
                }}>
                    { !displayHelp ? <QuestionMarkIcon /> : <NotInterestedIcon /> }
                </IconButton>
            </div>
        </div>
    )
}

export default BinaryQuestion