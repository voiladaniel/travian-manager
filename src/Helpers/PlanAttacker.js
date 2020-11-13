import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes.js';
import img_attacker from '../Images/img_attacker.png'

export const PlanAttacker = ({ name, attacker, openPlanAttackerModal, addNewAttack }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { name, type: ItemTypes.PlanAttacker },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                addNewAttack(attacker, dropResult.targetID, dropResult.name);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0.4 : 1;
    return (<li ref={drag} style={{ opacity }} className="w3-bar use-pointer padding0" onClick={() => openPlanAttackerModal(attacker)}>
                <img src={img_attacker} className="w3-bar-item w3-hide-small customIconPlanAttacker"/>
                <div className="w3-bar-item">
                <span className="w3-large defenderName">{name}</span>
                </div>
		    </li>);
};

                                