-- Seleciona somente os jogadores cadastrados que tenham jogado mais de uma partida

-- Having
select j.login, 
sum(case when r.resultado = 'Vitória' then 1 end) as 'Vitórias',
sum(case when r.resultado = 'Derrota' then 1 end) as 'Derrotas'
from jogador as j inner join rodada as r on j.ID_jogador = r.ID_jogador group by r.ID_jogador having count(*) > 1;