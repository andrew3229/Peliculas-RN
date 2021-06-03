import axios from "axios";


const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params:{
        api_key:'56513e9105ba348a45b4f960046235fe',
        language: 'es-ES'
    }
});


export default movieDB;