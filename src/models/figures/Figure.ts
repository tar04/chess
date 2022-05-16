import {Colors} from "../Colors";
import logo from '../../assets/black-bishop.png';
import {Cell} from "../Cell";

export enum FigureNames {
    FIGURE = "Фігура",
    KING = "Король",
    KNIGHT = "Кінь",
    PAWN = "Пішка",
    QUEEN = "Королева",
    ROOK = "Тура",
    BISHOP = "Слон",
}

export class Figure {

    id: number;
    name: FigureNames;
    logo: typeof logo | null;
    color: Colors;
    cell: Cell;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    canMove(target: Cell): boolean {
        if (target.figure?.color === this.color) {
            return false;
        }

        if (target.figure?.name === FigureNames.KING) {
            return false
        }

        return true;
    }

    moveFigure(target: Cell) {

    }
}