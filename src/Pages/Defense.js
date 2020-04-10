import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { useHistory  } from 'react-router-dom';

export const Defense = () => {
    const history = useHistory();

    const goToTemplate = () => {
        history.push('/Defense/1');
    }
    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="view-header">
                            <div className="header-title">
                                <h3>
                                    <FontAwesomeIcon icon={faBookOpen}/> 
                                    &nbsp; Attack & Defense planner
                                </h3>
                                <small>
                                    Travian
                                </small>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 text-center custom-div-button">
                    <h2>
                        Create Template
                    </h2>
                </div>
                <div className="col-lg-6 col-md-6 text-center custom-div-button">
                    <h2>
                        Share Template
                    </h2>
                </div>
              </div>
              <div className="row">
                    <div className="col-lg-2 col-md-2 text-center custom-div-template  use-pointer"  onClick={ goToTemplate }>
                        <h2>
                            ro2 2020
                        </h2>
                    </div>
              </div>
            </div>
        </>
    )
}