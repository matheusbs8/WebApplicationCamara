'use client'

import partidoService from "../services/partidoService"
import { url } from "inspector"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Deputado {
    Cpf: string
    Foto: string
    NomeDeputado: string
    Sexo: string
    Uf: string
    fk_Partido_id: number
    id: number
  }
  

function CardDeputado({Foto, NomeDeputado, Sexo, Uf, fk_Partido_id, id, Cpf }:Deputado) {
    
  const router = useRouter()

  const [sigla, setSigla] = useState<string>()


  useEffect(() => {
      partidoService.obterPartido(fk_Partido_id).then(response => {
        let dados = response?.data[0].Sigla
        //console.log(dados)
        setSigla(dados)
        //console.log(sigla)

      })
      .catch(e => {
        console.log(e)
      })
  
  }, [])


  return(
      <div onClick={()=>{router.push(`Deputado/${id}`)}} className="bg-gray-900 w-96 h-58 text-red-50 ml-10 mt-10 flex align-center rounded-2xl">
          <img src={Foto} className="h-44 rounded-l-2xl ml"/>
          <div className="flex-1 flex-col space-y-4 mt-2 ml-2">
              <h1 className="text-2xl">{NomeDeputado}</h1>
              <h2 className="text-xl">Estado: {Uf}</h2>
              <h2 className="text-xl">Partido: {sigla}</h2>
              <h2 className="text-xl">Sexo: {Sexo}</h2>
          </div>
      </div>

  )

}

export default CardDeputado