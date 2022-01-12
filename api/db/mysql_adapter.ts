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
}