from flask import Flask, render_template, jsonify

from createDatabase import criar_tabela

from alocateData import inserir_registros
import sqlite3
import os
#os.remove('database.db')
app = Flask(__name__)





# Criar a tabela (caso ela não exista) antes de inserir os registros
#criar_tabela()

# Inserir registros na tabela
#inserir_registros()

def dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {key: value for key, value in zip(fields, row)}

@app.route('/partido/<id>', methods=['GET'])
def obter_partido(id):
    connection = sqlite3.connect('database.db')
    connection.row_factory = dict_factory
    cursor = connection.cursor()
    cursor.execute("SELECT Sigla FROM Partido WHERE idPartido = ?", (id,))
    dados = cursor.fetchall()
    connection.close()
    response = jsonify(dados)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/partidos', methods=['GET'])
def obter_partidos():
    connection = sqlite3.connect('database.db')
    connection.row_factory = dict_factory
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Partido")
    dados = cursor.fetchall()
    connection.close()
    response = jsonify(dados)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deputado/<id>', methods=['GET'])
def obter_deputado(id):
    connection = sqlite3.connect('database.db')
    res = connection.execute("SELECT * FROM deputado WHERE idDeputado = ?", (id, ))
    dados = res.fetchall()
    response = jsonify(dados)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deputados', methods=['GET'])
def obter_deputados():
    connection = sqlite3.connect('database.db')
    connection.row_factory = dict_factory
    res = connection.execute("SELECT * FROM deputado")
    dados = res.fetchall()
    response = jsonify(dados)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/deputadosPartido/<id>', methods=['GET'])
def obter_deputadosPartido(id):
    connection = sqlite3.connect('database.db')
    connection.row_factory = dict_factory
    res = connection.execute("SELECT * FROM deputado WHERE FK_Partido_id = ?",(id,))
    dados = res.fetchall()
    response = jsonify(dados)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/gastosDeputado/<id>', methods=['GET'])
def obter_gastosDeputado(id):
    connection = sqlite3.connect('database.db')
    connection.row_factory = dict_factory
    res = connection.execute("SELECT ano, mes, ValorLiquido, Tipo FROM deputado INNER JOIN Gastos on Deputado.idDeputado=Gastos.fk_Deputado_id WHERE idDeputado = ?", (id, ))
    dados = res.fetchall()
    response = jsonify(dados)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


    
@app.route('/gastosDeputado/<id>', methods=['GET'])
def obter_gastosDeputado(id):
    connection = sqlite3.connect('database.db')
    connection.row_factory = dict_factory
    res = connection.execute("SELECT ano, mes, ValorLiquido, Tipo FROM deputado INNER JOIN Gastos on Deputado.idDeputado=Gastos.fk_Deputado_id WHERE idDeputado = ?", (id, ))
    dados = res.fetchall()
    response = jsonify(dados)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/gastoTotalDeputado/<id>', methods=['GET'])
def obter_gastoTotalDeputado(id):
    connection = sqlite3.connect('database.db')
    res = connection.execute("SELECT sum(ValorLiquido) FROM deputado INNER JOIN Gastos on Deputado.idDeputado=Gastos.fk_Deputado_id WHERE idDeputado = ?", (id, ))
    dados = res.fetchall()
    response = jsonify(dados)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    
@app.route('/partidoGastos', methods=['GET'])
def obter_gastos_partido():
    connection = sqlite3.connect('database.db')
    connection.row_factory = dict_factory
    cursor = connection.cursor()
    cursor.execute("SELECT Partido.Sigla, count(DISTINCT Deputado.idDeputado) as Num_Deputados, sum(Gastos.ValorLiquido) as Gasto_Total, (sum(Gastos.ValorLiquido)/count(DISTINCT Deputado.idDeputado)) as Gasto_p_Deputado FROM Deputado LEFT JOIN Gastos ON Gastos.fk_Deputado_id = Deputado.idDeputado INNER JOIN Partido ON Deputado.fk_Partido_id = Partido.idPartido GROUP BY idPartido ORDER BY Gasto_p_Deputado")
    dados = cursor.fetchall()
    connection.close()
    response = jsonify(dados)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/mulheresPartidos', methods=['GET'])
