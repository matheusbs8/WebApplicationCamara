'use client'


import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import partidoService from "../../services/partidoService";
import CardPartido from "../../components/CardPartido";

interface Partido {
    Logo: string
    NomePartido: string
    Sigla: string
    idPartido: number
  }


export default function Parties(){
    const [partidos, setPartidos] = useState<Partido[]>()
    useEffect(()=>{

        partidoService.obterPartidos().then(response =>{
            let dados = response?.data;
            //console.log(dados);
            setPartidos(dados);
            console.log(partidos)
        }).catch(e=>{console.log(e)})
    }, [!partidos])

    
    return(
        <>
        <Header/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partidos?.map((partido)=>{
            return(<CardPartido Logo={partido.Logo} NomePartido={partido.NomePartido} Sigla={partido.Sigla} idPartido={partido.idPartido}/>)
        })}
        </div>
        </>
    )
}