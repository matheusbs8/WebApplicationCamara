export default function Home() {

    return(
        <div className="">
            <div className=" h-32  mt-10 flex items-center justify-center bg-slate-700">
                <h1 className="text-slate-100 text-4xl text-center">Comparação de Partidos e Deputados da Câmara</h1>
            </div>
            <div className=" h-32  mt-10 flex items-center justify-center flex-col bg-slate-700">
                <h2 className="mb-5 text-slate-100 text-2xl text-center">Motivação</h2>
                <text className="text-slate-100 text-xl text-center">Buscamos trazer uma visão simplificada dos dados presentes no https://dadosabertos.camara.leg.br/, utilizando graficos para comparar as cartacteristicas dos deputados e dos partidos.</text>
            </div>
            <div className=" h-56  mt-10 flex items-center justify-center flex-col bg-slate-700">
                <h2 className="mb-5 text-slate-100 text-2xl text-center">Tecnologias Utilizadas</h2>
                <div className="flex gap-9" >
                    <img className="w-48" src="https://flask.palletsprojects.com/en/2.3.x/_images/flask-horizontal.png"/>
                    <img className="w-48" src="https://www.python.org/static/img/python-logo@2x.png"/>
                    <img className="w-32" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"/>
                </div>
            </div>

        </div>
    )
}