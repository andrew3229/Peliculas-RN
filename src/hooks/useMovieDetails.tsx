import {useEffect, useState} from 'react';
import movieDB from '../api/movieDB';
import { MovideFull } from '../interfaces/movieInterface';
import { CreditsResponse, Cast } from '../interfaces/creditsInterface';

interface MovideDetail{
    isLoading:boolean;
    movideFull?: MovideFull;
    cast: Cast[];

}
export const useMovieDetails = (movideId:number) => {
    const [state, setState] = useState<MovideDetail>({
        isLoading:true,
        movideFull:undefined,
        cast: []
    });

    const getMovideDetail = async ()  => {

        const movieDetailsPromise = movieDB.get<MovideFull>(`/${movideId}`);
        const castResponse = movieDB.get<CreditsResponse>(`/${movideId}/credits`);

        const [movieDetailsResponse, castPromiseResponse]= await Promise.all([movieDetailsPromise,castResponse]);
        setState({
            isLoading:false,
            movideFull: movieDetailsResponse.data,
            cast: castPromiseResponse.data.cast
        })
    }
    
    useEffect(() => {
        getMovideDetail();
    }, []);

    return {
        ...state
    }
}   
