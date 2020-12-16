import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { DefenderModal } from '../../Helpers/DefenderModal.js'
import { AttackerModal } from '../../Helpers/AttackerModal.js'
import { SettingsModal } from '../../Helpers/SettingsModal.js'
import { SpyModal } from '../../Helpers/SpyModal.js'
import { useTemplateService } from '../../Helpers/useTemplateService.js'
import { config } from '../../Helpers/config.js';
import { DefenderDiv } from '../../Helpers/DefenderDiv.js'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import img_attacker from '../../Images/img_attacker.png'
import { faBolt, faWrench, faShieldAlt, faTrashAlt, faUserSecret, faTrash } from '@fortawesome/free-solid-svg-icons'

export const EditDefenseTemplate = props => {
    let { id } = useParams();

    const [planDataParam, setPlanDataParam] = useState({
        TemplateID: id
    });

    const [atteckersParam, setAtteckersParam] = useState({
        TemplateId: planDataParam.TemplateID,
        UserID: localStorage.getItem('userID'),
        Refresh: 0
    });
    const [defendersParam, setDefendersParam] = useState({
        TemplateId: planDataParam.TemplateID,
        UserID: localStorage.getItem('userID')
    });
    const [defenderBody, setDefenderBody] = useState({
        TemplateId: planDataParam.TemplateID,
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
        realName: "",
        spySpeed: 9,
        tournamentSquare: 0
    });
    const [settingsData, setSettingsData] = useState({
        settingsdID: 0,
        timeInterval: ""
    });
    const [defenders, setDefenders] = useState([]);
    const [attackerName, setAttackerName] = useState();
    const [attackerData, setAttackerData] = useState({
        xCoord: "",
        yCoord: "",
        notBeforeTime: "",
        troopSpeed: 0,
        tournamentSquare: 0,
        AttackerID: 0,
        speedArtifact: 0,
        defender: []
    });

    //#region APICAlls

    const getSettings = (url, method) => {
        setIsLoadingSettings(true);
        try {
            const options = {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
                params: {
                    TemplateID: planDataParam.TemplateID,
                },
                url: url + method
            }
            const result = axios(options)
                .then(function (response) {
                    setIsLoadingSettings(false);
                    setSettingsData({
                        settingsdID: response.data.settingID,
                        timeInterval: response.data.timeInterval
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

    const getDefenders = (url, method) => {
        setIsLoadingDefenders(true);
        try {
            const options = {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
                params: defendersParam,
                url: url + method
            }
            const result = axios(options)
                .then(function (response) {
                    setIsLoadingDefenders(false);
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

    const updateSettings = (url, method) => {
        setIsLoadingSettingsModal(true);
        try {
            const options = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                data: {
                    TemplateId: planDataParam.TemplateID,
                    TimeInterval: settingsData.timeInterval,
                    SettingID: settingsData.settingsdID
                },
                url: url + method
            }
            const result = axios(options)
                .then(function (response) {
                    setIsLoadingSettingsModal(false);
                    setIsShowingSettingsModal(false);
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

    const updateAttacker = (url, method) => {
        setIsLoadingAttackerModal(true);
        try {
            const options = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                data: {
                    TemplateId: planDataParam.TemplateID,
                    TroopSpeed: attackerData.troopSpeed,
                    TournamentSquare: attackerData.tournamentSquare,
                    AttackerID: attackerData.AttackerID,
                    NotBeforeTime: attackerData.notBeforeTime,
                    SpeedArtifact: attackerData.speedArtifact,
                    Account: {
                        Name: attackerName,
                        XCoord: attackerData.xCoord,
                        YCoord: attackerData.yCoord,
                        AccountType: 1
                    }
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
                    TemplateId: planDataParam.TemplateID,
                    ArrivingTime: defenderData.arrivalTime,
                    AttackerID: attackerData.AttackerID,
                    AccountID: defenderData.name,
                    Account: {
                        Name: defenderData.realName,
                        XCoord: defenderData.xCoord,
                        YCoord: defenderData.yCoord,
                        UserID: localStorage.getItem('userID'),
                        AccountType: 0
                    }
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

    const getAttackerSpies = async (url, method, attackerId, spyID) => {
        setIsLoadingSpyModal(true);
        try {
            const options = {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
                params: {
                    AttackerID: attackerId,
                    SpyID: spyID,
                    TroopSpeed : defenderData.spySpeed,
                    TournamentSquare : defenderData.tournamentSquare
                },
                url: url + method
            }
            const result = await axios(options)
                .then(function (response) {
                    setAttackerData(prevState => ({
                        ...prevState,
                        name: response.data.account.name,
                        defender: response.data.defender
                    }));
                    setIsLoadingSpyModal(false);
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

    const deleteDefendersFromDB = (url, method, attackerId) => {
        setIsLoadingDeleteDefenders(true);
        setIsLoadingCustom(true);
        try {
            const options = {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
                params: {
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
                    setIsLoadingDeleteDefenders(false);
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

    const deleteAttackerFromDB = (url, method, attackerId) => {
        try {
            const options = {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
                params: {
                    AttackerID: attackerId
                },
                url: url + method
            }
            axios(options)
                .then(function (response) {
                    setIsDeletingAttacker(false);
                    setAtteckersParam(prevState => ({
                        ...prevState,
                        Refresh: Math.random()
                    }));
                })
                .catch(function (error) {
                    if (!error.status) {
                        try {
                            const { status } = error.response;
                            if (status === 401)
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
    const [isLoadingDefenders, setIsLoadingDefenders] = useState(false);
    const [isLoadingSettings, setIsLoadingSettings] = useState(false);
    const [isShowingAttackerModal, setIsShowingAttackerModal] = useState(false);
    const [isLoadingAttackerModal, setIsLoadingAttackerModal] = useState(false);
    const [isLoadingSettingsModal, setIsLoadingSettingsModal] = useState(false);
    const [isShowingSettingsModal, setIsShowingSettingsModal] = useState(false);
    const [isNewAttacker, setIsNewAttacker] = useState(false);
    const [isNewDefender, setIsNewDefender] = useState(false);
    const [isDeletingAttacker, setIsDeletingAttacker] = useState(false);
    const [isLoadingDeleteDefenders, setIsLoadingDeleteDefenders] = useState(false);
    const [isShowingSpyModal, setIsShowingSpyModal] = useState(false);
    const [isLoadingSpyModal, setIsLoadingSpyModal] = useState(false);

    function closeDefenderModal() {
        setIsShowingDeffenderModal(!isShowingDeffenderModal);
        setIsNewDefender(false);
    }

    function closeAttackerModal() {
        setIsShowingAttackerModal(!isShowingAttackerModal);
    }

    function closeSettingsModal() {
        setIsShowingSettingsModal(!isShowingSettingsModal);
    }

    function closeSpyModal() {
        setIsShowingSpyModal(!isShowingSpyModal);
    }

    const handleChangeDefenderModal = (e) => {
        const { name, value } = e.target;
        if (isNewDefender) {

        }
        else {
            if (name === "name") {
                let defender = defenders.filter(x => x.accountID === parseInt(value));
                setDefenderData(prevState => ({
                    ...prevState,
                    xCoord: defender[0].xCoord,
                    yCoord: defender[0].yCoord
                }));
            }
        }
        setDefenderData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeSpyTroop = (e) => {
        const { name, value } = e.target;

        setDefenderData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeSpyModal = (e) => {
        const { name, value } = e.target;

        setDefenderData(prevState => ({
            ...prevState,
            [name]: value
        }));
        getAttackerSpies(config.templateAPI, "GetSpies", attackerData.AttackerID, value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") {
            setAttackerName(value);
        }
        setAttackerData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeSettingsModal = (e) => {
        const { name, value } = e.target;
        setSettingsData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmitSettings = async (e) => {
        e.preventDefault();
        updateSettings(config.templateAPI, "UpdateSettings");
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
        setIsNewDefender(false);
        const { name } = e.account;
        const { attackerID } = e;
        getDefenders(config.templateAPI, "GetDefenders");
        setIsShowingDeffenderModal(true);
        setAttackerData(prevState => ({
            ...prevState,
            AttackerID: attackerID
        }));
        setDefenderData(prev => ({
            ...prev,
            xCoord: "",
            yCoord: "",
            name: 0,
            arrivalTime: ""
        }))
        setAttackerName(name);
    }

    const openNewAttackerModal = (e) => {
        setIsNewAttacker(true);
        setAttackerData(prev => ({
            ...prev,
            xCoord: "",
            yCoord: "",
            notBeforeTime: "",
            troopSpeed: 3,
            tournamentSquare: 0,
            AccountID: 0,
            AttackerID: 0,
            speedArtifact: 0
        }))
        setAttackerName("");
        setIsShowingAttackerModal(true);
    }

    const openNewDefenderModal = (e) => {
        setIsNewDefender(true);
        setDefenderData(prev => ({
            ...prev,
            xCoord: "",
            yCoord: "",
            name: 0,
            realName: "",
            arrivalTime: "",
        }))
        setIsShowingDeffenderModal(true);
    }

    const openAttackerModal = (e) => {
        setIsNewAttacker(false);
        const { name, xCoord, yCoord, AccountID } = e.account;
        const { notBeforeTime, troopSpeed, tournamentSquare, attackerID, speedArtifact } = e;
        setAttackerData(prev => ({
            ...prev,
            xCoord: xCoord,
            yCoord: yCoord,
            notBeforeTime: notBeforeTime,
            troopSpeed: troopSpeed,
            tournamentSquare: tournamentSquare,
            AccountID: AccountID,
            AttackerID: attackerID,
            speedArtifact: speedArtifact
        }))
        setAttackerName(name);
        setIsShowingAttackerModal(true);
    }

    const openSettingsModal = (e) => {
        getSettings(config.templateAPI, "GetSettings");
        setIsShowingSettingsModal(true);
    }

    const openSpyModal = (e) => {
        const { attackerID } = e;
        getDefenders(config.templateAPI, "GetDefenders");
        setAttackerData(prev => ({
            ...prev,
            AttackerID: attackerID
        }))
        setDefenderData(prev => ({
            ...prev,
            xCoord: "",
            yCoord: "",
            name: 0,
            arrivalTime: ""
        }))
        setAttackerData(prevState => ({
            ...prevState,
            defender: ""
        }));
        setIsShowingSpyModal(true);
    }
    //#endregion

    //API Parameters
    const { errorLogin, isLoading, getData, attackers } = useTemplateService(config.templateAPI, atteckersParam);

    //delete defender
    const deleteDefender = (e) => {
        const { defenderID, attackerID } = e;
        deleteDefenderFromDB(config.templateAPI, "DeleteDefender", defenderID, attackerID);
    }

    //delete defenders
    const deleteDefenders = (e) => {
        const { attackerID } = e;
        deleteDefendersFromDB(config.templateAPI, "DeleteDefenders", attackerID);
    }

    //delete defender
    const deleteAttacker = (e) => {
        const { AttackerID } = e;
        deleteAttackerFromDB(config.templateAPI, "DeleteAttacker", AttackerID);
        setIsShowingAttackerModal(false);
        setIsDeletingAttacker(true);
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
                    isLoading={isLoadingDeffenderModal}
                    newDefender={isNewDefender}
                    isLoadingDefenders={isLoadingDefenders} />

                <AttackerModal show={isShowingAttackerModal}
                    handleClose={closeAttackerModal}
                    submitHandler={handleSubmitAttacker}
                    name={attackerName}
                    data={attackerData}
                    handleChange={handleChange}
                    isLoading={isLoadingAttackerModal}
                    newAttacker={isNewAttacker}
                    deleteAttacker={deleteAttacker} />

                <SettingsModal show={isShowingSettingsModal}
                    data={settingsData}
                    handleClose={closeSettingsModal}
                    handleChange={handleChangeSettingsModal}
                    submitHandler={handleSubmitSettings}
                    isLoadingSettings={isLoadingSettings}
                    isLoading={isLoadingSettingsModal} />

                <SpyModal show={isShowingSpyModal}
                    handleClose={closeSpyModal}
                    attackerData={attackerData}
                    defenders={defenders}
                    defenderData={defenderData}
                    isLoadingSpies={isLoadingSpyModal}
                    isLoadingDefenders={isLoadingDefenders}
                    handleChange={handleChangeSpyModal}
                    handleChangeSpyTroop={handleChangeSpyTroop} />

                <div className="row">
                    <h3>Template: ro2020</h3>
                </div>
                <div className="row">
                    <Button variant="secondary" onClick={openNewAttackerModal} disabled={isLoading}>
                        <FontAwesomeIcon icon={faBolt} />
                        &nbsp;
                        New attacker
                    </Button>
                    &nbsp;
                    <Button variant="secondary" onClick={openNewDefenderModal} disabled={isLoading}>
                        <FontAwesomeIcon icon={faShieldAlt} />
                        &nbsp;
                        New defender
                    </Button>
                    &nbsp;
                    <Button variant="secondary" onClick={openSettingsModal} disabled={isLoading}>
                        <FontAwesomeIcon icon={faWrench} />
                        &nbsp;
                        Settings
                    </Button>
                </div>
                <div className="row">
                    {!isLoading && attackers.length && !isDeletingAttacker ?
                        attackers.map(item => (
                            <div className="col-lg-3 col-md-6 text-center attacker-div-template" key={item.accountID}>
                                <div className="attacker-name" onClick={() => openAttackerModal(item)}>
                                <img src={img_attacker} className="w3-bar-item w3-circle w3-hide-small customIconAttacker"/> {item.account.name}
                                </div>
                                <div className="text-center defenders-div">
                                    <DefenderDiv isLoadingCustom={isLoadingCustom} item={item} deleteDefender={deleteDefender} />
                                    <div>

                                    </div>
                                    <div className="row add-new-defender">
                                        <Button variant="secondary" onClick={() => openDefenderModal(item)}>
                                            <FontAwesomeIcon icon={faShieldAlt} />
                                            &nbsp;
                                            Add new
                                        </Button>
                                        &nbsp;
                                        {!item.defender.length ? null :
                                            <>
                                                <Button variant="secondary" onClick={() => deleteDefenders(item)} disabled={isLoadingDeleteDefenders}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                    &nbsp;
                                                    Clear
                                                </Button>
                                                &nbsp;
                                            </>}
                                        {!item.defender.length ? null :
                                            <>
                                                <Button variant="secondary" onClick={() => openSpyModal(item)} disabled={isLoadingSpyModal}>
                                                    <FontAwesomeIcon icon={faUserSecret} />
                                                    &nbsp;
                                                    Spy
                                                </Button>
                                                &nbsp;
                                            </>}
                                    </div>
                                </div>
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