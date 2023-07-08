import sqlite3
import requests
import json
def inserir_registros():
    # Conectar ao banco de dados
    conexao = sqlite3.connect('database.db')
    cursor = conexao.cursor()

    url = 'https://dadosabertos.camara.leg.br/api/v2/partidos?dataInicio=2020-01-01&itens=100&ordem=ASC&ordenarPor=sigla'
    response = requests.get(url)
    dados = response.json()
    erro=0
    for partido in dados['dados']:
        sigla_partido = partido['sigla']
        nome_partido = partido['nome']
        url = partido['uri']
        url_partido=""
        response = requests.get(url)
        if response.status_code == 200:
            try:
                dados1 = response.json()
                url_partido= dados1['dados']['urlLogo']

        # Restante do código para processar os dados
            except json.decoder.JSONDecodeError as e:
                erro=erro+1
        else:
             erro=erro+1
        
        cursor.execute("INSERT INTO Partido (NomePartido, Sigla, Logo) VALUES ( ?, ?, ?)", (nome_partido, sigla_partido,  url_partido))        


    url = 'https://dadosabertos.camara.leg.br/api/v2/deputados'
    response = requests.get(url)
    dados = response.json()
    erro=0
    for deputado in dados['dados']:
        nome_deputado = deputado['nome']
        url_deputado = deputado['urlFoto']
        uF_deputado = deputado['siglaUf']
        sigla=deputado['siglaPartido']
        cpf=''
        sexo=''
        partido_id = 1
        url1 = deputado['uri']
        response1 = requests.get(url1)

        if response1.status_code == 200:
            try:
                dados1 = response1.json()
                cpf=dados1['dados']['cpf']
                sexo=dados1['dados']['sexo']

        # Restante do código para processar os dados
            except json.decoder.JSONDecodeError as e:
                erro=erro+1
        else:
             erro=erro+1
        cursor.execute("SELECT id FROM Partido WHERE Sigla = ?", (sigla,))
        result = cursor.fetchone()
        if result:
            partido_id = result[0]
        cursor.execute("INSERT INTO Deputado (NomeDeputado, Foto, Uf, Sexo, Cpf, fk_Partido_id) VALUES (?, ?, ?, ?, ?, ?)", (nome_deputado,  url_deputado, uF_deputado, sexo, cpf, partido_id))

    # url = 'https://dadosabertos.camara.leg.br/api/v2/eventos?dataInicio=2023-01-01&itens=2000&ordem=ASC&ordenarPor=dataHoraInicio'
    # response = requests.get(url)
    # dados = response.json()

    # for evento in dados['dados']:
    #     sigla_partido = partido['sigla']
    #     nome_partido = partido['nome']
    #     url = partido['uri']
    #     response = requests.get(url)
    #     dados1 = response.json()
    #     url_partido= dados1['dados']['urlLogo']
    #     cursor.execute("INSERT INTO Partido (NomePartido, Sigla, Logo) VALUES ( ?, ?, ?)", (nome_partido, sigla_partido,  url_partido))    

    # Salvar as alterações
    conexao.commit()

    # Fechar a conexão com o banco de dados
    conexao.close()

# Inserir registros na tabela Deputado

