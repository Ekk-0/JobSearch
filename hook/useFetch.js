import { useState, useEffect } from "react";
import { Search, SearchById } from "../data/search";
import axios from "axios";

import { RAPID_API_KEY } from '@env';



const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query },
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            // const response = await axios.request
            // (options);

            // setData(response.data.data);
            switch (endpoint) {
                case 'search':
                    setData(Search());
                    break;
                case 'job-details':
                    setData(SearchById(query));
                    break;
            }


            setIsLoading(false);
        } catch (error) {
            setError(error);
            alert('There is an error');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = async () => {
        setIsLoading(true);
        fetchData();
    }


    return {
        data,
        isLoading,
        error,
        refetch
    };
}

export default useFetch;