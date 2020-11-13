import {useState} from "react";
import axios from "axios";

export function useAdditionalService (url, body){
    
    const [errorAdditional, setError] = useState(null);
    const [isAdditionalLoading, setIsAdditionalLoading] = useState(false);
    const [additional, setAdditional] = useState([]);

    const getAdditionalData = async (method) => {
            if(!isAdditionalLoading) {
                setIsAdditionalLoading(true);
                try {
                    const options = {
                        method: 'GET',
                        headers: { "Content-Type": "application/json" },
                        params: body,
                        url: url + method
                    }
                    await axios(options)
                    .then(function (response) {
                        setAdditional(response.data);
                        setError(null);
                        setIsAdditionalLoading(false);
                    })
                    .catch(function(error) {
                        if (!error.status) {
                            try{
                                const {status} = error.response;
                                if(status === 401)
                                     error.message = 'Unauthorized access! Please contact the Administrator!'
                            }
                            catch{
                                setError(error);
                                setIsAdditionalLoading(false);
                            }
                            finally{
                                setError(error);
                                setIsAdditionalLoading(false);
                            }
                        }
                        else{
                            
                        }
                    });
                    
                } catch (e) {
                    setError(e);
                    setIsAdditionalLoading(false);
                    console.log(e);
                }
            }
    };

    return {  errorAdditional, isAdditionalLoading, getAdditionalData, additional, setAdditional };
}