-- Triggers --

-- Checa carteira antes de iniciar jogada
DELIMITER //
CREATE TRIGGER checa_saldo
BEFORE INSERT ON rodada
FOR EACH ROW
BEGIN
	declare saldo_carteira INT;
    select saldo into saldo_carteira from carteira where id_jogador = new.id_jogador;
    if saldo_carteira < 20 then
		signal sqlstate '45000'
        set message_text = 'Saldo insuficiente!';
	end if;
END //
DELIMITER;

-- Cria a carteira do jogador logo após a criação do mesmo.
DELIMITER //
CREATE TRIGGER criar_carteira
AFTER INSERT ON jogador
FOR EACH ROW
BEGIN
	INSERT INTO carteira (ID_jogador, saldo)
	VALUES (NEW.id_jogador, 100);
END //
DELIMITER ;

-- Checa se a partida já acabou antes de inserir uma nova linha
DELIMITER //
CREATE TRIGGER partida_andamento
BEFORE INSERT ON carta_rodada 
FOR EACH ROW
BEGIN
	declare r_resultado varchar(20);
	select r.resultado into r_resultado from rodada as r where id_rodada = new.ID_rodada;
    if r_resultado <> 'Andamento' then
		signal sqlstate '45000'
        set message_text = 'Nao e possivel adicionar cartas em uma rodada finalizada';
    end if;
END //
DELIMITER ;

-- Checa a pontuação DEPOIS de inserir nova carta
DELIMITER //
CREATE TRIGGER depois_inserir_carta
AFTER INSERT ON carta_rodada

FOR EACH ROW
BEGIN
	-- Declarando variáveis
	declare soma_cartas_dealer INT;
    declare num_cartas_dealer INT;
	declare soma_cartas_jogador INT;
    
    -- Somando VALOR das cartas do jogador
    select coalesce(sum(c.valor),0) into soma_cartas_jogador from carta_rodada as cr
    join carta as c ON c.ID_carta = cr.ID_carta
    where cr.ID_rodada = NEW.ID_rodada and cr.dono = 'Jogador';
    
    -- Somando VALOR das cartas do Dealer
    select coalesce(sum(c.valor),0) into soma_cartas_dealer from carta_rodada as cr
    join carta as c ON c.ID_carta = cr.ID_carta
    where cr.ID_rodada = NEW.ID_rodada and cr.dono = 'Dealer';
    
	-- Somando NÚMERO das cartas do Dealer
    select count(c.valor) into num_cartas_dealer from carta_rodada as cr
    join carta as c ON c.ID_carta = cr.ID_carta
    where cr.ID_rodada = NEW.ID_rodada and cr.dono = 'Dealer';
    
    --  checa se o jogador fez mais de 21 pontos com a adição da carta.
	if soma_cartas_jogador > 21 then
		update rodada set resultado = 'Derrota'
		where ID_rodada = NEW.ID_rodada;

	elseif soma_cartas_dealer > 21 then
		update rodada set resultado = 'Vitoria'
		where ID_rodada = NEW.ID_rodada;

	elseif soma_cartas_dealer >= 17 and num_cartas_dealer >= 3 or num_cartas_dealer >= 5 then
		call calcula_resultado(new.id_rodada, soma_cartas_dealer, soma_cartas_jogador);
	end if;

END //
DELIMITER ;

-- Atualiza saldo da carteira
DELIMITER //
CREATE TRIGGER atualiza_carteira
AFTER UPDATE ON rodada
FOR EACH ROW
BEGIN
    declare c_id_carteira INT;
    
    -- Pega id da carteira do jogador
    select id_carteira into c_id_carteira from carteira where id_jogador = new.ID_jogador;
    
    -- Deposita ou retira valor da aposta
    if old.resultado = 'Andamento' and new.resultado = 'Vitoria' then
		insert into carteira_rodada(ID_rodada, ID_carteira,valor)
        values (new.id_rodada, c_id_carteira, new.valor_aposta);
        update carteira set saldo = saldo + new.valor_aposta where id_carteira = c_id_carteira;
        
    elseif old.resultado = 'Andamento' and new.resultado = 'Derrota' then
		insert into carteira_rodada(ID_rodada, ID_carteira,valor)
        values (new.id_rodada, c_id_carteira, new.valor_aposta);
        update carteira set saldo = saldo - new.valor_aposta where id_carteira = c_id_carteira;
    elseif old.resultado = 'Andamento' and new.resultado = 'Empate' then
		insert into carteira_rodada(ID_rodada, ID_carteira,valor)
        values (new.id_rodada, c_id_carteira, 0);
        
        
    end if;
    
