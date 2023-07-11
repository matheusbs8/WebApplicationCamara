

import deputadoServices from "@/pages/services/deputadoServices/[idDeputado]";
import partidoService from "@/pages/services/partidoService";
import { useRouter } from "next/router";
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

interface Gasto {
  Tipo: string
  ValorLiquido: number
  ano: number
  mes: number
}


export default function Deputado() {
  const router = useRouter()

  const [deputadoId, setDeputadoId] = useState<number>()
  const [deputado, setDeputado] = useState<Deputado>()
  const [sigla, setSigla] = useState<string>()
  const [gastos, setGastos] = useState<Gasto[]>([])
  const [gastoVisibilidade, setGastoVisibilidade] = useState(false)
  const [gastoTotal, setGastoTotal] = useState<number>(0)
  
  useEffect(() => {
    const {idDeputado} = router.query
    if (idDeputado){
      let DeputadoId = +idDeputado
      setDeputadoId(DeputadoId)
    }
    
  }, [router])

  useEffect(() => {
    if (deputadoId){
      deputadoServices.obterGastosDeputado(deputadoId).then(response => {
        let dados = response?.data
        setGastos(dados)
        var soma : number = 0
        gastos.map((gasto) => (
        soma = soma + gasto.ValorLiquido
      ))
      setGastoTotal(soma)
      setGastoVisibilidade(true)
      })
      .catch(e => {
        console.log(e)
      })
    }
  })
  
  useEffect(() => {
    if (deputadoId){
      deputadoServices.obterDeputado(deputadoId).then(response => {
        let dados = response?.data
        setDeputado(dados)
      }).catch(e => {
        console.log(e)
      })
    }
  } )
  
  /*
  useEffect(() => {
    if (deputado?.[0][6]){
      partidoService.obterPartido(deputado?.[0][6]).then(response => {
        let dados = response?.data[0].Sigla
        setSigla(dados)
        console.log(deputado)
  
      })
      .catch(e => {
        console.log(e)
      })
    }
  })

  
  */

  return (
    <div className="h-screen ">
        <div className="bg-slate-600 flex m-10 rounded-2xl" >
            {/*<img src={} className="rounded-l-2xl"/>*/}
            <div className="ml-5 mt-5">
                <h1 className="text-6xl mb-3">Nome: {deputado?.NomeDeputado}</h1>
                <h2 className="text-2xl mb-3">CPF: {}</h2>
                <h2 className="text-2xl mb-3">Sexo: {}</h2>
                <h2 className="text-2xl mb-3">Estado: {}</h2>
                <h2 className="text-2xl mb-3">Partido: {sigla}</h2>
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
                {gastoVisibilidade &&
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
