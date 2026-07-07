-- Adicionando cartas
INSERT INTO carta (nome, valor)
VALUES
('spade_1',1),('spade_2',2),('spade_3',3),('spade_4',4),('spade_5',5),('spade_6',6),('spade_7',7),('spade_8',8),('spade_9',9),('spade_10',10),('spade_jack',10),('spade_queen',10),('spade_king',10),
('heart_1',1),('heart_2',2),('heart_3',3),('heart_4',4),('heart_5',5),('heart_6',6),('heart_7',7),('heart_8',8),('heart_9',9),('heart_jack',10),('heart_queen',10),('heart_king',10),
('diamond_1',1),('diamond_2',2),('diamond_3',3),('diamond_4',4),('diamond_5',5),('diamond_6',6),('diamond_7',7),('diamond_8',8),('diamond_9',9),('diamond_10',10),('diamond_jack',10),('diamond_queen',10),('diamond_king',10),
('club_1',1),('club_2',2),('club_3',3),('club_4',4),('club_5',5),('club_6',6),('club_7',7),('club_8',8),('club_9',9),('club_10',10),('club_jack',10),('club_queen',10),('club_king',10);

-- adicionando items loja
INSERT INTO loja (Produto, qtd, valor)
values('100 creditos',100,100),('60 creditos',100,60),('200 creditos',100,200);

-- adicionando jogadores e criando suas carteiras
DELIMITER //

CREATE PROCEDURE gerar_jogadores_100()
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE v_id_jogador INT;

    WHILE i <= 100 DO
        INSERT INTO jogador (login, senha)
        VALUES (
            CONCAT(
                ELT(
                    1 + MOD(i - 1, 20),
                    'Gabriel','Lucas','Matheus','Pedro','Joao',
                    'Mariana','Juliana','Fernanda','Patricia','Amanda',
                    'Ricardo','Thiago','Bruno','Felipe','Rafael',
                    'Camila','Larissa','Bianca','Renata','Tatiane'
                ),
                i
            ),
            LPAD(FLOOR(RAND() * 10000), 4, '0')
        );

        -- Recupera o ID gerado pelo AUTO_INCREMENT
        SET v_id_jogador = LAST_INSERT_ID();

        -- Cria a carteira do jogador
        INSERT INTO carteira (ID_jogador, saldo)
        VALUES (v_id_jogador, 100);

        SET i = i + 1;

    END WHILE;
END //
DELIMITER ;

-- Adicionando Dealers
DELIMITER //
CREATE PROCEDURE gerar_dealers_100()
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE v_id_jogador INT;

    WHILE i <= 100 DO
        INSERT INTO dealer (nome)
        VALUES (
            CONCAT(
                ELT(
                    1 + MOD(i - 1, 20),
                    'Gabriel','Lucas','Matheus','Pedro','Joao',
                    'Mariana','Juliana','Fernanda','Patricia','Amanda',
                    'Ricardo','Thiago','Bruno','Felipe','Rafael',
                    'Camila','Larissa','Bianca','Renata','Tatiane'
                ),
                i
            )
           
        );

        SET i = i + 1;

    END WHILE;
END //
DELIMITER ;

CALL gerar_jogadores_100();
CALL gerar_dealers_100();