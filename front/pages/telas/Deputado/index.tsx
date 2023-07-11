'use client'

import { useEffect, useState } from "react";

interface Deputado {
  Cpf: string
  Foto: string
  NomeDeputado: string
  Sexo: string
  Uf: string
  fk_Partido_id: number
  id: number
}


export default function Deputado() {

  const [deputado, setDeputado] = useState<Deputado>()

  /*
  useEffect(() => {
      deputadoServices.obterDeputado().then(response => {
        let dados = response?.data
        setDeputado(dados)


      })
      .catch(e => {
        console.log(e)
      })
  
  }, [!deputado])
  */

  let dep: Deputado = {
    Cpf:'12345678911',
    NomeDeputado: 'Antonio',
    Foto: 'https://www.camara.leg.br/internet/deputado/bandep/220593.jpg',
    Sexo: 'M',
    Uf: 'RJ',
    fk_Partido_id: 12,
    id: 1
  }

  return (
    <div className="h-screen ">
        <div className="bg-slate-600 flex m-10 rounded-2xl" >
            <img src={dep.Foto} className="rounded-l-2xl"/>
            <div className="ml-5 mt-5">
                <h1 className="text-6xl mb-3">Nome: {dep.NomeDeputado}</h1>
                <h2 className="text-2xl mb-3">CPF: {dep.Cpf}</h2>
                <h2 className="text-2xl mb-3">Sexo: {dep.Sexo}</h2>
                <h2 className="text-2xl mb-3">Estado: {dep.Uf}</h2>
                <h2 className="text-2xl mb-3">Partido: </h2>
                <h2 className="text-2xl mb-3">Gastos: </h2>
            </div>
        </div>

        <table className="table-auto">
          <thead>
            <tr>
              <th>Data</th>
              <th>Local</th>
              <th>Descrição</th>
            </tr>
          </thead>
            <tbody>
              <tr>
                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td>Malcolm Lockyer</td>
                <td>1961</td>
              </tr>
            </tbody>
        </table>
    </div>
  )
}
