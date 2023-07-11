
export default{
    async obterDeputados(){
        try {
            const response = api.get('/deputados',);
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

};