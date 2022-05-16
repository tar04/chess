import React, {FC, useEffect, useState} from "react";

import {Board, Cell, Player} from "../../models";
import {CellComponent} from "../CellComponent/CellComponent";

interface IBoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComponent: FC<IBoardProps> = ({setBoard, board, currentPlayer, swapPlayer}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    useEffect(() => {
        highlightCells()
    }, [selectedCell]);

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    function highlightCells() {
        board.highlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            <h3>Поточний гравець: {currentPlayer?.color}</h3>
            <div className="board">
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map(cell => <CellComponent
                            click={click}
                            cell={cell}
                            key={cell.id}
                            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                        />)}
                    </React.Fragment>
                )}
            </div>
        </div>

    );
};

export {BoardComponent};