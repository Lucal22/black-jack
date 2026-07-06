create view vw_ranking_jogadores as
	select
		j.login as jogador,
        SUM(case when r.resultado = 'Vitória' then 1 else 0 end) as "vitorias",
        SUM(case when r.resultado = 'Derrota' then 1 else 0 end) as "derrotas",
        SUM(case when r.resultado = 'Empate' then 1 else 0 end) as "empates",
        count(*) as total_jogos
	from jogador as j
    join rodada as r
		on j.ID_jogador = r.ID_jogador
	group by j.login
	order by total_jogos desc;

create view vw_historico_jogador as
	select 
		r.ID_rodada as rodada,
        j.ID_jogador as ID_jogador,
		j.login as jogador,
		SUM(case when cr.dono = 'Jogador' then c.valor else 0 end) as "pontos_jogador",
        d.nome as dealer,
		SUM(case when cr.dono = 'Dealer' then c.valor else 0 end) as "pontos_dealer",
        r.resultado,
        r.valor_aposta as apostado
	from jogador as j
	join rodada as r
		on j.ID_jogador = r.ID_jogador
	join dealer as d
		on d.ID_dealer = r.ID_dealer
    join carta_rodada as cr
		on cr.ID_rodada = r.ID_rodada
    join carta as c
		on c.ID_carta = cr.ID_carta
    group by 
		j.login,
		r.ID_rodada,
		r.resultado;
    

select * from vw_historico;
select * from vw_historico_jogador;
select * from vw_ranking_jogadores;
select * from vw_historico_jogador where resultado = "Vitória";

 -- drop view vw_historico_jogador;
-- drop view vw_ranking_jogadores;
