'use client'

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import partidoService from "../../services/partidoService";

interface PartidoMulheres {
    F_M: number
    Num_Dep: number
    Num_Dep_Mulheres: number
    Sigla: string
}



export default function MulheresPartidos(){

    const [mulheres, setMulheres] = useState<PartidoMulheres[]>()

    useEffect(() => {
        partidoService.obterMulheresPartidos().then(response => {
          let dados = response?.data
          setMulheres(dados)
          console.log(mulheres)
          
    
        }).catch(e => {
            console.log(e)
          })
    }, [!mulheres])


  return (
    <div className="h-screen ">
        <h1 className="flex justify-center text-4xl mt-10 mb-10">Graficos comparando a quantidade de mulheres por partido</h1>
        <div className="flex-col justify-center">

            <h2 className="flex justify-center text-xl mt-10 mb-10">Grafico com a o percentual de mulheres / homens por partidos</h2>
            <div className="flex justify-center ">
                <div className="w-3/4 h-[500px] p-10 rounded-2xl bg-slate-900 mb-10 ">
                    <ResponsiveContainer>
                            <BarChart 
                                width={100}
                                height={10}
                                data={mulheres}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis interval={0} 
                                    style={{
                                        fontSize: '10px'
                                    }}
                                    dataKey="Sigla" 
                                    tick={{ fill: '#9882ca' }} 
                                    tickLine={{ stroke: 'white' }}/>
                                <YAxis tick={{ fill: '#9882ca' }} tickLine={{ stroke: 'white' }}/>
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="F_M" fill="#9882ca" />

                            </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <h2 className="flex justify-center text-xl mt-10 mb-10">Grafico com a quantidade de total de deputados e mulheres</h2>
            <div className="flex justify-center ">
                <div className="w-3/4 h-[500px] p-10 rounded-2xl bg-slate-900 mb-10 ">
                    <ResponsiveContainer>
                            <BarChart 
                                width={100}
                                height={10}
                                data={mulheres}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="Sigla" 
                                    style={{
                                        fontSize: '10px'
                                    }}
                                    interval={0}
                                    tick={{ fill: '#9882ca' }}
                                    tickLine={{ stroke: 'white' }}/>
                                <YAxis 
                                    tick={{ fill: '#9882ca' }} 
                                    tickLine={{ stroke: 'white' }}/>
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Num_Dep" fill="#9882ca" />
                                <Bar dataKey="Num_Dep_Mulheres" fill="#9882ca" />

                            </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>


        </div>
    </div>
  )
}
