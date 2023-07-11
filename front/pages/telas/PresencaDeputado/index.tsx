'use client'

import { useEffect, useState } from "react";
import deputadoServices from "@/pages/services/deputadoServices/[idDeputado]";

interface DepPresenca {
    idDeputado: number
    Num_Presencas: number
    Sigla: string
    NomeDeputado: string
}



export default function PresencaDeputado(){

    const [depPresencas, setDepPresenca] = useState<DepPresenca[]>()

    useEffect(() => {
        deputadoServices.deputadosPartidosEventos().then(response => {
          let dados = response?.data
          setDepPresenca(dados)
          console.log(depPresencas)
          
    
        }).catch(e => {
            console.log(e)
          })
    }, [!depPresencas])


  return (
    <div className="h-screen ">
        <h1 className="flex justify-center text-4xl mt-10 mb-10">Tabela com presença dos Deputados</h1>
        <div className="flex justify-center">
            <table className="table-fixed border-separate border-spacing-3 border-red-800 bg-slate-900 text-slate-100 rounded-2xl mb-10" >
                <thead>
                <tr>
                    <th className="w-32">Nome Deputado</th>
                    <th className="w-32">Partido</th>
                    <th className="w-32">Numero de Presenças</th>
                </tr>
                </thead>
                <tbody className="text-center">
                    {
                    depPresencas?.map((depPresenca) => (
                        <tr>
                            <td>{depPresenca?.NomeDeputado}</td>
                            <td>{depPresenca?.Sigla}</td>
                            <td>{depPresenca?.Num_Presencas}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}
