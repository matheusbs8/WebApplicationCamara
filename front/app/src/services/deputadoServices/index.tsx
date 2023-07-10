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
};