
export default{
    async obterPartido(id: number){
        try {
            const response = api.get(`/partido/${id}`);
            return response;
        } catch (e) {
            console.log(e);
        }
    },
    async obterPartidos(){
        try{
            const response = api.get(`/partidos`);
            return response;
        }
        catch (e){
            console.log(e);
        }
    },

    async obterGastosPartidos(){
        try{
            const response = api.get(`/partidoGastos`);
            return response;
        }
        catch (e){
            console.log(e);
        }
    },
    async obterMulheresPartidos(){
        try{
            const response = api.get(`/mulheresPartidos`);
            return response;
        }
        catch (e){
            console.log(e);
        }
    },
};