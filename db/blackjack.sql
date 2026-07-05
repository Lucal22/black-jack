-- Cria banco
create database if not exists blackjack;

-- Inicia banco
use blackjack;

-- Criando tabelas
CREATE TABLE Jogador 
( 
 ID_jogador INT PRIMARY KEY auto_increment,  
 Login VARCHAR(20) NOT NULL unique,
 Senha VARCHAR(12) NOT NULL
);

CREATE TABLE Dealer 
( 
 ID_dealer INT PRIMARY KEY auto_increment,  
 Nome VARCHAR(20) NOT NULL unique
); 

CREATE TABLE Carta 
( 
 ID_carta INT PRIMARY KEY auto_increment,
 Nome VARCHAR(20) NOT NULL,
 Valor INT NOT NULL
); 

CREATE TABLE Rodada 
( 
 ID_rodada INT NOT NULL auto_increment unique,
 ID_jogador INT NOT NULL,  
 ID_dealer INT NOT NULL,  
 PRIMARY KEY (`ID_Rodada`,`ID_jogador`,`ID_dealer`),
 valor_aposta INT DEFAULT 20,  
 Resultado ENUM('Andamento', 'Vitória', 'Derrota', 'Empate') DEFAULT 'Andamento'
); 

CREATE TABLE Carta_Rodada
( 
 ID_carta INT NOT NULL,
 ID_rodada INT NOT NULL,
 PRIMARY KEY (`ID_carta`,`ID_rodada`),
 dono ENUM('Jogador','Dealer')  NOT NULL,
 data_insercao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE Carteira 
( 
 ID_carteira INT PRIMARY KEY auto_increment,  
 ID_jogador INT NOT NULL unique,  
 Saldo INT  DEFAULT 100
); 

CREATE TABLE Carteira_Rodada 
( 
 ID_rodada INT NOT NULL unique, 
 ID_carteira INT NOT NULL,
 Valor INT NOT NULL,
  PRIMARY KEY (`ID_carteira`,`ID_rodada`)
); 

CREATE TABLE Loja 
( 
 ID_Produto INT PRIMARY KEY auto_increment,  
 Produto VARCHAR(30) NOT NULL unique,
 Qtd INT DEFAULT 10, 
 Valor INT NOT NULL unique
); 

CREATE TABLE Carteira_Loja 
( 
ID_transacao INT NOT NULL auto_increment,
 ID_produto INT NOT NULL,  
 ID_carteira INT NOT NULL,
  PRIMARY KEY (`ID_Transacao`,`ID_Produto`,`ID_Carteira`)
); 

-- Definindo Foreign Keys
ALTER TABLE Rodada ADD FOREIGN KEY(ID_jogador) REFERENCES Jogador (ID_jogador);
ALTER TABLE Rodada ADD FOREIGN KEY(ID_dealer) REFERENCES Dealer (ID_dealer);
ALTER TABLE Carteira ADD FOREIGN KEY(ID_jogador) REFERENCES Jogador (ID_jogador);
ALTER TABLE Carteira_Loja ADD FOREIGN KEY(ID_produto) REFERENCES Loja (ID_produto);
ALTER TABLE Carteira_Loja ADD FOREIGN KEY(ID_carteira) REFERENCES Carteira (ID_carteira);
ALTER TABLE Carta_Rodada ADD FOREIGN KEY(ID_carta) REFERENCES Carta (ID_carta);
ALTER TABLE Carta_Rodada ADD FOREIGN KEY(ID_rodada) REFERENCES Rodada (ID_rodada);
ALTER TABLE Carteira_Rodada ADD FOREIGN KEY(ID_carteira) REFERENCES Carteira (ID_carteira);
ALTER TABLE Carteira_Rodada ADD FOREIGN KEY(ID_rodada) REFERENCES Rodada (ID_rodada);

-- drop database blackjack;