def porcentagemMulheresPartidos():
    connection = sqlite3.connect('database.db')
    connection.row_factory = dict_factory
    cursor = connection.cursor()
    cursor.execute("SELECT Dep_Mulheres.Sigla, COALESCE(Dep_Mulheres.Num_Mulheres, 0) as Num_Dep_Mulheres, Dep.Num_Deputados as Num_Dep, ROUND(COALESCE(CAST(Dep_Mulheres.Num_Mulheres as FLOAT)/Dep.Num_Deputados, 0), 2) as F_M FROM (SELECT Partido.Sigla, COUNT(DISTINCT idDeputado) as Num_Mulheres FROM Deputado INNER JOIN Partido ON Deputado.fk_Partido_id = Partido.idPartido WHERE Deputado.Sexo = 'F' GROUP BY Partido.Sigla) as Dep_Mulheres LEFT JOIN (SELECT Partido.Sigla, COUNT(DISTINCT idDeputado) as Num_Deputados FROM Deputado INNER JOIN Partido ON Deputado.fk_Partido_id = Partido.idPartido GROUP BY Partido.Sigla) as Dep ON Dep_Mulheres.Sigla = Dep.Sigla GROUP BY Dep_Mulheres.Sigla ORDER BY F_M DESC")
    dados = cursor.fetchall()
    connection.close()
    response = jsonify(dados)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deputadoGastoPartido', methods=['GET'])
def deputadoGastoPartido():
    connection = sqlite3.connect('database.db')
    connection.row_factory = dict_factory
    cursor = connection.cursor()
    cursor.execute("SELECT Sigla, NomeDeputado, max(Total_Gasto) as Total_Gasto FROM Partido INNER JOIN (SELECT idDeputado, NomeDeputado, fk_Partido_id, coalesce(sum(ValorLiquido), 0) as Total_Gasto FROM Deputado LEFT JOIN Gastos ON Deputado.idDeputado = Gastos.fk_Deputado_id GROUP BY idDeputado)ON fk_Partido_id = Partido.idPartido GROUP BY idPartido ORDER BY Total_Gasto")
    dados = cursor.fetchall()
    connection.close()
    response = jsonify(dados)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deputadosPartidosEventos', methods=['GET'])
def deputadosPartidosEventos():
    connection = sqlite3.connect('database.db')
    connection.row_factory = dict_factory
    res = connection.execute("SELECT idDeputado, NomeDeputado, Sigla, Num_Presencas FROM Partido INNER JOIN (SELECT idDeputado, NomeDeputado, count(DISTINCT idEvento) as Num_Presencas, fk_Partido_id FROM Deputado LEFT JOIN Frequenta ON Deputado.idDeputado = Frequenta.fk_Deputado_id LEFT JOIN Evento ON Frequenta.fk_Evento_id = Evento.idEvento GROUP BY idDeputado ORDER BY Num_Presencas DESC) ON fk_Partido_id= Partido.idPartido")
    dados = res.fetchall()
    response = jsonify(dados)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/partidosPresencas', methods=['GET'])
def partidosPresenças():
    connection = sqlite3.connect('database.db')
    connection.row_factory = dict_factory
    res = connection.execute("SELECT Sigla, sum(Num_Presencas) as Total_Presencas, count(idDeputado) as Num_Dep, round((cast(sum(Num_Presencas) as FLOAT)/count(idDeputado)), 2) as Pres_por_Dep FROM Partido INNER JOIN (SELECT idDeputado, NomeDeputado, count(DISTINCT idEvento) as Num_Presencas, fk_Partido_id FROM Deputado LEFT JOIN Frequenta ON Deputado.idDeputado = Frequenta.fk_Deputado_id LEFT JOIN Evento ON Frequenta.fk_Evento_id = Evento.idEvento GROUP BY idDeputado ORDER BY Num_Presencas) ON fk_Partido_id= Partido.idPartido GROUP BY Sigla ORDER BY Pres_por_Dep")
    dados = res.fetchall()
    response = jsonify(dados)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/dados', methods=['GET'])
def obter_dados():
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("SELECT distinct NomePartido, Logo, Sigla  FROM partido")
    dados = cursor.fetchall()
    connection.close()

    return render_template('pagina.html', dados=dados)

if __name__ == '__main__':
    app.run(threaded=True)