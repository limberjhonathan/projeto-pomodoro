import React, { useCallback, useEffect, useState } from "react";
import { useInterval } from "../hooks/use-intervals";
import { Button } from "./button";
import { Timer } from "./timer";
// import { secondsToMinutes } from "../utils/seconds-to-minutes";
import { secondsToTime } from "../utils/seconds-to-time";

const bellStart = require('../sounds/bell-start.mp3');
const bellFinish = require('../sounds/bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
    pomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
    const [mainTime, setMainTime] = useState(props.pomodoroTime);
    const [timeCounting, setTimeCounting] = useState(false);
    const [working, setWorking] = useState(false);
    const [resting, setResting] = useState(false);
    const [cyclesQtManager, setCyclesQtManager] = useState(
        new Array(props.cycles - 1).fill(true)
    );

    const [completeCycles, setCompletedCycles] = useState(0);
    const [fullWorkingTime, setFullWorkingTime] = useState(0);
    const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

    useInterval(() => {
        setMainTime(mainTime - 1);
        if (working) setFullWorkingTime(fullWorkingTime + 1)
    }, timeCounting ? 1000 : null);

    const configureWork = useCallback(() => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setMainTime(props.pomodoroTime);
        audioStartWorking.play();
    }, [props.pomodoroTime]);

    const configureRest = useCallback((isLongRest: boolean) => {
        setTimeCounting(true);
        setWorking(false);
        setResting(true);
        setMainTime(isLongRest ? props.longRestTime : props.shortRestTime);
        audioStopWorking.play();
    }, [props.longRestTime, props.shortRestTime]);

    useEffect(() => {
        if (mainTime > 0) return;

        if (working) {
            if (cyclesQtManager.length > 0) {
                configureRest(false);
                setCyclesQtManager((prev) => prev.slice(0, -1));
            } else {
                configureRest(true);
                setCyclesQtManager(new Array(props.cycles - 1).fill(true));
                setCompletedCycles((prev) => prev + 1);
            }
            setNumberOfPomodoros((prev) => prev + 1);
        } else if (resting) {
            configureWork();
        }
    }, [mainTime, working, resting, cyclesQtManager, configureWork, configureRest, props.cycles]);

    useEffect(() => {
        document.body.classList.toggle('working', working);
    }, [working]);

    return (
        <div className="pomodoro">
            <h2>You are: {working ? 'Working' : 'Resting'}</h2>
            <Timer mainTime={mainTime} />

            <div className="controls">
                <Button text="Work" onClick={configureWork} />
                <Button text="Rest" onClick={() => configureRest(false)} />
                <Button
                    className={!working && !resting ? 'hidden' : ''}
                    text={timeCounting ? 'Pause' : 'Play'}
                    onClick={() => setTimeCounting((prev) => !prev)}
                />
            </div>

            <div className="details">
                <p>Ciclos concluídos: {completeCycles}</p>
                <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
                <p>Pomodoros concluídos: {numberOfPomodoros}</p>
            </div>
        </div>
    );
}
