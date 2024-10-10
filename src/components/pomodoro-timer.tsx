import React, { useEffect, useState } from "react";
import { useInterval } from "../hooks/use-intervals";
// import { secondsToTime } from "../utils/seconds-to-time";
import { Button } from "./button";
import { Timer } from "./timer";

const bellStart = require('../sounds/bell-start.mp3')
const bellFinish = require('../sounds/bell-finish.mp3')

const audioStartWorking = new Audio(bellStart)
const audioStopWorking = new Audio(bellFinish)

interface Props {
    pomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
    const [mainTime, setMainTime] = useState(props.pomodoroTime)
    const [timeCounting, setTimeCounting] = useState(false)
    const [working, setWorking] = useState(false)
    const [resting, setResting] = useState(false)
    const [cyclesQtManager, setCyclesQtManager] = useState(
        new Array(props.cycles - 1).fill(true),
    )

    const[completeCycle, setCompletedCycles] = useState(0)
    const[completeCycle, setCompletedCycles] = useState(0)
    const[completeCycle, setCompletedCycles] = useState(0)

    useEffect(() => {
        if (working) document.body.classList.add('working')
        if (resting) document.body.classList.remove('working')
        
        if (mainTime > 0) return

        if (working && cyclesQtManager.length > 0){
            configureRest(false)
            cyclesQtManager.pop()
        } else if (working && cyclesQtManager.length <= 0){
            configureRest(false)
            setCyclesQtManager(new Array(props.cycles - 1).fill(true))
        }
    }, [working, resting])

    useInterval(() => {
        setMainTime(mainTime - 1);
    }, timeCounting ? 1000 : null)

    const configureWork = () => {
        setTimeCounting(true)
        setWorking(true)
        setResting(false)
        setMainTime(props.pomodoroTime)
        audioStartWorking.play()
    }

    const configureRest = (long: boolean) => {
        setTimeCounting(true)
        setWorking(false)
        setResting(true)

        if(long) {
            setMainTime(props.longRestTime)
        } else {
            setMainTime(props.shortRestTime)
        }

        audioStopWorking.play()
    }

    return (
        <div className="pomodoro">
            <h2>You are: working</h2>
            <Timer mainTime={mainTime}/>
            
            <div className="controls">
                <Button text="work" onClick={() => configureWork()}></Button>
                <Button text="Rest" onClick={() => configureRest(false)}></Button>
                <Button className={!working && !resting ? 'hidden': ''} text={timeCounting ? 'Pause' : 'Play'} onClick={() => setTimeCounting(!timeCounting)}></Button>
            </div>

            <div className="details">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            </div>
        </div>
    )
}