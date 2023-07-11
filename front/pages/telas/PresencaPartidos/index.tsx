'use client'

import { PureComponent, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import partidoService from "../../services/partidoService";

interface Presenca {
    Num_Dep: number
    Pres_por_Dep: string
    Sigla: string
    Total_Presencas: number
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


export default function PresencasPartidos(){

    const [presencas, setPresencas] = useState<Presenca[]>()

    useEffect(() => {
        partidoService.partidosPresencas().then(response => {
          let dados = response?.data
          setPresencas(dados)
          console.log(presencas)
          
    
        }).catch(e => {
            console.log(e)
          })
    }, [!presencas])


  return (
    <div className="h-screen ">
        <h1 className="flex justify-center text-4xl mt-10 mb-10">Graficos comparando a presença dos deputados por partido em eventos</h1>
        <div className="flex-col justify-center">

          <h2 className="flex justify-center text-xl mt-10 mb-10">Grafico com a presença total do partido dividido pela quantidade de deputados</h2>
          <div className="flex justify-center ">
              <div className="w-3/4 h-[700px] p-10 rounded-2xl bg-slate-900 mb-10 ">
                  <ResponsiveContainer >
                      <BarChart 
                          width={100}
                          height={10}
                          data={presencas}
                          margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 160,
                          }}
                      >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis interval={0} 
                              dataKey="Sigla" 
                              tick={<CustomizedAxisTick />}
                              tickLine={{ stroke: 'white' }}
                          />
                          <YAxis tick={{ fill: '#82ca9d' }} tickLine={{ stroke: 'white' }}/>
                          <Tooltip />
                          <Bar dataKey="Pres_por_Dep" fill="#82ca9d" />
                      </BarChart>
                  </ResponsiveContainer>
              </div>
          </div>

          <h2 className="flex justify-center text-xl mt-10 mb-10">Grafico com a quantidade total de presença</h2>
          <div className="flex justify-center ">
              <div className="w-3/4 h-[700px] p-10 rounded-2xl bg-slate-900 mb-10 ">
                  <ResponsiveContainer >
                      <BarChart 
                          width={100}
                          height={10}
                          data={presencas}
                          margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 160,
                          }}
                      >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis interval={0} 
                              dataKey="Sigla" 
                              tick={<CustomizedAxisTick />}
                              tickLine={{ stroke: 'white' }}
                          />
                          <YAxis tick={{ fill: '#82ca9d' }} tickLine={{ stroke: 'white' }}/>
                          <Tooltip />
                          <Bar dataKey="Total_Presencas" fill="#82ca9d" />
                      </BarChart>
                  </ResponsiveContainer>
              </div>
          </div>

        </div>
    </div>
  )
}
