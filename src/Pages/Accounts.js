import React, { useState, useEffect } from 'react';
import { useTemplateService } from '../Helpers/useTemplateService.js'
import { config } from '../Helpers/config.js'
import { DefenderModal } from '../Helpers/DefenderModal.js'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faWrench, faShieldAlt, faTrashAlt, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import 'w3-css/w3.css';
import img_defender from '../Images/img_defender.png'

export const Accounts = () => {
    const [defendersParam, setDefendersParam] = useState({
        TemplateId: "1",
        UserID: "1",
        Refresh: 0
    });
    
    const [defenderData, setDefenderData] = useState({
        name: "",
        arrivalTime: "",
        xCoord: "",
        yCoord: "",
        realName: "",
        spySpeed: 9,
        tournamentSquare: 0
    });

    const [defenderBody, setDefenderBody] = useState({
        TemplateId: 1,
        AttackerID: 0,
        AccountID: 0,
        ArrivingTime: ""
    });

    const [isLoadingDefenders, setIsLoadingDefenders] = useState(false);
    const [isShowingDeffenderModal, setIsShowingDeffenderModal] = useState(false);
    const [isLoadingDeffenderModal, setIsLoadingDeffenderModal] = useState(false);

    //API Parameters
    const { errorLogin, isLoading, getData, attackers } = useTemplateService(config.templateAPI, defendersParam);

    //load data
    useEffect(() => {
        const fetchData = async () => {
            getData("GetDefenders");
        }
        fetchData();
    }, [defendersParam])

    function closeDefenderModal() {
        setIsShowingDeffenderModal(!isShowingDeffenderModal);
    }

    const openDefenderModal = (e) => {
        const accountID = e.accountID;
        let defender = attackers.filter(x => x.accountID === parseInt(accountID));
        setDefenderData(prev => ({
            ...prev,
            xCoord: defender[0].xCoord,
            yCoord: defender[0].yCoord,
            name: accountID,
            realName: defender[0].name,
            arrivalTime: "",
        }))
        setIsShowingDeffenderModal(true);
    }
    
    const handleChangeDefenderModal = (e) => {
        const { name, value } = e.target;
        setDefenderData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitDefender = async (e) => {
        e.preventDefault();
        addDefender(config.accountAPI, "UpdateDefender");
    };

    const addDefender = (url, method) => {
        setIsLoadingDeffenderModal(true);
        try {
            const options = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                data: {
                    TemplateId: 1,
                    ArrivingTime: "",
                    AttackerID: 0,
                    AccountID: defenderData.name,
                    Account: {
                        Name: defenderData.realName,
                        XCoord: defenderData.xCoord,
                        YCoord: defenderData.yCoord,
                        AccountType: 0
                    }
                },
                url: url + method
            }
            const result = axios(options)
                .then(function (response) {
                    setIsLoadingDeffenderModal(false);
                    setIsShowingDeffenderModal(false);
                    setDefendersParam(prevState => ({
                        ...prevState,
                        Refresh: Math.random()
                    }));
                    setDefenderData({
                        name: "",
                        arrivalTime: ""
                    })
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

    const deleteDefenderFromDB = (url, method) => {
        setIsLoadingDeffenderModal(true);
        try {
            const options = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                data: {
                    TemplateId: 1,
                    ArrivingTime: "",
                    AttackerID: 0,
                    AccountID: defenderData.name,
                    Account: {
                        Name: defenderData.realName,
                        XCoord: defenderData.xCoord,
                        YCoord: defenderData.yCoord,
                        AccountType: 0
                    }
                },
                url: url + method
            }
            const result = axios(options)
                .then(function (response) {
                    setIsLoadingDeffenderModal(false);
                    setIsShowingDeffenderModal(false);
                    setDefendersParam(prevState => ({
                        ...prevState,
                        Refresh: Math.random()
                    }));
                    setDefenderData({
                        name: "",
                        arrivalTime: ""
                    })
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

        //delete defender
    const deleteDefender = (e) => {
        const accountID = e.name;
        deleteDefenderFromDB(config.accountAPI, "DeleteDefender");
        setIsShowingDeffenderModal(true);
    }

    return(
        <>
        <div className="container">
            <DefenderModal
                    show={isShowingDeffenderModal}
                    editDefender = {true}
                    submitHandler={handleSubmitDefender}
                    handleClose={closeDefenderModal}
                    defenderData={defenderData}
                    handleChange={handleChangeDefenderModal}
                    isLoading={isLoadingDeffenderModal}
                    newDefender={true}
                    isLoadingDefenders={false} 
                    deleteDefender = {deleteDefender}/>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="view-header">
                            <div className="header-title">
                                <h3>
                                    <FontAwesomeIcon icon={faShieldAlt}/> 
                                    &nbsp; Defenders
                                </h3>
                                <small>
                                    Manage the defenders
                                </small>
                            </div>
                        </div>
                        <hr/>
                    </div>
            </div>
            <div className="row">
                <ul className="w3-ul w3-card w3-hoverable width-100">
                    {!isLoading && attackers.length ?
                        attackers.map(item => (
                            <li className="w3-bar use-pointer" key={item.accountID} onClick={() => openDefenderModal(item)}>
                                <img src={img_defender} className="w3-bar-item w3-circle w3-hide-small customIconDefender"/>
                                <div className="w3-bar-item">
                                    <span className="w3-large defenderName">{item.name}</span>
                                    <br />
                                    <span className="spanSmaller">Defender</span>
                                </div>
                            </li>
                        )) : !attackers.length && !isLoading ? 
                            <div>
                                No Data!
                            </div> 
                            :   <div className="loading-div">
                                    <h3>Loading data... </h3><img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                </div>
                    }
                </ul>
            </div>
        </div>
        </>
    )
}