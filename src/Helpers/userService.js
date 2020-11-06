import {useState} from "react";
import axios from "axios";

export function useUserService (url, body){
    
    const [errorLogin, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async () => {
        let authorized = false;
            if(!isLoading) {
                setIsLoading(true);
                try {
                    const options = {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        data: body,
                        url: url + "Login"
                    }
                    await axios(options)
                    .then(function (response) {
                        authorized = true;
                        setError(null);
                        setIsLoading(false);
                        localStorage.setItem('isAuthenticated', true);
                        let d = new Date();
                        d.setMinutes(d.getMinutes() + 10);
                        localStorage.setItem('expireDate', d);
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
            return authorized;
    };

    return {  errorLogin, isLoading, login };
}