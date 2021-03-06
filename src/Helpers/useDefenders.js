import {useState, useEffect} from "react";
import axios from "axios";

export function useDefenders (url, body){
    
    const [errorLogin, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [defenders, setDefenders] = useState([]);

    const getData = async (method) => {
            if(!isLoading) {
                setIsLoading(true);
                try {
                    const options = {
                        method: 'GET',
                        headers: { "Content-Type": "application/json" },
                        params: body,
                        url: url + method
                    }
                    const result = await axios(options)
                    .then(function (response) {
                        setDefenders(response.data);
                        setError(null);
                        setIsLoading(false);
                    })
                    .catch(function(error) {
                        if (!error.status) {
                            try{
                                const {status} = error.response;
                                if(status == 401)
                                     error.message = 'Unauthorized access! Please contact the Administrator!'
                            }
                            catch{
                                setError(error);
                                setIsLoading(false);
                            }
                            finally{
                                setError(error);
                                setIsLoading(false);
                            }
                        }
                        else{
                            
                        }
                    });
                    
                } catch (e) {
                    setError(e);
                    setIsLoading(false);
                    console.log(e);
                }
            }
    };

    return {  errorLogin, isLoading, getData, defenders };
}