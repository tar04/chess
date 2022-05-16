import React, {FC, useEffect, useRef, useState} from "react";

import {Colors, Player} from "../../models";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {

    const [blackTime, setBlackTime] = useState(300);

    const [whiteTime, setWhiteTime] = useState(300);

    useEffect(() => {
        startTimer();
    }, [currentPlayer]);

    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer() {
        setBlackTime(prevState => prevState - 1);
    }

    function decrementWhiteTimer() {
        setWhiteTime(prevState => prevState - 1);
    }

    function handleRestart() {
        setWhiteTime(300);
        setBlackTime(300);
        restart();
    }

    return (
        <div>
            <div>
                <button onClick={handleRestart}>Почати заново</button>
            </div>
            <h2>Чорні: {blackTime} </h2>
            <h2>Білі: {whiteTime} </h2>
        </div>
    );
};

export {Timer};