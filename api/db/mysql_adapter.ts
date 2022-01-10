/**
 * squlie_adapter.ts
 * 
 * This is a database adapter for a MySQL-type database. 
 */

import { createConnection, ConnectionOptions } from 'mysql2/promise';
import { RouletteSquare } from '../utils/roulette_types.js';

export default class MysqlDb {
    private _connectionParams: ConnectionOptions;

    constructor(host: string, port: number, user: string, password: string, database: string) {
        this._connectionParams = {
            host: host,
            port: port,
            user: user,
            password: password,
            database: database
        };
    }

    /**
     * Returns the current odds of each roulette square in the database
     * @returns Promise returning an array of RouletteSquare objects
     */
    async getRouletteOdds(): Promise<Array<RouletteSquare>> {
        const connection = await createConnection(this._connectionParams);
        const queryStr = `
            SELECT o.OddsName, o.Odds
            FROM Game g, GameOdds o
            WHERE g.GameName='roulette' AND g.GameId=o.GameId;
        `;
        
        const gameOdds = await connection.query(queryStr).then(result => {
            const rows = result[0];
            var odds: Array<RouletteSquare> = [];
            for (let i in rows) {
                odds.push(rows[i])
            }
            return odds;
        });
        return gameOdds;
    }
}