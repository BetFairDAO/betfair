export default function Spin(odds) {
    const randFloat = Math.random();
    var selectedSquare;
    var total = 0.0;
    for (let square of odds) {
        if (randFloat >= total && randFloat < (total + square.Odds)) {
            selectedSquare = square.OddsName;
        }
        total += square.Odds;
    }
    if (total != 1.0)
        throw new Error('Roulette odds do not add to 100%! Current sum = ' + total);
    return selectedSquare;
}
//# sourceMappingURL=roulette_spin.js.map