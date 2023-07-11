'use client'

import { useEffect, useState } from "react";
import CardDeputado from "../../components/CardDeputado";
import deputadoServices from "../../services/deputadoServices/[idDeputado]";
import Header from "../../components/Header";
import { type } from "os";
import { data } from "autoprefixer";
import Link from "next/link";

interface Deputado {
  Cpf: string
  Foto: string
  NomeDeputado: string
  Sexo: string
  Uf: string
  fk_Partido_id: number
  idDeputado: number
}


export default function Home() {

  const [deputados, setDeputados] = useState<Deputado[]>([])

  useEffect(() => {
      deputadoServices.obterDeputados().then(response => {
        let dados = response?.data
        setDeputados(dados)      
      })
      .catch(e => {
        console.log(e)
      })
  }, [!deputados])
    
  return (
    <div className="h-screen ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      
        {deputados?.map((deputado) => (
          <CardDeputado key={deputado['idDeputado']} fk_Partido_id={deputado['fk_Partido_id']} id={deputado['idDeputado']} Foto={deputado['Foto']} Sexo={deputado['Sexo']} Uf={deputado['Uf']} NomeDeputado={deputado['NomeDeputado']} Cpf={deputado['Cpf']}  />
        ))}

      </div>
    </div>
  )
}