END //
DELIMITER ;

-- PROCEDURES --

-- Cria jogador
DELIMITER //
CREATE PROCEDURE cria_jogador(-- rodar --
IN p_login VARCHAR(20),
IN p_senha VARCHAR(20)
)
BEGIN

    insert into jogador(Login,senha)
	values(p_login,p_senha);

END //
DELIMITER ;

-- Inicia a Rodada
DELIMITER //
CREATE PROCEDURE inicia_rodada( -- rodar --
IN p_id_player INT
)
BEGIN
	declare v_id_dealer INT;
    declare v_id_rodada INT;
	select d.ID_dealer into v_id_dealer from dealer as d ORDER BY RAND()
    LIMIT 1;
    
    insert into rodada(ID_jogador,ID_dealer)
	values(p_id_player,v_id_dealer);
    
    SET v_id_rodada = LAST_INSERT_ID();
    
    call joga_carta(v_id_rodada,'Jogador');
    call joga_carta(v_id_rodada,'Dealer');
    call joga_carta(v_id_rodada,'Jogador');
    call joga_carta(v_id_rodada,'Dealer');

    select v_id_rodada as ID_rodada;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE joga_carta(
IN p_id_rodada INT,
IN p_player VARCHAR(10)
)
BEGIN
	declare v_id_carta INT;
    
	select c.ID_carta into v_id_carta from carta as c
	WHERE c.ID_carta NOT IN (
    SELECT cr.ID_carta
    FROM carta_rodada as cr
    WHERE cr.ID_rodada = p_id_rodada
)
ORDER BY RAND()
LIMIT 1;

insert into carta_rodada(ID_carta, ID_rodada, dono)
values(v_id_carta,p_id_rodada, p_player);
END //
DELIMITER ;

-- Calcula para ver quem ganhou a partida
DELIMITER //
CREATE PROCEDURE calcula_resultado(
    IN p_id_rodada INT, 
    IN dealer INT,
    IN jogador INT
)
BEGIN
    if jogador > dealer then
		update rodada set resultado = 'Vitoria'
        where ID_rodada = p_id_rodada and resultado = 'Andamento';
	elseif jogador = dealer then
		update rodada set resultado = 'Empate'
        where ID_rodada = p_id_rodada and resultado = 'Andamento';
	else
    update rodada set resultado = 'Derrota'
	where ID_rodada = p_id_rodada and resultado = 'Andamento';
	end if;
END //
DELIMITER ;

-- Termina rodada com derrota em caso do usuário fechar o jogo antes do esperado
DELIMITER //
CREATE PROCEDURE abortar_rodada(
IN p_id_rodada INT
)
BEGIN
	update rodada set resultado = 'Derrota' where id_rodada = p_id_rodada and resultado = 'Andamento';
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE dobrar_aposta(
IN p_id_rodada INT
)
BEGIN
	declare v_id_jogador INT;
	declare v_saldo INT;
    select id_jogador into v_id_jogador from rodada where id_rodada = p_id_rodada;
    select saldo into v_saldo from carteira where id_jogador = v_id_jogador;
    if v_saldo >= 40 then
	update rodada set valor_aposta = 40 where id_rodada = p_id_rodada and resultado = 'Andamento';
    else
		signal sqlstate '45000'
        set message_text = 'Saldo insuficiente';
	end if;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE comprar_produto(
IN p_id_jogador INT,
IN p_id_produto INT
)
BEGIN
	declare v_valor INT;
    select valor into v_valor from loja where ID_produto = p_id_produto;
	insert into carteira_loja(ID_produto, ID_carteira)
    values(p_id_produto, p_id_jogador);
    update loja set Qtd = Qtd -1 where ID_produto = p_id_produto;
    update carteira set Saldo = Saldo + v_valor where ID_jogador = p_id_jogador;
END //
DELIMITER ;

-- DROP TRIGGER IF EXISTS checa_saldo;
-- DROP TRIGGER IF EXISTS criar_carteira;
-- DROP TRIGGER IF EXISTS partida_andamento;
-- DROP TRIGGER IF EXISTS depois_inserir_carta;
-- DROP TRIGGER IF EXISTS atualiza_carteira;
-- DROP PROCEDURE IF EXISTS calcula_resultado;
-- DROP PROCEDURE IF EXISTS cria_jogador;
-- DROP PROCEDURE IF EXISTS inicia_rodada;
-- DROP PROCEDURE IF EXISTS abortar_rodada;
-- DROP PROCEDURE IF EXISTS dobrar_aposta;