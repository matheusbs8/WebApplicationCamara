'use client'

import { useRouter } from "next/navigation"

export default function Header(){
    const router = useRouter()
    return (
        <header className="bg-slate-400 text-zinc-950 h-14 flex align-center justify-end space-x-10 px-8">
            <button onClick={()=>{router.push('/telas/Deputados')}}>Deputados</button>
            <button onClick={()=>{router.push('/telas/Partidos')}}>Partidos</button>
            <button onClick={()=>{router.push('/telas/GastosPartidos')}}>Comparação de Gastos Partidos</button>
            <button onClick={()=>{router.push('/telas/MulheresEmPartidos')}}>Mulheres em partidos</button>
            <button onClick={()=>{router.push('/telas/MaioresGastosPartido')}}>Maiores Gastadores No Partido</button>
            <button onClick={()=>{router.push('/telas/PresencaPartidos')}}>Presença Partido</button>
            <button onClick={()=>{router.push('/telas/PresencaDeputado')}}>Presença Deputados</button>
        </header>
        )


    }