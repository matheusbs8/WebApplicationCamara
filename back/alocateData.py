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
    idDeputado=0
    for deputado in dados['dados']:
        nome_deputado = deputado['nome']
        url_deputado = deputado['urlFoto']
        uF_deputado = deputado['siglaUf']
        sigla=deputado['siglaPartido']
        idExterno=deputado['id']
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
        cursor.execute("SELECT idPartido FROM Partido WHERE Sigla = ?", (sigla,))
        result = cursor.fetchone()
        if result:
            partido_id = result[0]
        cursor.execute("INSERT INTO Deputado (idDeputado,NomeDeputado, Foto, Uf, Sexo, Cpf, fk_Partido_id) VALUES (?, ?, ?, ?, ?, ?, ?)", (idExterno,nome_deputado,  url_deputado, uF_deputado, sexo, cpf, partido_id))

        urlG = 'https://dadosabertos.camara.leg.br/api/v2/deputados/'+str(idExterno)+'/despesas?ordem=ASC&ordenarPor=ano'
        idDeputado=deputado['id']
        responseG = requests.get(urlG)
        dadosG = responseG.json()
        #print(dadosG)
        for gasto in dadosG['dados']:
            tipo_gasto=gasto['tipoDespesa']
            valorLiquido=gasto['valorLiquido']
            ano_gasto=gasto['ano']
            mes_gasto=gasto['mes']
            cursor.execute("INSERT INTO Gastos (Tipo, ValorLiquido, ano, mes, fk_Deputado_id) VALUES (?, ?, ?, ?, ?)", (tipo_gasto,  valorLiquido, ano_gasto, mes_gasto, idDeputado))

    url = 'https://dadosabertos.camara.leg.br/api/v2/eventos?dataInicio=2023-01-01&ordem=ASC&ordenarPor=dataHoraInicio&itens=300'
    response = requests.get(url)
    dados = response.json()
    idEvento=0
    for evento in dados['dados']:
        idEvento=idEvento+1
        inicio = evento['dataHoraInicio']
        descricao = evento['descricao']
        fim = evento['dataHoraFim']
        cursor.execute("INSERT INTO Evento (dataHoraIncio,dataHoraFinal,Descricao) VALUES ( ?, ?, ?)", (inicio, fim, descricao))
        urlG='https://dadosabertos.camara.leg.br/api/v2/eventos/'+str(evento['id'])+'/deputados'    
        responseG = requests.get(urlG)
        dadosG = responseG.json()
        for frequenta in dadosG['dados']:
            
            cursor.execute("INSERT INTO Frequenta (fk_Evento_id, fk_Deputado_id) VALUES (?, ?)", (idEvento, frequenta['id']))
        
    # Salvar as alterações
    conexao.commit()

    # Fechar a conexão com o banco de dados
    conexao.close()

# Inserir registros na tabela Deputado

