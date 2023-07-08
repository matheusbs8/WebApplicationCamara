    PRAGMA foreign_keys = ON;

    CREATE TABLE  Partido (
        id INTEGER PRIMARY KEY,
        Sigla varchar(50),
        NomePartido varchar(50),
        Logo varchar(300)
    );

    CREATE TABLE Deputado (
        id INTEGER PRIMARY KEY,
        NomeDeputado varchar(50),
        Cpf varchar(12),
        Sexo varchar(2),
        Foto varchar(300),
        Uf varchar(10),
        fk_Partido_id INTEGER,
        FOREIGN KEY (fk_Partido_id) REFERENCES Partido (id) ON DELETE CASCADE
    );

    CREATE TABLE Gastos (
        id INTEGER PRIMARY KEY,
        Tipo varchar(50),
        ValorLiquido FLOAT,
        fk_Deputado_id INTEGER,
        ano INTEGER,
        mes INTEGER,
        FOREIGN KEY (fk_Deputado_id) REFERENCES Deputado (id) ON DELETE CASCADE
    );

    CREATE TABLE Evento (
        id INTEGER PRIMARY KEY,
        dataHoraIncio DATE,
        dataHoraFinal DATE,
        Descricao varchar(300)
    );

    CREATE TABLE Frequenta (
        fk_Evento_id INTEGER,
        fk_Deputado_id INTEGER,
        FOREIGN KEY (fk_Evento_id) REFERENCES Evento (id) ON DELETE SET NULL,
        FOREIGN KEY (fk_Deputado_id) REFERENCES Deputado (id) ON DELETE SET NULL
    );