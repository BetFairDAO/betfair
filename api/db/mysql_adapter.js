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
}
//# sourceMappingURL=mysql_adapter.js.map