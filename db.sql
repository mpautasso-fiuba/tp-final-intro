CREATE TABLE desarrolladoras (
    id SERIAL PRIMARY KEY,
    nombre              VARCHAR(100)  NOT NULL,
    imagen_url          VARCHAR(255),
    fecha_fundacion     DATE,
    pais_sede_central   VARCHAR(50)   NOT NULL,
    presidente_actual   VARCHAR(50)   NOT NULL
);

CREATE TABLE juegos (
    id                     SERIAL PRIMARY KEY,
    nombre                 VARCHAR(100)  NOT NULL,
    descripcion            TEXT          NOT NULL,
    precio                 FLOAT NOT NULL,
    imagen_url                VARCHAR(255),
    pegi                   INT           NOT NULL,
    calificacion_promedio  NUMERIC(3,2),
    web_oficial            VARCHAR(255)  NOT NULL,
    desarrolladora_id      INT           REFERENCES desarrolladoras(id),
    steam_id               INT UNIQUE,
    url_steam              VARCHAR(255)
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
    id               SERIAL PRIMARY KEY,
    nombre_plataforma VARCHAR(50) NOT NULL
);

CREATE TABLE generos (
    id     SERIAL PRIMARY KEY,
    nombre VARCHAR(50)   NOT NULL
);

CREATE TABLE juegos_plataformas (
    id           SERIAL PRIMARY KEY,
    id_juego     INT REFERENCES juegos(id),
    id_plataforma INT REFERENCES plataformas(id),
);

CREATE TABLE juegos_generos (
    id         SERIAL PRIMARY KEY,
    id_juego   INT REFERENCES juegos(id),
    id_genero  INT REFERENCES generos(id),
);


