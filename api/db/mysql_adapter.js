var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createConnection } from 'mysql2/promise';
export default class MysqlDb {
    constructor(host, port, user, password, database) {
        this._connectionParams = {
            host: host,
            port: port,
            user: user,
            password: password,
            database: database
        };
    }
    getRouletteOdds() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield createConnection(this._connectionParams);
            const queryStr = `
            SELECT o.OddsName, o.Odds
            FROM Game g, GameOdds o
            WHERE g.GameName='roulette' AND g.GameId=o.GameId;
        `;
            const gameOdds = yield connection.query(queryStr).then(result => {
                const rows = result[0];
                var odds = [];
                for (let i in rows) {
                    const row = rows[i];
                    odds.push({
                        OddsName: row.OddsName,
                        Odds: Number(row.Odds)
                    });
                }
                return odds;
            });
            return gameOdds;
        });
    }
}
//# sourceMappingURL=mysql_adapter.js.map