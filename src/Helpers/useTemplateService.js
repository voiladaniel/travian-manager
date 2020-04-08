import {useState} from "react";
import axios from "axios";

export function useTemplateService (url, body){
    
    const [errorLogin, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [attackers, setAttackers] = useState([]);

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
                    await axios(options)
                    .then(function (response) {
                        setAttackers(response.data);
                        setError(null);
                        setIsLoading(false);
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

    return {  errorLogin, isLoading, getData, attackers };
}