import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { useHistory  } from 'react-router-dom';
import { config } from '../Helpers/config.js';
import axios from "axios";
import { useTemplateService } from '../Helpers/useTemplateService.js'
import { DefenseTemplateModal } from '../Helpers/DefenseTemplateModal.js'
import { DeleteModal } from '../Helpers/DeleteModal.js';

export const Defense = () => {
    const history = useHistory();
    
    const [defensePlansParam, setDefensePlansParam] = useState({
        TemplateID: 0,
        Name: "",
        UserID: localStorage.getItem('userID')
    });

    const [defenseTemplateData, setDefenseTemplateData] = useState({
        name: ""
    });
    const [deleteData, setDeleteData] = useState({
        planID: 0,
        name: ""
    });

    const [isShowingDefenseTemplateModal, setIsShowingDefenseTemplateModal] = useState(false);
    const [isLoadingDefenseTemplateModal, setIsLoadingDefenseTemplateModal] = useState(false);
    const [isLoadingDeleteModal, setIsLoadingDeleteModal] = useState(false);
    const [isShowingDeleteModal, setIsShowingDeleteModal] = useState(false);

    function closeDefenseTemplateModal() {
        setIsShowingDefenseTemplateModal(!isShowingDefenseTemplateModal);
    }
    function closeDeleteModal() {
        setIsShowingDeleteModal(!isShowingDeleteModal);
    }

    const handleChangeDefenseTemplateModal = (e) => {
        const { name, value } = e.target;

        setDefenseTemplateData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitDefenseTemplate = async (e) => {
        e.preventDefault();
        addDefensePlan(config.templateAPI, "AddPlan");
    };

    const handleSubmitDelete = async (e) => {
        e.preventDefault();
        deleteDefensePlan(config.templateAPI, "DeletePlan");
    };

    const openDefenseTemplateModal = (e) => {
        setDefenseTemplateData(prev => ({
            ...prev,
            name: ""
        }))

        setIsShowingDefenseTemplateModal(true);
    }

    const addDefensePlan = (url, method) => {
        setIsLoadingDefenseTemplateModal(true);
        try {
            const options = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                data: {
                    UserID: localStorage.getItem('userID'),
                    Name: defenseTemplateData.name
                },
                url: url + method
            }
            const result = axios(options)
                .then(function (response) {
                    setIsShowingDefenseTemplateModal(false);
                    setIsLoadingDefenseTemplateModal(false);
                    var myData = [...attackers];
                    myData.push(response.data);
                    setAttackers(myData);
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

    const deleteDefensePlan = (url, method) => {
        setIsLoadingDeleteModal(true);
        try {
            const options = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                data: {
                    TemplateID: deleteData.planID
                },
                url: url + method
            }
            const result = axios(options)
                .then(function (response) {
                    setIsShowingDeleteModal(false);
                    setIsLoadingDeleteModal(false);
                    var myData = [...attackers];
                    var plans = myData
                     .filter(attacker => attacker.templateID != deleteData.planID);
                    
                     setAttackers(plans);
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

    //API Parameters
    const { errorLogin, isLoading, getData, attackers, setAttackers  } = useTemplateService(config.templateAPI, defensePlansParam);

    const goToTemplate = (planID) => {
        history.push('/Defense/' + planID);
    }

    const goToDelete = (plan) => {
        setDeleteData(prev => ({
            ...prev,
            planID: plan.templateID,
            name: plan.name
        }))

        setIsShowingDeleteModal(true);
    }

     //load defense plans
     useEffect(() => {
        const fetchData = async () => {
            getData("GetDefensePlans");
        }
        fetchData();
    }, [defensePlansParam])

    return(
        <>
            <div className="container">
                 <DefenseTemplateModal
                 show={isShowingDefenseTemplateModal}
                 handleClose={closeDefenseTemplateModal}
                 defenseTemplateData={defenseTemplateData}
                 handleChange={handleChangeDefenseTemplateModal}
                 submitHandler={handleSubmitDefenseTemplate}
                 isLoading={isLoadingDefenseTemplateModal}
                />
                <DeleteModal
                 show={isShowingDeleteModal}
                 handleClose={closeDeleteModal}
                 data={deleteData}
                 submitHandler={handleSubmitDelete}
                 isLoading={isLoadingDeleteModal}
                />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="view-header">
                            <div className="header-title">
                                <h3>
                                    <FontAwesomeIcon icon={faBookOpen}/> 
                                    &nbsp; Defense planner
                                </h3>
                                <small>
                                    Travian defense planner
                                </small>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 text-center custom-div-button" onClick={openDefenseTemplateModal}>
                    <h2>
                        New Defense Plan
                    </h2>
                </div>
              </div>
              <div className="row">
                {!isLoading && attackers.length ?
                            attackers.map(item => (
                                <div key={item.templateID} className="col-lg-2 col-md-2 text-center custom-div-template  use-pointer">
                                    <div className="custom-div-div-template" onClick={() => goToTemplate(item.templateID)}>
                                        <h2>
                                            {item.name}
                                        </h2>
                                    </div>
                                    <div className ="delete-plan-button" onClick={() => goToDelete(item)}>x</div>
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