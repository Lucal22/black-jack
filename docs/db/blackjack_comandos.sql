-- Inicia banco
use blackjack;

-- Rodada:

-- Cria jogador
insert into jogador(login, senha)
values(Anna, 1234);
select ID_jogador from jogador where login = Anna;

-- Dados jogador
select j.login, c.saldo from jogador as j
join carteira as c 
on j.ID_jogador = c.ID_jogador
 where id_jogador = ?;

-- Cria rodada
call inicia_rodada(?);
select * from rodada where resultado = "Andamento";

-- Joga carta
call joga_carta(2,'Jogador');
call joga_carta(2,'Dealer');

-- Calcula total de pontos feitos
select
    SUM(case when cr.dono = 'Jogador' then c.valor else 0 end) as Jogador,
    SUM(case when cr.dono = 'Dealer' then c.valor else 0 end) as Dealer
from carta_rodada cr
join carta c on c.ID_carta = cr.ID_carta
where cr.ID_rodada = ?;

-- Cartas inseridas
select * from carta_rodada where id_rodada = ? order by data_insercao;

