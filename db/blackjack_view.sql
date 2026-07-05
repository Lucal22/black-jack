create view vw_historico as
	select 
		j.login,
		r.resultado,
		SUM(case when cr.dono = 'Jogador' then c.valor else 0 end) as Jogador,
		SUM(case when cr.dono = 'Dealer' then c.valor else 0 end) as Dealer
	from jogador as j
	join rodada as r
		on j.ID_jogador = r.ID_jogador
    join carta_rodada as cr
		on cr.ID_rodada = r.ID_rodada
    join carta as c
		on c.ID_carta = cr.ID_carta
    group by 
		j.login,
		r.ID_rodada,
		r.resultado;
    

select * from vw_historico;
