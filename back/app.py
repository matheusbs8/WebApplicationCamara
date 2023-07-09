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
    cursor = connection.cursor()
    cursor.execute("SELECT Sigla FROM Partido WHERE idPartido = ?", (id,))
    dados = cursor.fetchall()
    connection.close()
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
    



@app.route('/dados', methods=['GET'])
def obter_dados():
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("SELECT distinct NomePartido, Logo, Sigla  FROM partido")
    dados = cursor.fetchall()
    connection.close()

    return render_template('pagina.html', dados=dados)

if __name__ == '__main__':
    app.run()