import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faBolt } from '@fortawesome/free-solid-svg-icons'
import { useHistory  } from 'react-router-dom';
import { AttackTemplateModal } from '../Helpers/AttackTemplateModal.js'
import { config } from '../Helpers/config.js';
import axios from "axios";
import { useTemplateService } from '../Helpers/useTemplateService.js'

export const Attack = () => {
    const history = useHistory();

    const [plansParam, setPlansParam] = useState({
        PlanID: 0,
        Name: "",
        UserID: localStorage.getItem('userID'),
        Refresh: 0
    });

    const [attackTemplateData, setAttackTemplateData] = useState({
        name: "",
        password: ""
    });

    const goToTemplate = (planID) => {
        history.push('/Attack/' + planID);
    }

    const [isShowingAttackTemplateModal, setIsShowingAttackTemplateModal] = useState(false);
    const [isLoadingAttackTemplateModal, setIsLoadingAttackTemplateModal] = useState(false);

    //API Parameters
    const { errorLogin, isLoading, getData, attackers } = useTemplateService(config.planAPI, plansParam);

    const openAttackTemplateModal = (e) => {
        setAttackTemplateData(prev => ({
            ...prev,
            name: "",
            password: ""
        }))

        setIsShowingAttackTemplateModal(true);
    }
    
    function closeAttackTemplateModal() {
        setIsShowingAttackTemplateModal(!isShowingAttackTemplateModal);
    }

    const handleChangeAttackTemplateModal = (e) => {
        const { name, value } = e.target;

        setAttackTemplateData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitAttackTemplate = async (e) => {
        e.preventDefault();
        addAttackPlan(config.planAPI, "AddPlan");
    };

    const addAttackPlan = (url, method) => {
        setIsLoadingAttackTemplateModal(true);
        try {
            const options = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                data: {
                    UserID: localStorage.getItem('userID'),
                    Name: attackTemplateData.name,
                    Password: attackTemplateData.password
                },
                url: url + method
            }
            const result = axios(options)
                .then(function (response) {
                    setIsShowingAttackTemplateModal(false);
                    setIsLoadingAttackTemplateModal(false);
                    setPlansParam(prevState => ({
                        ...prevState,
                        Refresh: Math.random()
                    }));
                })
                .catch(function (error) {
                    if (!error.status) {
                        try {
                            const { status } = error.response;
                            if (status == 401)
                                error.message = 'Unauthorized access! Please contact the Administrator!'
                        }
                        catch{
                        }
                        finally {
                        }
                    }
                    else {

                    }
                });

        } catch (e) {
            console.log(e);
        }
    };

        //load data
    useEffect(() => {
        const fetchData = async () => {
            getData("GetPlans");
        }
        fetchData();
    }, [plansParam])

    return(
        <>
            <div className="container">
                <AttackTemplateModal
                 show={isShowingAttackTemplateModal}
                 handleClose={closeAttackTemplateModal}
                 attackTemplateData={attackTemplateData}
                 handleChange={handleChangeAttackTemplateModal}
                 submitHandler={handleSubmitAttackTemplate}
                 isLoading={isLoadingAttackTemplateModal}
                />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="view-header">
                            <div className="header-title">
                                <h3>
                                    <FontAwesomeIcon icon={faBolt}/> 
                                    &nbsp; Attack planner
                                </h3>
                                <small>
                                    Travian attack planner
                                </small>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 text-center custom-div-button" onClick={openAttackTemplateModal}>
                    <h2>
                        New Attack Plan
                    </h2>
                </div>
              </div>
              <div className="row">
              {!isLoading && attackers.length ?
                        attackers.map(item => (
                            <div className="col-lg-2 col-md-2 text-center custom-div-template  use-pointer"  key={item.planID}  onClick={() => goToTemplate(item.planID)}>
                                <h2>
                                    {item.name}
                                </h2>
                            </div>
                        )) : !attackers.length && !isLoading ? 
                            <div>
                                No Data!
                            </div> 
                            :   <div className="loading-div">
                                    <h3>Loading data... </h3><img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                </div>
                }
                </div>
            </div>
        </>
    )
}