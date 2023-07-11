'use client'

import { PureComponent, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import partidoService from "../../services/partidoService";

interface Deputado {
    NomeDeputado: string
    Sigla: string
    Total_Gasto: number
}

interface Deputado2 {
  NomeDeputadoSigla: string
  Total_Gasto: number
}

class CustomizedAxisTickSigla extends PureComponent {
  render() {
    const { x, y, payload } : any = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={400} y={5} dy={0} textAnchor="end" fill="#82ca9d" transform="rotate(-90)">
          {payload.value}
        </text>
      </g>
    );
  }
}

class CustomizedAxisTick extends PureComponent {
    render() {
      const { x, y, payload } : any = this.props;
  
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={5} dy={0} textAnchor="end" fill="#82ca9d" transform="rotate(-90)">
            {payload.value}
          </text>
        </g>
      );
    }
}


export default function GastadoresPartidos(){

  const [gastadores, setGastadores] = useState<Deputado[]>()
  const [gastadores2, setGastadores2] = useState<Deputado2[]>()

  useEffect(() => {
      partidoService.deputadoGastoPartido().then(response => {
        let dados = response?.data
        setGastadores(dados)
        console.log(gastadores)
  
      }).catch(e => {
          console.log(e)
        })
  }, [!gastadores])

  function transforma() {
    let deputados: Deputado2[] = []

    gastadores?.map((gastador) => {
      const dep = {
        NomeDeputadoSigla: gastador.NomeDeputado + ' - ' + gastador.Sigla,
        Total_Gasto: gastador.Total_Gasto
      }
      deputados.push(dep)
    })

    return deputados
  }

  return (
    <div className="h-screen ">
        <h1 className="flex justify-center text-4xl mt-10 mb-10">Graficos com o deputado com o maior gasto no partido</h1>
        <div className="flex-col justify-center">
            <div className="flex justify-center ">
                <div className="w-3/4 h-[700px] p-10 rounded-2xl bg-slate-900 mb-10 ">
                    <ResponsiveContainer >
                        <BarChart 
                            width={100}
                            height={10}
                            data={transforma()}
                            margin={{
                                top: 90,
                                right: 30,
                                left: 20,
                                bottom: 160,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis interval={0} 
                                dataKey={"NomeDeputadoSigla"} 
                                tick={<CustomizedAxisTick />}
                                tickLine={{ stroke: 'white' }}
                            />
                            
                            <YAxis tick={{ fill: '#82ca9d' }} tickLine={{ stroke: 'white' }}/>
                            <Tooltip />
                            <Bar dataKey="Total_Gasto" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    </div>
  )
}
