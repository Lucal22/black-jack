DELIMITER //
CREATE PROCEDURE gerar_rodadas_100()
BEGIN
	declare I INT DEFAULT 1;
    declare v_id_rodada INT;
    declare v_id_jogador INT;
    declare v_resultado varchar(20);
    
    WHILE i <= 100 DO 
		select ID_jogador into v_id_jogador from jogador
		order by RAND() limit 1;
		call inicia_rodada(v_id_jogador);
		select ID_rodada into v_id_rodada from rodada
        where resultado = "Andamento"
        order by ID_rodada desc limit 1;
        CALL joga_carta(v_id_rodada, 'Jogador');

SELECT Resultado
INTO v_resultado
FROM rodada
WHERE ID_rodada = v_id_rodada;

IF v_resultado = 'Andamento' THEN

    CALL joga_carta(v_id_rodada, 'Jogador');

    SELECT Resultado
    INTO v_resultado
    FROM rodada
    WHERE ID_rodada = v_id_rodada;

    IF v_resultado = 'Andamento' THEN

        CALL joga_carta(v_id_rodada, 'Dealer');

        SELECT Resultado
        INTO v_resultado
        FROM rodada
        WHERE ID_rodada = v_id_rodada;

        IF v_resultado = 'Andamento' THEN

            CALL joga_carta(v_id_rodada, 'Dealer');

            SELECT Resultado
            INTO v_resultado
            FROM rodada
            WHERE ID_rodada = v_id_rodada;

            IF v_resultado = 'Andamento' THEN

                CALL joga_carta(v_id_rodada, 'Dealer');

            END IF;
        END IF;
    END IF;
END IF;
        SET i = i + 1;
	END WHILE;
END //
DELIMITER ;


CALL gerar_rodadas_100();