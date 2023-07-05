from flask import Flask, render_template

from createDatabase import criar_tabela

from alocateData import inserir_registros
import sqlite3
import os
os.remove('database.db')
app = Flask(__name__)





# Criar a tabela (caso ela não exista) antes de inserir os registros
criar_tabela()

# Inserir registros na tabela
inserir_registros()




@app.route('/dados', methods=['GET'])
def obter_dados():
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM partido")
    dados = cursor.fetchall()
    connection.close()

    return render_template('pagina.html', dados=dados)

if __name__ == '__main__':
    app.run()