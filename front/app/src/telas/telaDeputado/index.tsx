'use client'

import { useEffect, useState } from "react";
import deputadoServices from "../../services/deputadoServices";


interface Deputado {
  Cpf: string
  Foto: string
  NomeDeputado: string
  Sexo: string
  Uf: string
  Sigla: string
  fk_Partido_id: number
  id: number
}

interface Gasto {
  Tipo: string
  ValorLiquido: number
  ano: number
  mes: number
}


export default function Deputado({Cpf, Foto, NomeDeputado, Sexo, Uf, Sigla, fk_Partido_id, id}: Deputado) {

  const [gastos, setGastos] = useState<Gasto[]>([])
  const [gastoTotal, setGastoTotal] = useState<number>(0)

  useEffect(() => {
      deputadoServices.obterGastosDeputado(id).then(response => {
        let dados = response?.data
        setGastos(dados)
        var soma : number = 0
        gastos.map((gasto) => (
        soma = soma + gasto.ValorLiquido
      ))
      setGastoTotal(soma)
      console.log(soma)
      })
      .catch(e => {
        console.log(e)
      })
  
  }, [gastos.length > 1])

  


  return (
    <div className="h-screen ">
        <div className="bg-gray-900 text-slate-100 flex m-10 rounded-2xl" >
            <img src={Foto} className="rounded-l-2xl"/>
            <div className="ml-5 mt-5">
                <h1 className="text-6xl mb-3">Nome: {NomeDeputado}</h1>
                <h2 className="text-2xl mb-3">CPF: {Cpf}</h2>
                <h2 className="text-2xl mb-3">Sexo: {Sexo}</h2>
                <h2 className="text-2xl mb-3">Estado: {Uf}</h2>
                <h2 className="text-2xl mb-3">Partido: {Sigla} </h2>
                <h2 className="text-2xl mb-3">Gastos: {(Math.round(gastoTotal * 100) / 100).toFixed(2)}</h2>
            </div>
        </div>

        <div className="flex justify-center">
          <table className="table-fixed border-separate border-spacing-3 border-red-800 bg-slate-900 text-slate-100 rounded-2xl mb-10" >
            <thead>
              <tr>
                <th className="w-96">Tipo</th>
                <th className="w-32">Mes</th>
                <th className="w-32">Ano</th>
                <th className="w-32">Valor</th>
              </tr>
            </thead>
              <tbody className="text-center">
                {
                  gastos?.map((gasto) => (
                    <tr>
                      <td>{gasto.Tipo}</td>
                      <td>{gasto.mes}</td>
                      <td>{gasto.ano}</td>
                      <td>{gasto.ValorLiquido}</td>
                    </tr>
                  ))
                }
              </tbody>
          </table>
        </div>
    </div>
  )
}
