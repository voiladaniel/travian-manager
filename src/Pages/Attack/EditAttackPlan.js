import React, { useState, useEffect, setState } from 'react';
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { config } from '../../Helpers/config.js';
import axios from "axios";
import { useTemplateService } from '../../Helpers/useTemplateService.js'
import { useAdditionalService } from '../../Helpers/useAdditionalService.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import img_defender from '../../Images/img_defender.png'
import img_attacker from '../../Images/img_attacker.png'
import { faBolt, faWrench, faShieldAlt, faTrashAlt, faUserSecret, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { TargetModal } from '../../Helpers/TargetModal.js'
import { Target } from '../../Helpers/Target.js'
import { TargetTemplate } from '../../Helpers/TargetTemplate.js'
import { PlanAttacker } from '../../Helpers/PlanAttacker.js'
import { AttackerModal } from '../../Helpers/AttackerModal.js'
import { ArrivalTimeModal } from '../../Helpers/ArrivalTimeModal.js'
import { PlanSettingsModal } from '../../Helpers/PlanSettingsModal.js'

//Drag n Drop
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const EditAttackPlan = () => {
    let { id } = useParams();

    const [isLoadingPlanData, setIsLoadingPlanData] = useState(false);
    const [planData, setPlanData] = useState([]);
    const [isNewTarget, setIsNewTarget] = useState(false);
    const [isShowingTargetModal, setIsShowingTargetModal] = useState(false);
    const [isLoadingTargetModal, setIsLoadingTargetModal] = useState(false);
    const [isDeletingTarget, setIsDeletingTarget] = useState(false);
    const [isShowingAttackerModal, setIsShowingAttackerModal] = useState(false);
    const [isNewAttacker, setIsNewAttacker] = useState(false);
    const [isLoadingAttackerModal, setIsLoadingAttackerModal] = useState(false);
    const [isShowingTimeArrivalModal, setIsShowingTimeArrivalModal] = useState(false);
    const [isLoadingTimeArrivalModal, setIsLoadingTimeArrivalModal] = useState(false);
    const [isLoadingCustom, setIsLoadingCustom] = useState(false);
    const [isNoLoderNeeded, setIsNoLoderNeeded] = useState(false);
    const [isLoadingPlanSettings, setIsLoadingPlanSettings] = useState(false);
    const [isLoadingPlanSettingsModal, setIsLoadingPlanSettingsModal] = useState(false);
    const [isShowingPlanSettingsModal, setIsShowingPlanSettingsModal] = useState(false);
    const [isEditAttack, setIsEditAttack] = useState(false);

    const [planDataParam, setPlanDataParam] = useState({
        PlanID: id
    });

    const [planSettingsData, setPlanSettingsData] = useState({
        planID: planDataParam.PlanID,
        planSettingID: 0,
        timeBuffer: "",
        safeTime: 0,
        message:"",
        includeTTA: 0,
        includeTTL: 0,
        fakeMessage: "",
        realMessage: "",
        ttaMessage: "",
        ttlMessage: "",
        serverSpeed: 0
    });

    const [targetParam, setTargetParam] = useState({
        PlanID: planDataParam.PlanID,
        Refresh: 0
    });

    const [additionalParam, setAdditionalParam] = useState({
        PlanID: planDataParam.PlanID,
        Refresh: 0
    });

    const [targetData, setTargetData] = useState({
        accountID: 0,
        targetID: 0,
        planID: 0,
        xCoord: "",
        yCoord: "",
        name: ""
    });

    const [attackerData, setAttackerData] = useState({
        xCoord: "",
        yCoord: "",
        name: "",
        troopSpeed: 0,
        tournamentSquare: 0,
        planAttackerID: 0,
        speedArtifact: 0,
        accountID: 0,
        planID: 0
        // arrivingTime: "",
        // attackingTime: "",
        // attackType: ""
    });

    const [defenderData, setDefenderData] = useState({
        attackerName: "",
        targetName: "",
        arrivalTime: "",
        attackingTime: "",
        attackType: "",
        planDefenderID: 0
    });

    const [message, setMessage] = useState("");

    //API Parameters
    //attackers = targets
    let { errorLogin, isLoading, getData, attackers, setAttackers } = useTemplateService(config.planAPI, targetParam);
    const { errorAdditional, isAdditionalLoading, getAdditionalData, additional, setAdditional } = useAdditionalService(config.planAPI, additionalParam);
    

    const getPlanData = async (url, method, body) => {
        if(!isLoadingPlanData) {
            setIsLoadingPlanData(true);
            try {
                const options = {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" },
                    params: body,
                    url: url + method
                }
                await axios(options)
                .then(function (response) {
                    setPlanData(response.data);
                    setIsLoadingPlanData(false);
                })
                .catch(function(error) {
                    if (!error.status) {
                        try{
                            const {status} = error.response;
                            if(status === 401)
                                 error.message = 'Unauthorized access! Please contact the Administrator!'
                        }
                        catch{
                            setIsLoadingPlanData(false);
                        }
                        finally{
                            setIsLoadingPlanData(false);
                        }
                    }
                    else{
                        
                    }
                });
                
            } catch (e) {
                setIsLoadingPlanData(false);
                console.log(e);
            }
        }
    };

    const deletePlanDefenderFromDB = (url, method, planDefenderID, planAttackerID, targetID) => {
        try {
            const options = {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
                params: {
                    PlanDefenderID: planDefenderID,
                    PlanAttackerID: planAttackerID,
                    PlanID: planDataParam.PlanID
                },
                url: url + method
            }
            axios(options)
                .then(function (response) {
                    setAttackers(response.data);
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

    const deletePlanAttackerFromDB = (url, method, planAttackerID) => {
        try {
            const options = {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
                params: {
                    PlanAttackerID: planAttackerID
                },
                url: url + method
            }
            axios(options)
                .then(function (response) {

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

    const AddOrUpdateAttackPlan = (url, method) => {
        setIsLoadingTimeArrivalModal(true);
        try {
            const options = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                data: {
                    PlanID: planDataParam.PlanID,
                    PlanAttackerID: attackerData.planAttackerID,
                    TargetID: targetData.targetID,
                    Name: attackerData.name,
                    ArrivingTime: defenderData.arrivalTime,
                    PlanDefenderID: defenderData.planDefenderID,
                    AttackType: defenderData.attackType
                },
                url: url + method
            }
            const result = axios(options)
                .then(function (response) {
                    setIsLoadingTimeArrivalModal(false);
                    setIsShowingTimeArrivalModal(false);
                    
                    if(targetData.targetID != -1){
                        var myData = [...attackers];
                        setAttackers(response.data);

                        // if (defenderData.planDefenderID === 0){
                        //     var planDefenders = myData
                        //         .find(attacker => attacker.targetID === myTargetId)
                        //         .planDefender;
                        //     planDefenders.push(response.data);
                            
                        //     setAttackers(myData);
                        // }
                        // else{
                        //     let planDefenderID = response.data.planDefenderID;

                        //     var planDefender = myData
                        //     .find(attacker => attacker.targetID === myTargetId)
                        //     .planDefender.find(defender => defender.planDefenderID === planDefenderID);

                        //     planDefender.attackType = response.data.attackType;
                        //     planDefender.arrivingTime = response.data.arrivingTime;
                        //     planDefender.attackingTime = response.data.attackingTime;
                        //     planDefender.attackerConflict = response.data.attackerConflict;

                        //     setAttackers(myData);
                        // }
                    }
                    else{
                        setAttackers(response.data);
                    }

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

    const AddOrUpdateTarget = (url, method) => {
        setIsLoadingTargetModal(true);
        try {
            const options = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                data: {
                    PlanID: planDataParam.PlanID,
                    TargetID: targetData.targetID,
                    Account: {
                        AccountID: targetData.accountID,
                        Name: targetData.name,
                        XCoord: targetData.xCoord,
                        YCoord: targetData.yCoord,
                        AccountType: 3
                    }
                },
                url: url + method
            }
            const result = axios(options)
                .then(function (response) {
                    setIsLoadingTargetModal(false);
                    setIsShowingTargetModal(false);

                    let myTargetId = response.data.targetID;
                    var myData = [...attackers];

                    let targetIndex = myData.findIndex(attacker => attacker.targetID === myTargetId);

                    if(targetIndex === -1){
                        myData.push(response.data);
                        setAttackers(myData);
                    }
                    else{
                        myData[targetIndex] = response.data;
                        setAttackers(myData);
                    }

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

    const AddOrUpdatePlanAttacker = (url, method) => {
        setIsLoadingAttackerModal(true);
        try {
            const options = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                data: {
                    PlanID: planDataParam.PlanID,
                    TroopSpeed: attackerData.troopSpeed,
                    TournamentSquare: attackerData.tournamentSquare,
                    SpeedArtifact: attackerData.speedArtifact,
                    PlanAttackerID: attackerData.planAttackerID,
                    Account: {
                        AccountID: attackerData.accountID,
                        Name: attackerData.name,
                        XCoord: attackerData.xCoord,
                        YCoord: attackerData.yCoord,
                        AccountType: 4
                    }
                },
                url: url + method
            }
            const result = axios(options)
                .then(function (response) {
                    setIsLoadingAttackerModal(false);
                    setIsShowingAttackerModal(false);

                    let myplanAttackerID= response.data.attackerData.planAttackerID;
                    var myData = [...additional];
                    let targetIndex = myData.findIndex(attacker => attacker.planAttackerID === myplanAttackerID);

                    if(targetIndex === -1){
                        myData.push(response.data.attackerData);
                        setAdditional(myData);
                    }
                    else{
                        myData[targetIndex] = response.data.attackerData;
                        setAdditional(myData);
                    }
                    
                    if(attackerData.planAttackerID != 0){
                        setAttackers(response.data.target)
                    }
                    
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

    const deleteTargetFromDB = (url, method, targetID) => {
        try {
            const options = {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
                params: {
                    TargetID: targetID
                },
                url: url + method
            }
            axios(options)
                .then(function (response) {
                    setIsDeletingTarget(false);
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

    const getPlanSettings = (url, method) => {
        setIsLoadingPlanSettings(true);
        try {
            const options = {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
                params: {
                    PlanID: planDataParam.PlanID,
                },
                url: url + method
            }
            const result = axios(options)
                .then(function (response) {
                    setIsLoadingPlanSettings(false);
                    setPlanSettingsData({
                        planSettingID: response.data.planSettingID,
                        timeBuffer: response.data.timeBuffer,
                        safeTime: response.data.safeTime,
                        message: response.data.message,
                        includeTTA: response.data.includeTTA,
                        includeTTL: response.data.includeTTL,
                        fakeMessage: response.data.fakeMessage,
                        realMessage: response.data.realMessage,
                        ttaMessage: response.data.ttaMessage,
                        ttlMessage: response.data.ttlMessage,
                        serverSpeed: response.data.serverSpeed 
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

    const updatePlanSettings = (url, method) => {
        setIsLoadingPlanSettingsModal(true);
        try {
            planSettingsData.includeTTA = planSettingsData.includeTTA ? 1 : 0;
            planSettingsData.includeTTL = planSettingsData.includeTTL ? 1 : 0;
            
            const options = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                data: {
                    PlanID: planDataParam.PlanID,
                    TimeBuffer: planSettingsData.timeBuffer,
                    SafeTime: planSettingsData.safeTime,
                    PlanSettingID: planSettingsData.planSettingID,
                    Message: planSettingsData.message,
                    IncludeTTA: planSettingsData.includeTTA,
                    IncludeTTL: planSettingsData.includeTTL,
                    FakeMessage: planSettingsData.fakeMessage,
                    RealMessage: planSettingsData.realMessage,
                    TTAMessage: planSettingsData.ttaMessage,
                    TTLMessage: planSettingsData.ttlMessage,
                    ServerSpeed: parseInt(planSettingsData.serverSpeed)
                },
                url: url + method
            }
            const result = axios(options)
                .then(function (response) {
                    setIsLoadingPlanSettingsModal(false);
                    setIsShowingPlanSettingsModal(false);
                    setPlanData(prev => ({
                        ...prev,
                        message: planSettingsData.message,
                        includeTTA: planSettingsData.includeTTA,
                        includeTTL: planSettingsData.includeTTL,
                        fakeMessage: planSettingsData.fakeMessage,
                        realMessage: planSettingsData.realMessage,
                        ttaMessage: planSettingsData.ttaMessage,
                        ttlMessage: planSettingsData.ttlMessage 
                    }));
                    setAttackers(response.data)
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

    const openNewTargetModal = (e) => {
        setIsNewTarget(true);
        setTargetData(prev => ({
            ...prev,
            accountID: 0,
            targetID: 0,
            planID: 0,
            xCoord: "",
            yCoord: "",
            name: ""
        }))
        setIsShowingTargetModal(true);
    }

    const openNewAttackerModal = (e) => {
        setIsNewAttacker(true);
         setAttackerData(prev => ({
            ...prev,
            xCoord: "",
            yCoord: "",
            name: "",
            troopSpeed: 3,
            tournamentSquare: 0,
            planAttackerID: 0,
            speedArtifact: 0,
            accountID: 0,
         }))
        setMessage("");
        setIsShowingAttackerModal(true);
    }

    const openTargetModal = (e) => {
        setIsNewTarget(false);
        const { targetID } = e;
        const { name, xCoord, yCoord, accountID } = e.account;
        setTargetData(prev => ({
            ...prev,
            xCoord: xCoord,
            yCoord: yCoord,
            name: name,
            accountID: accountID,
            targetID: targetID
        }))
        setIsShowingTargetModal(true);
    }

    const openPlanAttackerModal = (e) => {
        setIsNewAttacker(false);
        const { troopSpeed, tournamentSquare, planAttackerID, speedArtifact } = e;
        const { name, xCoord, yCoord, accountID } = e.account;
        setAttackerData(prev => ({
            ...prev,
            xCoord: xCoord,
            yCoord: yCoord,
            name: name,
            accountID: accountID,
            troopSpeed: troopSpeed,
            tournamentSquare: tournamentSquare,
            planAttackerID: planAttackerID,
            speedArtifact: speedArtifact
        }))
        var myData = [...attackers];
        var planD = planData.message;
        var newRow = "\n";
        var atackMessage = "";
        var hourTTA ="";
        var hourTTL ="";
        var hours = [];
        var planDefenders = myData.map((target, index) => { 
            try{
                var leng = target.planDefender.length;
                for (var i = 0; i < leng; i++) {
                    let attack = target.planDefender.find(defender => defender.planAttackerID === planAttackerID);

                    var newobj = {};
                    newobj.xCoord = attack.account.xCoord;
                    newobj.yCoord = attack.account.yCoord;
                    newobj.arrivingTime = attack.arrivingTime;
                    newobj.attackingTime = attack.attackingTime;
                    newobj.attackType = attack.attackType;
                    hours.push(newobj)
                }
            } 
            //no data
            catch{

            }
         });
        hours.sort((a, b) => a.arrivingTime.localeCompare(b.arrivingTime));
        hours.map((attack, index) =>{
                                
            if(planData.includeTTA === 1){
                hourTTA = " " + planData.ttaMessage + " " + attack.arrivingTime;
            }
            if(planData.includeTTL === 1){
                hourTTL = " " + planData.ttlMessage + " " + attack.attackingTime;
            }
            var realAttack = " " + planData.fakeMessage;
            if(attack.attackType === 1){
                realAttack = " " + planData.realMessage;
            }
            
            atackMessage += "[x|y]" + attack.xCoord + "|" + attack.yCoord + "[/x|y]" + hourTTA + hourTTL + realAttack + newRow;
        }) 
        planD = planD.replace('#name',name);
        planD = planD.replace('#hourTTA',"");
        planD = planD.replace('#hourTTL',"");
        setMessage(planD.replace('#attacks',atackMessage));
        setIsShowingAttackerModal(true);
    }

    const openTimeArrivalModal = (e, targetID, targetName) => {
        setIsEditAttack(false);
        const { troopSpeed, tournamentSquare, planAttackerID, speedArtifact } = e;
        const { name, xCoord, yCoord, accountID } = e.account;
        setAttackerData(prev => ({
            ...prev,
            xCoord: xCoord,
            yCoord: yCoord,
            name: name,
            accountID: accountID,
            troopSpeed: troopSpeed,
            tournamentSquare: tournamentSquare,
            planAttackerID: planAttackerID,
            speedArtifact: speedArtifact
        }));
        setTargetData(prev => ({
            ...prev,
            targetID: targetID
        }));

        setDefenderData(prev => ({
            ...prev,
            attckerName: name,
            targetName: targetName, 
            arrivalTime: "",
            attackingTime: "",
            attackType: false,
            planDefenderID: 0
        }));

        setIsShowingTimeArrivalModal(true);
    }

    const openEditTimeArrivalModal = (e) => {

        setIsEditAttack(true);
        const { troopSpeed, tournamentSquare, planAttackerID, speedArtifact } = e.planAttacker;
        const { targetID, arrivingTime, planDefenderID, attackType } = e;
        const targetName = e.account.name;
        const { name, xCoord, yCoord, accountID } = e.planAttacker.account;
        setAttackerData(prev => ({
            ...prev,
            xCoord: xCoord,
            yCoord: yCoord,
            name: name,
            accountID: accountID,
            troopSpeed: troopSpeed,
            tournamentSquare: tournamentSquare,
            planAttackerID: planAttackerID,
            speedArtifact: speedArtifact
        }));
        setTargetData(prev => ({
            ...prev,
            targetID: targetID
        }));

        setDefenderData(prev => ({
            ...prev,
            attckerName: name,
            targetName: targetName, 
            arrivalTime: arrivingTime,
            attackingTime: "",
            attackType: attackType,
            planDefenderID: planDefenderID
        }));

        setIsShowingTimeArrivalModal(true);
    }

    const deletePlanAttacker = (e) => {
        const { planAttackerID } = e;
        
        var myData = [...additional];
        let deleteIndex = myData.findIndex(attacker => attacker.planAttackerID === planAttackerID);

        myData.splice([deleteIndex], 1);

        setAdditional(myData);

        var myData = [...attackers];
        var indexesToDelete = [];
        
        var planDefenders = myData.map((target, index) => {   
            var leng = target.planDefender.length;
            for (var i = 0; i < leng; i++) {
                let deleteIndex = target.planDefender.findIndex(defender => defender.planAttackerID === planAttackerID);

                if(deleteIndex != -1){
                    target.planDefender.splice(deleteIndex, 1); 
                }
            }
         });

        //let deleteIndex = planDefenders.findIndex(item => item.planDefenderID === planDefenderID);
        //planDefenders.splice([deleteIndex], 1);

        deletePlanAttackerFromDB(config.planAPI, "DeletePlanAttacker", planAttackerID);
        setIsShowingAttackerModal(false);
    }

    const openPlanSettingsModal = (e) => {

        getPlanSettings(config.planAPI, "GetPlanSettings");
        setIsShowingPlanSettingsModal(true);
    }

    const handleChangeTargetModal = (e) => {
        const { name, value } = e.target;

        setTargetData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleChangePlanSettingsModal = (e) => {
        const { name, value } = e.target;

        setPlanSettingsData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeAttackerModal = (e) => {
        const { name, value } = e.target;

        setAttackerData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeArrivalModal = (e) => {
        const { name, value } = e.target;

        setDefenderData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleChangeSettingsModalcheckbox = (e) => {
        const { name, checked } = e.target;

        setPlanSettingsData(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleChangeArrivalModalcheckbox = (e) => {
        const { name, checked } = e.target;

        setDefenderData(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleSubmitNewAttack = async (e) => {
        e.preventDefault();
        AddOrUpdateAttackPlan(config.planAPI, "AddOrUpdateAttackPlan");
    };

    const handleSubmitTarget = async (e) => {
        e.preventDefault();
        AddOrUpdateTarget(config.planAPI, "AddOrUpdateTarget");
    };

    const handleSubmitAttacker = async (e) => {
        e.preventDefault();
        AddOrUpdatePlanAttacker(config.planAPI, "AddOrUpdatePlanAttacker");
    };
    
    const handleSubmitPlanSettings = async (e) => {
        e.preventDefault();
        updatePlanSettings(config.planAPI, "UpdatePlanSettings");
    };

    const closeTargetModal = () => {
        setIsShowingTargetModal(!isShowingTargetModal);
    }

    const closeTimeArrivalModal = () => {
        setIsShowingTimeArrivalModal(!isShowingTimeArrivalModal);
    }
    
    const closeAttackerModal = () => {
        setIsShowingAttackerModal(!isShowingAttackerModal);
    }

    const closePlanSettingsModal = () => {
        setIsShowingPlanSettingsModal(!isShowingPlanSettingsModal);
    }

    //delete defender
    const deletePlanDefender = (e) => {
        const { planDefenderID, planAttackerID, targetID } = e;
        
        var myData = [...attackers];

        var planDefenders = myData
        .find(attacker => attacker.targetID === targetID)
        .planDefender;
        let deleteIndex = planDefenders.findIndex(item => item.planDefenderID === planDefenderID);
        planDefenders.splice([deleteIndex], 1);

        setAttackers(myData);
        deletePlanDefenderFromDB(config.planAPI, "DeletePlanDefender", planDefenderID, planAttackerID, targetID);
    }
    //delete target
    const deleteTarget = (e) => {
        const { targetID } = e;

        var myData = [...attackers];
        var deleteIndex = myData
        .findIndex(attacker => attacker.targetID === targetID);
        myData.splice([deleteIndex], 1);
        setAttackers(myData);

        deleteTargetFromDB(config.planAPI, "DeleteTarget", targetID);
        setIsShowingTargetModal(false);
        setIsDeletingTarget(true);
    }
    //load target data
    useEffect(() => {
        const fetchData = async () => {
            getData("GetTargets");
        }
        fetchData();
    }, [targetParam])

    //load target data
    useEffect(() => {
        const fetchData = async () => {
            getAdditionalData("GetPlanAttackers");
        }
        fetchData();
    }, [additionalParam])

    //load data
    useEffect(() => {
        const fetchData = async () => {
            getPlanData(config.planAPI, "GetPlanData", planDataParam);
        }
        fetchData();
    }, [planDataParam])

    return(
        <>
            <div className="container">
                <DndProvider backend={HTML5Backend}>   
                    <TargetModal
                        show={isShowingTargetModal}
                        submitHandler={handleSubmitTarget}
                        handleClose={closeTargetModal}
                        targetData={targetData}
                        handleChange={handleChangeTargetModal}
                        isLoading={isLoadingTargetModal}
                        newTarget={isNewTarget} 
                        deleteTarget={deleteTarget}/>
                    <AttackerModal show={isShowingAttackerModal} 
                        name={attackerData.name}
                        data={attackerData}
                        planAttacker={true}
                        handleClose={closeAttackerModal}
                        handleChange={handleChangeAttackerModal}
                        newAttacker={isNewAttacker}
                        submitHandler={handleSubmitAttacker} 
                        isLoading={isLoadingAttackerModal}
                        deleteAttacker={deletePlanAttacker}
                        message={message}
                        />
                    <ArrivalTimeModal
                    show={isShowingTimeArrivalModal}
                    handleClose={closeTimeArrivalModal}
                    submitHandler={handleSubmitNewAttack}
                    handleChange={handleChangeArrivalModal}
                    handleChangeArrivalModalcheckbox={handleChangeArrivalModalcheckbox}
                    isLoading={isLoadingTimeArrivalModal}
                    data={defenderData}
                    editData={isEditAttack}
                    />
                    <PlanSettingsModal show={isShowingPlanSettingsModal}
                    data={planSettingsData}
                    handleClose={closePlanSettingsModal}
                    handleChange={handleChangePlanSettingsModal}
                    submitHandler={handleSubmitPlanSettings}
                    isLoadingSettings={isLoadingPlanSettings}
                    isLoading={isLoadingPlanSettingsModal}
                    handleChangeArrivalModalcheckbox={handleChangeSettingsModalcheckbox} />
                    <div className="row">
                        <div className='col-lg-2'>
                            <div className="row">
                            <h3>Attack Plan: {!isLoadingPlanData ?
                                    <TargetTemplate planData={planData}/>
                                    :   <span className="font10">
                                            <span>Loading data... </span><img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        </span>
                            }</h3>
                        </div>
                            <div className="row padding10">
                                <Button className="margin10" variant="secondary" onClick={openPlanSettingsModal} disabled={isLoadingPlanData}>
                                    <FontAwesomeIcon icon={faWrench} />
                                    &nbsp;
                                    Settings
                                </Button>
                                &nbsp;
                                <Button className="margin10" variant="secondary" onClick={openNewAttackerModal} disabled={isLoadingPlanData}>
                                    <FontAwesomeIcon icon={faBolt} />
                                    &nbsp;
                                    New attacker
                                </Button>
                                &nbsp;
                                <Button className="margin10" variant="secondary" onClick={openNewTargetModal} disabled={isLoadingPlanData}>
                                    <FontAwesomeIcon icon={faShieldAlt} />
                                    &nbsp;
                                    New target
                                </Button>
                            </div>
                            <ul className="w3-ul w3-card w3-hoverable width-100 padding0">
                                {!isAdditionalLoading && additional.length ?
                                    additional.map(item => (
                                        <PlanAttacker name={item.account.name} attacker={item} openPlanAttackerModal={openPlanAttackerModal} addNewAttack={openTimeArrivalModal}/>
                                    )) : !additional.length && !isAdditionalLoading ? 
                                        <div>
                                            No Data!
                                        </div> 
                                        :   <div className="loading-div">
                                                <h3>Loading data... </h3><img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                            </div>
                                } 
                            </ul>
                        </div>
                        <div className='col-lg-10 overflow-auto heightOverflow'>
                            <div className="row">
                                {/* {!isLoading && attackers.length && !isDeletingTarget && !isNoLoderNeeded ? */}
                                {console.log(attackers)}
                                {attackers.length?
                                    attackers.map(item => (
                                        <Target item={item} openTargetModal={openTargetModal} deleteDefender={deletePlanDefender}  isLoadingCustom={isLoadingCustom} editAttack={openEditTimeArrivalModal}/>
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
                    </div>
                </DndProvider>
            </div>
        </>
    )
}