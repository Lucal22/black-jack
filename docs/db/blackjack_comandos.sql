-- Inicia banco
use blackjack;

-- Rodada:

-- Cria rodada
insert into rodada(ID_jogador,ID_dealer)
values(1,10);
select * from rodada;
select * from jogador where id_jogador = 1;
update carteira set saldo = 40 where ID_jogador = 101; 
select * from carteira where ID_jogador = 101;

call joga_carta(2,'Jogador');
call joga_carta(2,'Dealer');

select * from carta_rodada where id_rodada = 4 order by data_insercao;
select * from carteira_rodada;
select * from carteira where ID_jogador = 1;

select
    SUM(case when cr.dono = 'Jogador' then c.valor else 0 end) as Jogador,
    SUM(case when cr.dono = 'Dealer' then c.valor else 0 end) as Dealer
from carta_rodada cr
join carta c on c.ID_carta = cr.ID_carta
where cr.ID_rodada = 4;