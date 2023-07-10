import { useRouter } from "next/navigation"

export default function Header(){
    const router = useRouter()
    return (
        <header className="bg-slate-400 text-zinc-950 h-14 flex align-center justify-end space-x-10 px-8">
            <button >Comparação</button>
            <button onClick={()=>{router.push('/telas/telaPartidos')}}>Partidos</button>
            <button>Tipos de Gastos</button>
        </header>
        )


    }