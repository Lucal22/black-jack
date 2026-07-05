-- Adicionando cartas
INSERT INTO carta (nome, valor)
VALUES
('espadas_1',1),('espadas_2',2),('espadas_3',3),('espadas_4',4),('espadas_5',5),('espadas_6',6),('espadas_7',7),('espadas_8',8),('espadas_9',9),('espadas_10',10),('espadas_j',10),('espadas_q',10),('espadas_k',10),('espadas_as',1),
('copas_1',1),('copas_2',2),('copas_3',3),('copas_4',4),('copas_5',5),('copas_6',6),('copas_7',7),('copas_8',8),('copas_9',9),('copas_j',10),('copas_q',10),('copas_k',10),('copas_as',1),
('ouros_1',1),('ouros_2',2),('ouros_3',3),('ouros_4',4),('ouros_5',5),('ouros_6',6),('ouros_7',7),('ouros_8',8),('ouros_9',9),('ouros_10',10),('ouros_j',10),('ouros_q',10),('ouros_k',10),('ouros_as',1),
('paus_1',1),('paus_2',2),('paus_3',3),('paus_4',4),('paus_5',5),('paus_6',6),('paus_7',7),('paus_8',8),('paus_9',9),('paus_10',10),('paus_j',10),('paus_q',10),('paus_k',10),('paus_as',1);
select * from carta;

-- adicionando items loja
INSERT INTO loja (produto, qtd, valor)
values('100 creditos',10,100),('60 creditos',10,60),('200 creditos',10,200);
select * from loja;

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

-- LPAD(FLOOR(RAND() * 10000), 4, '0')