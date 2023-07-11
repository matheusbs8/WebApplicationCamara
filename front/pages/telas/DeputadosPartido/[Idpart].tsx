'use client'

import { useEffect, useState } from "react";
import CardDeputado from "../../components/CardDeputado";
import deputadoServices from "../../services/deputadoServices/[idDeputado]";
import { useRouter } from "next/router";
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

interface Partido {
  id:number
  sigla:string
}


export default function Home() {
    const router = useRouter()
    const [deputados, setDeputados] = useState<Deputado[]>()
    const [partido, setPartido] = useState<Partido>()
    let fui = 0
    useEffect(()=>{
      const {Idpart} = router.query
        if(Idpart){
          let part = +Idpart
          setPartido({id: part, sigla: ""})
        }
    }, [router])

    useEffect(() => {
        if (partido?.id){
          deputadoServices.obterDeputadosPartido(partido.id).then(response => {
            let dados = response?.data
            setDeputados(dados)
            if(deputados){
              fui=1
            }      
        })
        .catch(e => {
        console.log(e)
        })}}
    , [partido?.id,!deputados, fui])
    
    return (
    <div className="h-screen ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deputados?.length!=0? deputados?.map((deputado) => (
          <CardDeputado key={deputado['idDeputado']} fk_Partido_id={deputado['fk_Partido_id']} id={deputado['idDeputado']} Foto={deputado['Foto']} Sexo={deputado['Sexo']} Uf={deputado['Uf']} NomeDeputado={deputado['NomeDeputado']} Cpf={deputado['Cpf']
        }  />
        )): (<> Partido sem Representação no Congresso</>)}
      </div>
    </div>
  )
}
