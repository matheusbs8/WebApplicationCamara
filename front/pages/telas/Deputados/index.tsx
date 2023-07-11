'use client'

import { useEffect, useState } from "react";
import CardDeputado from "../../components/CardDeputado";
import deputadoServices from "../../services/deputadoServices/[idDeputado]";


interface Deputado {
  Cpf: string
  Foto: string
  NomeDeputado: string
  Sexo: string
  Uf: string
  fk_Partido_id: number
  idDeputado: number
}


export default function Deputados() {

  const [deputados, setDeputados] = useState<Deputado[]>([])
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
      deputadoServices.obterDeputados().then(response => {
        let dados = response?.data
        setDeputados(dados)      
      })
      .catch(e => {
        console.log(e)
      })
  }, [!deputados])

  const handleChange = (event: any) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };
    
  return (
    <div className="h-screen ">
      <div className="flex justify-center">
        <div className="w-3/4 mt-10">
          <input type="text" id="deputado" 
          className="bg-slate-800 border border-gray-300 text-slate-100 text-sm rounded-lg block w-full p-2.5" 
            placeholder="Busque um deputado" 
            onChange={handleChange}
            value={searchValue}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      
        {deputados?.filter((deputados) => (
          deputados.NomeDeputado.toLowerCase().includes(searchValue.toLowerCase())
        )).map((deputado) => (
          <CardDeputado key={deputado['idDeputado']} fk_Partido_id={deputado['fk_Partido_id']} id={deputado['idDeputado']} Foto={deputado['Foto']} Sexo={deputado['Sexo']} Uf={deputado['Uf']} NomeDeputado={deputado['NomeDeputado']} Cpf={deputado['Cpf']}  />
        ))}

      </div>
    </div>
  )
}
