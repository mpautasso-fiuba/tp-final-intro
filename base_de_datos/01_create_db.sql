CREATE TABLE desarrolladoras (
    id SERIAL PRIMARY KEY,
    nombre              VARCHAR(100)  UNIQUE,
    imagen_url          VARCHAR(255),
    fecha_fundacion     DATE,
    pais_sede_central   VARCHAR(50)   NOT NULL,
    presidente_actual   VARCHAR(50)   NOT NULL
);

CREATE TABLE juegos (
    id                     SERIAL PRIMARY KEY,
    nombre                 VARCHAR(100)  UNIQUE,
    descripcion            TEXT          NOT NULL,
    precio_usd             FLOAT NOT NULL,
    imagen_url             VARCHAR(255),
    fecha_publicacion      DATE          NOT NULL,
    web_oficial            VARCHAR(255)  NOT NULL,
    pegi                   INT           NOT NULL,
    puntaje_metacritic     INT,
    desarrolladora_id      INT           REFERENCES desarrolladoras(id)
);

CREATE TABLE comentarios (
    id                  SERIAL PRIMARY KEY,
    usuario             VARCHAR(50)   NOT NULL,
    juego_id            INT           NOT NULL REFERENCES juegos(id),
    texto               VARCHAR(255)  NOT NULL,
    fecha_publicacion   DATE,
    calificacion        INT           NOT NULL,
    horas_jugadas       INT,
    terminado           BOOLEAN       NOT NULL
);


CREATE TABLE plataformas (
    id      SERIAL PRIMARY KEY,
    nombre  VARCHAR(50) UNIQUE
);

CREATE TABLE generos (
    id     SERIAL PRIMARY KEY,
    nombre VARCHAR(50)   UNIQUE
);

CREATE TABLE juegos_plataformas (
    id           SERIAL PRIMARY KEY,
    id_juego     INT REFERENCES juegos(id),
    id_plataforma INT REFERENCES plataformas(id)
);

CREATE TABLE juegos_generos (
    id         SERIAL PRIMARY KEY,
    id_juego   INT REFERENCES juegos(id),
    id_genero  INT REFERENCES generos(id)
);

CREATE TABLE tiendas (
    id              SERIAL PRIMARY KEY,
    juego_id        INT REFERENCES juegos(id),
    steam_id        VARCHAR(100),
    url_steam       VARCHAR(255),
    ps_store_id     VARCHAR(100),
    url_ps_store    VARCHAR(255)
);