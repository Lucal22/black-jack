-- Cria banco
create database if not exists blackjack;

-- Inicia banco
use blackjack;

-- Criando tabelas
CREATE TABLE Jogador 
( 
 ID_jogador INT PRIMARY KEY,  
 Login VARCHAR(20),
 Senha VARCHAR(12),  
 Saldo INT default 100
); 

CREATE TABLE Dealer 
( 
 ID_dealer INT PRIMARY KEY,  
 Nome VARCHAR(20)
); 

CREATE TABLE Carta 
( 
 ID_carta INT PRIMARY KEY,  
 Nome VARCHAR(20), 
 Valor INT
); 

CREATE TABLE Rodada 
( 
 ID_Rodada INT NOT NULL,  
 ID_jogador INT NOT NULL,  
 ID_dealer INT NOT NULL,  
 PRIMARY KEY (`ID_Rodada`,`ID_jogador`,`ID_dealer`),
 valor_aposta INT,  
 Resultado ENUM('Andamento', 'Vitória', 'Derrota') DEFAULT 'Andamento'
); 

CREATE TABLE Carta_Rodada
( 
 ID_carta INT NOT NULL, 
 ID_rodada INT NOT NULL,  
 PRIMARY KEY (`ID_carta`,`ID_rodada`),
 dono ENUM('Jogador','Dealer')  
); 

CREATE TABLE Carteira 
( 
 ID_Carteira INT PRIMARY KEY,  
 ID_jogador INT,  
 Saldo INT  
); 

CREATE TABLE Carteira_Rodada 
( 
 ID_Rodada INT PRIMARY KEY, 
 ID_Carteira INT,
 Valor INT 
); 

CREATE TABLE Loja 
( 
 ID_Produto INT PRIMARY KEY,  
 Produto VARCHAR(30),  
 Qtd INT DEFAULT 10, 
 Valor INT  
); 

CREATE TABLE Carteira_Loja 
( 
 ID_Produto INT NOT NULL,  
 ID_Carteira INT NOT NULL,  
 ID_Transacao INT NOT NULL,
  PRIMARY KEY (`ID_Produto`,`ID_Carteira`,`ID_Transacao`)
); 

-- Definindo Foreign Keys
ALTER TABLE Rodada ADD FOREIGN KEY(ID_jogador) REFERENCES Jogador (ID_jogador);
ALTER TABLE Rodada ADD FOREIGN KEY(ID_dealer) REFERENCES Dealer (ID_dealer);
ALTER TABLE Joga ADD FOREIGN KEY(ID_carta) REFERENCES Cartas (ID_carta);
ALTER TABLE Joga ADD FOREIGN KEY(ID_rodada) REFERENCES Rodada (ID_rodada);
ALTER TABLE Carteira ADD FOREIGN KEY(ID_jogador) REFERENCES Jogador (ID_jogador);
ALTER TABLE Carteira_Rodada ADD FOREIGN KEY(ID_Carteira) REFERENCES Carteira (ID_Carteira);
ALTER TABLE Carteira_Rodada ADD FOREIGN KEY(ID_Rodada) REFERENCES Rodada (ID_Rodada);
ALTER TABLE Carteira_Loja ADD FOREIGN KEY(ID_Produto) REFERENCES Loja (ID_Produto);
ALTER TABLE Carteira_Loja ADD FOREIGN KEY(ID_Carteira) REFERENCES Carteira (ID_Carteira);

-- drop database blackjack;