-- Cria banco
create database if not exists blackjack;

-- Inicia banco
use blackjack;

-- Criando tabelas
CREATE TABLE jogador 
( 
 ID_jogador INT PRIMARY KEY auto_increment,  
 Login VARCHAR(20) NOT NULL unique,
 Senha VARCHAR(12) NOT NULL
);

CREATE TABLE dealer 
( 
 ID_dealer INT PRIMARY KEY auto_increment,  
 Nome VARCHAR(20) NOT NULL unique
); 

CREATE TABLE carta 
( 
 ID_carta INT PRIMARY KEY auto_increment,
 Nome VARCHAR(20) NOT NULL,
 Valor INT NOT NULL
); 

CREATE TABLE rodada 
( 
 ID_rodada INT NOT NULL auto_increment unique,
 ID_jogador INT NOT NULL,  
 ID_dealer INT NOT NULL,  
 PRIMARY KEY (`ID_Rodada`,`ID_jogador`,`ID_dealer`),
 valor_aposta INT DEFAULT 20,  
 Resultado ENUM('Andamento', 'Vitória', 'Derrota', 'Empate') DEFAULT 'Andamento'
); 

CREATE TABLE carta_rodada
( 
 ID_carta INT NOT NULL,
 ID_rodada INT NOT NULL,
 PRIMARY KEY (`ID_carta`,`ID_rodada`),
 dono ENUM('Jogador','Dealer')  NOT NULL,
 data_insercao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE carteira 
( 
 ID_carteira INT PRIMARY KEY auto_increment,  
 ID_jogador INT NOT NULL unique,  
 Saldo INT  DEFAULT 100
); 

CREATE TABLE carteira_rodada 
( 
 ID_rodada INT NOT NULL unique, 
 ID_carteira INT NOT NULL,
 Valor INT NOT NULL,
  PRIMARY KEY (`ID_carteira`,`ID_rodada`)
); 

CREATE TABLE loja 
( 
 ID_Produto INT PRIMARY KEY auto_increment,  
 Produto VARCHAR(30) NOT NULL unique,
 Qtd INT DEFAULT 10, 
 Valor INT NOT NULL unique
); 

CREATE TABLE carteira_loja 
( 
ID_transacao INT NOT NULL auto_increment,
 ID_produto INT NOT NULL,  
 ID_carteira INT NOT NULL,
  PRIMARY KEY (`ID_Transacao`,`ID_Produto`,`ID_Carteira`)
); 

-- Definindo Foreign Keys
ALTER TABLE rodada ADD FOREIGN KEY(ID_jogador) REFERENCES jogador (ID_jogador);
ALTER TABLE rodada ADD FOREIGN KEY(ID_dealer) REFERENCES dealer (ID_dealer);
ALTER TABLE carteira ADD FOREIGN KEY(ID_jogador) REFERENCES jogador (ID_jogador);
ALTER TABLE carteira_loja ADD FOREIGN KEY(ID_produto) REFERENCES loja (ID_produto);
ALTER TABLE carteira_loja ADD FOREIGN KEY(ID_carteira) REFERENCES carteira (ID_carteira);
ALTER TABLE carta_rodada ADD FOREIGN KEY(ID_carta) REFERENCES carta (ID_carta);
ALTER TABLE carta_rodada ADD FOREIGN KEY(ID_rodada) REFERENCES rodada (ID_rodada);
ALTER TABLE carteira_rodada ADD FOREIGN KEY(ID_carteira) REFERENCES carteira (ID_carteira);
ALTER TABLE carteira_rodada ADD FOREIGN KEY(ID_rodada) REFERENCES rodada (ID_rodada);

-- drop database blackjack;