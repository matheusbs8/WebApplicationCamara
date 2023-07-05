import sqlite3
import requests
import json
def inserir_registros():
    # Conectar ao banco de dados
    conexao = sqlite3.connect('database.db')
    cursor = conexao.cursor()

    url = 'https://dadosabertos.camara.leg.br/api/v2/partidos'
    response = requests.get(url)
    dados = response.json()

    for partido in dados['dados']:
        id_partido = partido['id']
        sigla_partido = partido['sigla']
        nome_partido = partido['nome']
        url = partido['uri']
        response = requests.get(url)
        dados1 = response.json()
        url_partido= dados1['dados']['urlLogo']
        cursor.execute("INSERT INTO Partido (id,Nome, Sigla, Logo) VALUES (?, ?, ?, ?)", (id_partido, sigla_partido, nome_partido, url_partido))        

    url = 'https://dadosabertos.camara.leg.br/api/v2/deputados'
    response = requests.get(url)
    dados = response.json()
    
    for deputado in dados['dados']:
        nome_deputado = deputado['nome']
        url_deputado = deputado['urlFoto']
        cursor.execute("INSERT INTO Deputado (Nome, Foto) VALUES (?, ?)", (nome_deputado,  url_deputado))

    

    # Salvar as alterações
    conexao.commit()

    # Fechar a conexão com o banco de dados
    conexao.close()

# Inserir registros na tabela Deputado

