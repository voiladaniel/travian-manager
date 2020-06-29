import React, { useState } from 'react';
import { useUserService } from '../Helpers/userService.js';
import { config } from '../Helpers/config.js';

export const Login = (props) => {
    const [state , setState] = useState({
        Username : "username",
        Password : ""
    });
      
    const { errorLogin, isLoading, login } = useUserService(config.accountAPI, state);
    
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let authorized = await login();

        if(authorized)
            props.history.push('/Home');

        setTimeout(() => {
            localStorage.clear();
        }, 600000);
    };
    const handleChange = (e) => {
        const {name, value} = e.target;
        setState( prevState => ({
            ...prevState,
            [name] : value
        }));
    };
    
    return(
        <>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 col-md-offset-3 Login-form">
                <center>
                    <h2>Login 1</h2>
                </center>
                <form name="form" onSubmit={handleSubmit}>
                    <div className={'form-group' + (submitted && !state.Username ? ' has-error' : '')}>
                        <label htmlFor="Username">Username</label>
                        <input type="text" className="form-control" name="Username" value={state.Username} onChange={handleChange} />
                        {submitted && !state.Username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !state.Password ? ' has-error' : '')}>
                        <label htmlFor="Password">Password</label>
                        <input type="Password" className="form-control" name="Password" value={state.Password} onChange={handleChange} />
                        {submitted && !state.Password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group text-center">
                        <button className="btn btn-primary btn-login" disabled={isLoading}>Login</button>
                        {isLoading &&
                        <>
                            <span>Loading...</span><img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        </>
                        }
                    </div>
                    {errorLogin &&
                        <div className={'alert alert-danger text-center'}>{errorLogin.message}</div>
                    }
                </form>
            </div>
        </>
    )
}
