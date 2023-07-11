'use client'

import { PureComponent, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import partidoService from "../../services/partidoService";

interface Gasto {
    Gasto_Total: number
    Gasto_p_Deputado: number
    Num_Deputados: number
    Sigla: string
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


export default function GraficoGastos(){

    const [gasto, setGastos] = useState<Gasto[]>()

    useEffect(() => {
        partidoService.obterGastosPartidos().then(response => {
          let dados = response?.data
          setGastos(dados)
          console.log(gasto)
          
    
        }).catch(e => {
            console.log(e)
          })
    }, [!gasto])


  return (
    <div className="h-screen ">
        <h1 className="flex justify-center text-4xl mt-10 mb-10">Graficos comparando os gastos dos partidos</h1>
        <div className="flex-col justify-center">

            <h2 className="flex justify-center text-xl mt-10 mb-10">Grafico com a quantidade total de gastos por partido</h2>
            <div className="flex justify-center ">
                <div className="w-3/4 h-[500px] p-10 rounded-2xl bg-slate-900 mb-10 ">
                    <ResponsiveContainer>
                            <BarChart 
                                width={100}
                                height={10}
                                data={gasto}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 100,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="Sigla" interval={0} tick={<CustomizedAxisTick />} tickLine={{ stroke: 'white' }}/>
                                <YAxis tick={{ fill: '#82ca9d' }} tickLine={{ stroke: 'white' }}/>
                                <Tooltip />
                                <Bar dataKey="Gasto_Total" fill="#82ca9d" />

                            </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <h2 className="flex justify-center text-xl mb-10">Grafico com a quantidade total de gastos dividido por numero de deputados</h2>
            <div className="flex justify-center mb-10">
                <div className="w-3/4 h-[500px] p-10 rounded-2xl bg-slate-900 mb-10">
                    <ResponsiveContainer>
                            <BarChart 
                                width={100}
                                height={10}
                                data={gasto}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 100,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="Sigla" interval={0} tick={<CustomizedAxisTick />} tickLine={{ stroke: 'white' }}/>
                                <YAxis tick={{ fill: '#82ca9d' }} tickLine={{ stroke: 'white' }}/>
                                <Tooltip />
                                <Bar dataKey="Gasto_p_Deputado" fill="#82ca9d" />

                            </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        <div className="flex justify-center">
          <table className="table-fixed border-separate border-spacing-3 border-red-800 bg-slate-900 text-slate-100 rounded-2xl mb-10" >
            <thead>
              <tr>
                <th className="w-32">Partido</th>
                <th className="w-32">Numero Deputados</th>
                <th className="w-32">Gasto Total</th>
                <th className="w-32">Gasto por Deputado</th>
              </tr>
            </thead>
              <tbody className="text-center">
                {
                  gasto?.map((gasto) => (
                    <tr>
                      <td>{gasto.Sigla}</td>
                      <td>{gasto.Num_Deputados}</td>
                      <td>{(Math.round(gasto.Gasto_Total * 100) / 100).toFixed(2)}</td>
                      <td>{(Math.round(gasto.Gasto_p_Deputado * 100) / 100).toFixed(2)}</td>
                    </tr>
                  ))
                  }
              </tbody>
          </table>
        </div>

        

    </div>
  )
}
