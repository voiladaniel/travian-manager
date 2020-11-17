import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export const PlanCalculateAttacks = ({ defenders, deleteDefender, editAttack }) => {
    return (
        <>
            {defenders.planDefender.length ?
                defenders.planDefender
                .sort((a, b) => a.attackingTime > b.attackingTime)
                .map(planDefender => (
                    <tr key={planDefender.planDefenderID} className="use-pointer">
                        <td onClick={() => editAttack(planDefender)}>
                            {planDefender.planAttacker.account.name} &nbsp;
                        </td>
                        <td className={
                                planDefender.attackerConflict === 0 ?
                                planDefender.attackType === 1 ? "Fake" : "Real" : "Conflict"
                            } 
                            onClick={() => editAttack(planDefender)}
                            >
                            {planDefender.attackingTime}
                        </td>
                        <td onClick={() => editAttack(planDefender)}>
                            {planDefender.arrivingTime}
                        </td>
                        <td>
                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteDefender(planDefender)} />
                        </td>
                    </tr>
                ))
                : null}
        </>
    );
}