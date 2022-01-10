import { RouletteSquare } from "./roulette_types";

/**
 * Spins the roulette wheel by generating a random number and selecting a winning square
 * @param odds The current odds for each square on the wheel
 * @returns Returns the winning square from that spin
 */
export default function Spin(odds: Array<RouletteSquare>) {
    const randFloat = Math.random();
    var selectedSquare: string;
    var total: number = 0.0;
    for (let square of odds) {
        if (randFloat >= total && randFloat < (total + square.Odds)) {
            selectedSquare = square.OddsName;
        }
        total += square.Odds;
    }

    // Verify that odds added up to 100%
    if (total != 1.0) throw new Error('Roulette odds do not add to 100%! Current sum = ' + total);

    return selectedSquare;
}