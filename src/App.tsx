import React, {FC, useEffect, useState} from "react";

import {BoardComponent, LostFigures, Timer} from "./components";
import {Board, Colors, Player} from "./models";
import "./App.css";

const App: FC = () => {

    const [board, setBoard] = useState(new Board());

    const [whitePlayer] = useState<Player>(new Player(Colors.WHITE));

    const [blackPlayer] = useState<Player>(new Player(Colors.BLACK));

    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() => {
        restart();
        setCurrentPlayer(whitePlayer);
    }, [whitePlayer]);

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
    }

    return (
        <div className="app">
            <Timer currentPlayer={currentPlayer} restart={restart}/>
            <BoardComponent
                setBoard={setBoard}
                board={board}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
            />
            <div>
                <LostFigures
                    title="Чорні фігури:"
                    figures={board.lostBlackFigures}
                />
                <LostFigures
                    title="Білі фігури:"
                    figures={board.lostWhiteFigures}
                />
            </div>
        </div>
    );
};

export {App};