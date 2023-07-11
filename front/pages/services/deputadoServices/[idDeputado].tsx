import api from "../api";


export default{
    async obterDeputados(){
        try {
            const response = api.get('/deputados',);
            return response;
        } catch (e) {
            console.log(e);
        }
    },
    async obterDeputadosPartido(idPart: number){
        try {
            const response = api.get(`/deputadosPartido/${idPart}`,);
            return response;
        } catch (e) {
            console.log(e);
        }
    },
    async obterDeputado(id: number){
        try {
            const response = api.get(`/deputado/${id}`,);
            return response;
        } catch (e) {
            console.log(e);
        }
    },
    async obterGastosDeputado(id: number){
        try {
            const response = api.get(`/gastosDeputado/${id}`);
            return response;
        } catch (e) {
            console.log(e);
        }
    },
    async obterGastoTotalDeputado(id: number){
        try {
            const response = api.get(`/gastoTotalDeputado/${id}`);
            return response;
        } catch (e) {
            console.log(e);
        }
    },
    async deputadosPartidosEventos(){
        try{
            const response = api.get(`/deputadosPartidosEventos`);
            return response;
        }
        catch (e){
            console.log(e);
        }
    },
    
};