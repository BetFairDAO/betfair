/*
OLD IMPLEMENTATION:

CREATE TABLE Game (
    GameId INT NOT NULL AUTO_INCREMENT,
    GameName VARCHAR(20) NOT NULL,
    TotalGameCycles INT DEFAULT 0,
    PRIMARY KEY (GameId)
);

CREATE TABLE GameOdds (
    GameOddsId INT NOT NULL AUTO_INCREMENT,
    GameId INT NOT NULL,
    OddsName VARCHAR(20) NOT NULL,
    Odds DECIMAL(1,4) NOT NULL,
    PRIMARY KEY (GameOddsId, GameId),
    FOREIGN KEY (GameId) REFERENCES Game(GameId)
);
*/

CREATE TABLE Game (
    GameId INT NOT NULL AUTO_INCREMENT,
    GameName VARCHAR(20) NOT NULL,
    PRIMARY KEY (GameId)
);

CREATE TABLE GameInstance (
    GameId INT NOT NULL,
    InstanceId INT NOT NULL AUTO_INCREMENT,
    StartTime DATETIME NOT NULL,
    PRIMARY KEY (GameId, InstanceId),
    FOREIGN KEY (GameId) REFERENCES Game(GameId)
);

CREATE TABLE GameParameters (
    GameId INT NOT NULL,
    ParameterName VARCHAR(20) NOT NULL,
    ParameterValue VARCHAR(20),
    PRIMARY KEY (GameId, ParameterName),
    FOREIGN KEY (GameId) REFERENCES Game(GameId)
);

/*
Note: Need to update RouletteResults InstanceId foreign key parameter with assigned GameId after above tables are initialized & populated
*/

CREATE TABLE RouletteResults (
    InstanceId INT NOT NULL,
    ResultId INT NOT NULL AUTO_INCREMENT,
    ResultTime DATETIME NOT NULL,
    WheelNumber INT NOT NULL,
    ResultRed BOOLEAN NOT NULL,
    TotalWin DECIMAL(7,2) NOT NULL,
    TotalLoss DECIMAL (7,2) NOT NULL,
    PRIMARY KEY (InstanceId, ResultId),
    FOREIGN KEY (InstanceId) REFERENCES GameInstance(0, InstanceId)
);