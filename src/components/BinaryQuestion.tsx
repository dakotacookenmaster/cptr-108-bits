import { Button, Switch, } from "@mui/material"
import React from "react"
import "../App.css"
import { enqueueSnackbar } from "notistack"

const BinaryQuestion = (props: { data: { title: string, question: string, answer: string }, canMove: boolean, setCanMove: Function }) => {
    const { data, setCanMove, canMove } = props
    const [state, setState] = React.useState({} as Record<string, string>)

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
            if(userAnswer === data.answer) {
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
            <h2 style={{margin: 0}}>{data.title}</h2>
            <p style={{ fontSize: "20px", textAlign: "center" }}>{data.question}</p>
            <div className={"switch-wrapper"}>
                {
                    data.answer.split('').map((_, index) => {
                        return (
                            <Switch 
                                sx={{
                                    '& .MuiSwitch-thumb': {
                                        '&:before': {
                                            content: "'" + (!state[`switch-${index}`] ? "0" : state[`switch-${index}`]) + "'",
                                            color: `${state[`switch-${index}`] === "1" ? "white" : "black"}`,
                                            position: "absolute",
                                            width: "100%",
                                            height: "100%",
                                            top: "14.5px",
                                            right: "6px",
                                            transform: "rotate(90deg)"
                                        }
                                    },
                                    transform: "rotate(-90deg)"
                                }} 
                                key={`switch-${index}`} 
                                checked={state[`switch-${index}`] === "1"} 
                                name={`switch-${index}`} 
                                onChange={handleChange}
                                disabled={canMove}
                            />
                        )
                    })
                }
                <Button disabled={canMove} variant="contained" onClick={checkAnswer}>Check Answer</Button>
            </div>
        </div>
    )
}

export default BinaryQuestion