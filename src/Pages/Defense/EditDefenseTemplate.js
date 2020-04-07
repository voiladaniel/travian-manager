import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap'
import { DefenderModal } from '../../Helpers/DefenderModal.js'
import { AttackerModal } from '../../Helpers/AttackerModal.js'
import { useAttackerModal } from '../../Helpers/useAttackerModal.js'
import { useTemplateService } from '../../Helpers/useTemplateService.js'
import { config } from '../../Helpers/config.js';
import { DefenderDiv } from '../../Helpers/DefenderDiv.js'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const EditDefenseTemplate = props => {
    const [atteckersParam, setAtteckersParam] = useState({
        TemplateId: "1",
        UserID: "1",
        Refresh: 0
    });
    const [defendersParam, setDefendersParam] = useState({
        TemplateId: "1",
        UserID: "1"
    });
    const [defenderBody, setDefenderBody] = useState({
        TemplateId: 1,
        AttackerID: 0,
        AccountID: 0,
        ArrivingTime: ""
    });
    const [AttackerID, setAttackerID] = useState();
    const [isLoadingCustom, setIsLoadingCustom] = useState(false);
    const [defenderData, setDefenderData] = useState({
        name: "",
        arrivalTime: "",
        xCoord: "",
        yCoord: "",
    });
    const [defenders, setDefenders] = useState([]);
    const [attackerName, setAttackerName] = useState();
    const [attackerData, setAttackerData] = useState({
        xCoord: "",
        yCoord: "",
        notBeforeTime: "",
        troopSpeed: 0,
        tournamentSquare: 0,
        AttackerID: 0
    });

    //#region APICAlls

    const getDefenders = (url, method) => {
        try {
            const options = {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
                params: defendersParam,
                url: url + method
            }
            const result = axios(options)
                .then(function (response) {
                    setDefenders(response.data);
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

    const updateAttacker = (url, method) => {
        setIsLoadingAttackerModal(true);
        try {
            const options = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                data: {
                    TemplateId: 1,
                    TroopSpeed: attackerData.troopSpeed,
                    TournamentSquare: attackerData.tournamentSquare,
                    AttackerID: attackerData.AttackerID,
                    NotBeforeTime : attackerData.notBeforeTime
                },
                url: url + method
            }
            const result = axios(options)
                .then(function (response) {
                    setIsLoadingAttackerModal(false);
                    setIsShowingAttackerModal(false);
                    setAtteckersParam(prevState => ({
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

    const addDefender = (url, method) => {
        setIsLoadingDeffenderModal(true);
        try {
            const options = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                data: {
                    TemplateId: 1,
                    ArrivingTime: defenderData.arrivalTime,
                    AttackerID: attackerData.AttackerID,
                    AccountID: defenderData.name
                },
                url: url + method
            }
            const result = axios(options)
                .then(function (response) {
                    setIsLoadingDeffenderModal(false);
                    setIsShowingDeffenderModal(false);
                    setDefenderData({
                        name: "",
                        arrivalTime: ""
                    })
                    setAtteckersParam(prevState => ({
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

    const deleteDefenderFromDB = (url, method, defenderId, attackerId) => {
        setIsLoadingCustom(true);
        try {
            const options = {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
                params: {
                    DefenderID: defenderId,
                    AttackerID: attackerId
                },
                url: url + method
            }
            axios(options)
                .then(function (response) {
                    setAtteckersParam(prevState => ({
                        ...prevState,
                        Refresh: Math.random()
                    }));
                    setIsLoadingCustom(false);
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

    //#endregion

    //#region Modal
    const [isShowingDeffenderModal, setIsShowingDeffenderModal] = useState(false);
    const [isLoadingDeffenderModal, setIsLoadingDeffenderModal] = useState(false);
    const [isShowingAttackerModal, setIsShowingAttackerModal] = useState(false);
    const [isLoadingAttackerModal, setIsLoadingAttackerModal] = useState(false);

    function closeDefenderModal() {
        setIsShowingDeffenderModal(!isShowingDeffenderModal);
    }

    function closeAttackerModal() {
        setIsShowingAttackerModal(!isShowingAttackerModal);
    }
    const handleChangeDefenderModal = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
            let defender = defenders.filter(x => x.accountID === parseInt(value));
            setDefenderData(prevState => ({
                ...prevState,
                xCoord: defender[0].xCoord,
                yCoord: defender[0].yCoord
            }));
        }
        setDefenderData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAttackerData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitAttacker = async (e) => {
        e.preventDefault();
        updateAttacker(config.templateAPI, "updateAttacker");
    };

    const handleSubmitDefender = async (e) => {
        e.preventDefault();
        await setDefenderBody(prevState => ({
            ...prevState,
            "ArrivingTime": defenderData.arrivalTime,
            AttackerID: attackerData.AttackerID,
            AccountID: defenderData.name
        }));
        addDefender(config.templateAPI, "AddDefender");
    };

    const openDefenderModal = (e) => {
        const { name } = e.account;
        const { attackerID } = e;
        getDefenders(config.templateAPI, "GetDefenders");
        setIsShowingDeffenderModal(true);
        setAttackerData(prevState => ({
            ...prevState,
            AttackerID: attackerID
        }));
        setAttackerName(name);
    }

    const openAttackerModal = (e) => {
        const { name, xCoord, yCoord, AccountID } = e.account;
        const { notBeforeTime, troopSpeed, tournamentSquare, attackerID } = e;
        setAttackerData(prev => ({
            ...prev,
            xCoord: xCoord,
            yCoord: yCoord,
            notBeforeTime: notBeforeTime,
            troopSpeed: troopSpeed,
            tournamentSquare: tournamentSquare,
            AccountID: AccountID,
            AttackerID: attackerID
        }))

        setAttackerName(name);
        setIsShowingAttackerModal(true);
    }
    //#endregion

    //link parmeters
    const { computedMatch } = props;
    let { id } = computedMatch.params;

    //API Parameters
    const { errorLogin, isLoading, getData, attackers } = useTemplateService(config.templateAPI, atteckersParam);

    //delete defender
    const deleteDefender = (e) => {
        const { defenderID, attackerID } = e;
        deleteDefenderFromDB(config.templateAPI, "DeleteDefender", defenderID, attackerID);
    }

    //load data
    useEffect(() => {
        const fetchData = async () => {
            getData("GetAttackers");
        }
        fetchData();
    }, [atteckersParam])

    return (
        <>
            <div className="container">
                <DefenderModal
                    show={isShowingDeffenderModal}
                    submitHandler={handleSubmitDefender}
                    handleClose={closeDefenderModal}
                    name={attackerName}
                    defenderData={defenderData}
                    defenders={defenders}
                    handleChange={handleChangeDefenderModal}
                    isLoading={isLoadingDeffenderModal} />
                <AttackerModal show={isShowingAttackerModal} 
                handleClose={closeAttackerModal} 
                submitHandler={handleSubmitAttacker}
                name={attackerName} data={attackerData} 
                handleChange={handleChange} 
                isLoading ={isLoadingAttackerModal}/>
                <div className="row">
                    <h3>Template: ro2020</h3>
                </div>
                <div className="row">
                    <Button variant="secondary" onClick={true}>
                        <FontAwesomeIcon icon={faPlus} />
                        &nbsp;
                        New attacker
                    </Button>
                </div>
                <div className="row">
                    {!isLoading && attackers.length ?
                        attackers.map(item => (
                            <div className="col-lg-3 col-md-6 text-center attacker-div-template" key={item.accountID}>
                                <div className="attacker-name" onClick={() => openAttackerModal(item)}>
                                    {item.account.name}
                                </div>
                                <div className="text-center defenders-div">
                                    <DefenderDiv isLoadingCustom={isLoadingCustom} item={item} deleteDefender={deleteDefender} />
                                    <div className="row add-new-defender" onClick={() => openDefenderModal(item)}>
                                        Add new
                                    </div>
                                </div>
                            </div>
                        ))
                        : <div className="loading-div">
                            <h3>Loading data... </h3><img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}