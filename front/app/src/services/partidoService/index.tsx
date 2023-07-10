import api from "../api";


export default{
    async obterPartido(id: number){
        try {
            const response = api.get(`/partido/${id}`);
            return response;
        } catch (e) {
            console.log(e);
        }
    },
};