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
        <div className="bg-zinc-950 w-96 h-96">
            <img src={dep.Foto}/>
            <div className="">
                <h1>{dep.NomeDeputado}</h1>
                <h2>{dep.Cpf}</h2>
                <h2>{dep.Sexo}</h2>
                <h2>{dep.Uf}</h2>
                <h2>Partido: </h2>
                <h2>Gastos: </h2>
            </div>
        </div>

      
    </div>
  )
}
