--Inserts Generos
INSERT INTO generos(nombre) VALUES('Aventura');
INSERT INTO generos(nombre) VALUES('Accion');
INSERT INTO generos(nombre) VALUES('Plataformas');
INSERT INTO generos(nombre) VALUES('Lucha');
INSERT INTO generos(nombre) VALUES('Metroidvania');
INSERT INTO generos(nombre) VALUES('Roguelike');
INSERT INTO generos(nombre) VALUES('Simulacion');
INSERT INTO generos(nombre) VALUES('RPG');
INSERT INTO generos(nombre) VALUES('Deportes');
INSERT INTO generos(nombre) VALUES('Estrategia');

--Inserts Plataformas
INSERT INTO plataformas(nombre) VALUES('Xbox One');
INSERT INTO plataformas(nombre) VALUES('Xbox Series X-S');
INSERT INTO plataformas(nombre) VALUES('Steam');
INSERT INTO plataformas(nombre) VALUES('Playstation 5');
INSERT INTO plataformas(nombre) VALUES('Playstation 4');
INSERT INTO plataformas(nombre) VALUES('Nintendo Switch');
INSERT INTO plataformas(nombre) VALUES('Nintendo Switch 2');
INSERT INTO plataformas(nombre) VALUES('Epic Games');

--Inserts Desarrolladoras
INSERT INTO desarrolladoras(id, nombre, imagen_url, fecha_fundacion, pais_sede_central, presidente_actual)
VALUES 
(1, 'Supergiant Games', 'https://upload.wikimedia.org/wikipedia/en/2/2d/Supergiant_Games_Logo.png', '2009-05-01', 'Estados Unidos', 'Amir Rao'),
(2, 'Team Cherry', 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Team_Cherry_logo.svg/220px-Team_Cherry_logo.svg.png', '2014-01-01', 'Australia', 'Ari Gibson'),
(3, 'Matt Makes Games', 'https://upload.wikimedia.org/wikipedia/en/d/d3/Matt_Makes_Games_Logo.png', '2012-05-01', 'Canadá', 'Matt Thorson'),
(4, 'ConcernedApe', 'https://upload.wikimedia.org/wikipedia/en/c/c8/ConcernedApe_logo.png', '2015-01-01', 'Estados Unidos', 'Eric Barone'),
(5, 'Motion Twin', 'https://upload.wikimedia.org/wikipedia/en/e/e6/Motion_Twin_Logo.png', '2001-01-01', 'Francia', 'Yohan Fanise'),
(6, 'Sabotage Studio', 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Sabotage_Studio_Logo.png', '2016-04-01', 'Canadá', 'Philippe Dionne'),
(7, 'Ubisoft', 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Ubisoft_Logo.svg', '1986-03-28', 'Francia', 'Yves Guillemot'),
(8, 'Rockstar Games', 'https://upload.wikimedia.org/wikipedia/en/1/13/Rockstar_Games_Logo.svg', '1998-12-01', 'Estados Unidos', 'Sam Houser');


--Inserts Juegos
INSERT INTO juegos(id, nombre, descripcion, precio_usd, imagen_url, fecha_publicacion, web_oficial, pegi, puntaje_metacritic, desarrolladora_id)
VALUES 
(1, 'Hollow Knight', 'El mundo de Hollow Knight cobra vida gracias a sus detalles vívidos y melancólicos, sus cavernas con criaturas extrañas y terroríficas, y su animación a mano con un estilo tradicional en 2D.',
5, 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/capsule_616x353.jpg?t=1695270428', '2017-02-24', 'https://www.hollowknight.com/', 7, 87, 2),

(2, 'Celeste', 'Una plataforma desafiante sobre escalar una montaña y enfrentar tus propios demonios. Celeste combina controles precisos y una narrativa emocional.', 
10.49, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/504230/capsule_616x353.jpg?t=1645566426', '2018-01-25', 'http://www.celestegame.com/', 7, 94, 3),

(3, 'Stardew Valley', 'Heredaste la antigua granja de tu abuelo. ¡Con herramientas en mano, te dispones a comenzar tu nueva vida en Stardew Valley!', 
4.99, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/capsule_616x353.jpg?t=1714070014', '2016-02-26', 'http://stardewvalley.net/', 3, 89, 4),

(4, 'Dead Cells', 'Un rogue-lite de acción en 2D con combate frenético, múltiples armas y rutas que cambian cada partida. Explorá un castillo en constante evolución.', 
12.49, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/588650/capsule_616x353.jpg?t=1712652897', '2018-08-07', 'https://dead-cells.com/', 16, 89, 5),

(5, 'Hades', 'Un juego rogue-like de acción donde encarnás a Zagreo, hijo de Hades, tratando de escapar del Inframundo con la ayuda de los dioses del Olimpo.', 
4.99, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145360/capsule_616x353.jpg?t=1709310976', '2020-09-17', 'https://www.supergiantgames.com/games/hades/', 16, 93, 2),

(6, 'The Messenger', 'Un ninja se embarca en un viaje para entregar un pergamino crucial. Combina acción 8-bit/16-bit y viajes en el tiempo con mucho humor.', 
10.49, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/764790/capsule_616x353.jpg?t=1602532407', '2018-08-30', 'https://www.sabotagestudio.com/themessenger', 12, 86, 6),

(7, 'Assassin''s Creed Valhalla', 'Convertite en Eivor, un legendario guerrero vikingo, en una aventura épica por Inglaterra durante la Edad Oscura. Construí tu asentamiento, saqueá territorios enemigos y descubrí secretos del credo.', 
47.99, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2208920/capsule_616x353.jpg?t=1717082054', '2020-11-10', 'https://www.ubisoft.com/es-ar/game/assassins-creed/valhalla', 18, 80, 7),

(8, 'Grand Theft Auto V', 'Viví la historia entrelazada de tres criminales muy diferentes en Los Santos, una ciudad enorme y vibrante llena de posibilidades. Acción, caos y libertad en el sandbox más ambicioso de Rockstar.', 
44.99, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/capsule_616x353.jpg?t=1717789397', '2015-04-14', 'https://www.rockstargames.com/V', 18, 96, 8);


-- Inserts Comentarios
INSERT INTO comentarios(usuario, juego_id, texto, fecha_publicacion, calificacion, horas_jugadas, terminado) VALUES 
('juanma87', 1, 'Una obra de arte. El diseño del mundo y la música son increíbles.', '2023-06-15', 10, 60, TRUE),
('lau_gamer', 1, 'Un poco difícil para mí, pero se nota el amor en cada rincón.', '2023-07-02', 8, 25, FALSE);

INSERT INTO comentarios(usuario, juego_id, texto, fecha_publicacion, calificacion, horas_jugadas, terminado) VALUES 
('nico_rage', 5, 'El mejor rogue-like que jugué. La historia te atrapa más de lo que pensás.', '2024-01-12', 9, 45, TRUE),
('flor_sama', 5, 'Muy divertido, aunque repetitivo a veces. Grandes voces y música.', '2024-02-20', 8, 30, FALSE);

INSERT INTO comentarios(usuario, juego_id, texto, fecha_publicacion, calificacion, horas_jugadas, terminado) VALUES 
('clau_farmer', 3, 'Adictivo como pocos. Me hice amigo de todos en el pueblo.', '2022-09-10', 9, 150, TRUE),
('alejito', 3, 'Lo juego para relajarme después del trabajo, hermoso.', '2023-03-05', 10, 80, FALSE);

INSERT INTO comentarios(usuario, juego_id, texto, fecha_publicacion, calificacion, horas_jugadas, terminado) VALUES 
('tomirulez', 8, 'Increíble campaña y el online es eterno. Lo jugué en tres plataformas.', '2021-12-01', 10, 300, TRUE),
('eli_moon', 8, 'Muy violento para mi gusto pero bien hecho.', '2022-01-20', 7, 40, FALSE);

INSERT INTO comentarios(usuario, juego_id, texto, fecha_publicacion, calificacion, horas_jugadas, terminado) VALUES 
('patoarcade', 2, 'Emotivo, desafiante y con gran mensaje. Recomendado.', '2023-05-22', 10, 15, TRUE),
('vale_jump', 2, 'Demasiado difícil en algunas partes, pero hermoso juego.', '2023-06-30', 8, 10, FALSE);


--Inserts Juegos_Plataformas
INSERT INTO juegos_plataformas(id_juego, id_plataforma) VALUES (1, 3), (1, 4), (1, 5), (1, 6);
INSERT INTO juegos_plataformas(id_juego, id_plataforma) VALUES (2, 3), (2, 4), (2, 5), (2, 6), (2, 1);
INSERT INTO juegos_plataformas(id_juego, id_plataforma) VALUES (3, 3), (3, 5), (3, 6), (3, 1), (3, 4);
INSERT INTO juegos_plataformas(id_juego, id_plataforma) VALUES (4, 3), (4, 4), (4, 5), (4, 6), (4, 1);
INSERT INTO juegos_plataformas(id_juego, id_plataforma) VALUES (5, 3), (5, 4), (5, 5), (5, 6), (5, 1);
INSERT INTO juegos_plataformas(id_juego, id_plataforma) VALUES (6, 3), (6, 5), (6, 6);
INSERT INTO juegos_plataformas(id_juego, id_plataforma) VALUES (7, 1), (7, 2), (7, 4), (7, 5), (7, 3);
INSERT INTO juegos_plataformas(id_juego, id_plataforma) VALUES (8, 1), (8, 2), (8, 3), (8, 4), (8, 5);


--Inserts Juegos_Generos
INSERT INTO juegos_generos(id_juego, id_genero) VALUES (1, 1), (1, 2), (1, 5);
INSERT INTO juegos_generos(id_juego, id_genero) VALUES (2, 1), (2, 3);
INSERT INTO juegos_generos(id_juego, id_genero) VALUES (3, 1), (3, 7), (3, 8);
INSERT INTO juegos_generos(id_juego, id_genero) VALUES (4, 2), (4, 5), (4, 6);
INSERT INTO juegos_generos(id_juego, id_genero) VALUES (5, 2), (5, 6), (5, 8);
INSERT INTO juegos_generos(id_juego, id_genero) VALUES (6, 1), (6, 3), (6, 5);
INSERT INTO juegos_generos(id_juego, id_genero) VALUES (7, 1), (7, 2), (7, 8);
INSERT INTO juegos_generos(id_juego, id_genero) VALUES (8, 1), (8, 2), (8, 7);
