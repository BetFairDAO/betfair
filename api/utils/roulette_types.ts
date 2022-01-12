export enum RouletteColor {
    BLACK = 1,
    RED
}

export enum RouletteEvents {
    SPIN_COMPLETE = 'SPIN COMPLETE'
}

export interface RouletteSquare {
    num: number,
    color: RouletteColor
}