import React, {FC} from "react";

import {Cell} from "../../models";

interface ICallProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
}

const CellComponent: FC<ICallProps> = ({cell, selected, click}) => {
    return (
        <div className={['cell', cell.color, selected ? "selected" : " "].join(' ')}
             onClick={() => click(cell)}
             style={{background:cell.available && cell.figure ? "green": ""}}
        >
            {cell.available && !cell.figure && <div className="available"></div>}
            {cell.figure?.logo && <img src={cell.figure.logo} alt={cell.figure.name}/>}
        </div>
    );
};

export {CellComponent};