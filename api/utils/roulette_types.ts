export enum SquareColor {
    RED = 0,
    BLACK
}

export type RouletteSquare = {
    numValue: BigInt,
    color: SquareColor,
    probOfSuccess: Number
}