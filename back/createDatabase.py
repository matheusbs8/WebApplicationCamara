import sqlite3

def criar_tabela():
    conexao = sqlite3.connect('database.db')

    cursor = conexao.cursor()

    with open('script.sql', 'r') as arquivo:
        script_sql = arquivo.read()
        cursor.executescript(script_sql)

    conexao.commit()
    conexao.close()

