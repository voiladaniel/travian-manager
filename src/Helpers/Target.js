import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes.js';
import img_defender from '../Images/img_defender.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faWrench, faShieldAlt, faTrashAlt, faUserSecret, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'
import { PlanDefenderDiv } from '../Helpers/PlanDefenderDiv.js'

export const Target = ({item, openTargetModal, deleteDefender, isLoadingCustom}) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.PlanAttacker,
        drop: () => ({ name: item.account.name, targetID: item.targetID }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    return (
        <div ref={drop} className="col-lg-3 col-md-6 text-center attacker-div-template" key={item.accountID}>
            <div className="attacker-name" onClick={() => openTargetModal(item)}>
            <img src={img_defender} className="w3-bar-item w3-circle w3-hide-small customIconAttacker"/> {item.account.name}
            </div>
            <div className="text-center defenders-div">
                <PlanDefenderDiv item={item} deleteDefender={deleteDefender} isLoadingCustom={isLoadingCustom}/>
                <div>

                </div>
            </div>
        </div>
    );
};

