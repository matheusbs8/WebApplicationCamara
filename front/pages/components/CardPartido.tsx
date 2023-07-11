import nologo from "../Public/noImage.jpeg"
import { useRouter } from "next/navigation"

interface Partido {
    Logo: string
    NomePartido: string
    Sigla: string
    idPartido: number
    }


export default function CardPartido({Logo, NomePartido, Sigla, idPartido}:Partido){
    const router = useRouter()

    const onErrorHandler = (
        event: React.SyntheticEvent<HTMLImageElement, Event>
    ) =>{
        event.currentTarget.onerror=null
        event.currentTarget.hidden= true;
    }

    return(
    <div className="bg-gray-900 w-[30rem] h-52 text-red-50 ml-10 mt-10 mr-10 flex flex-col items-center rounded-2xl"  onClick={()=>{router.push(`DeputadosPartido/${idPartido}`)}}>
            <div className="h-24 w-24 rounded-2xl bg-white mt-3 flex items-center justify-items-center">
            <img src={Logo} onError={onErrorHandler} className="h-24 w-24 rounded-2xl"/>
            </div>
            <div className="flex flex-col items-center space-y-4 mt-2 ">
                <h1 className="text-2xl">{NomePartido}</h1>
                <h2 className="text-xl">{Sigla}</h2>     

        </div>
    </div>)
}