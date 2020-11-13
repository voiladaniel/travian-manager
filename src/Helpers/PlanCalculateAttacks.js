import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export const PlanCalculateAttacks = ({ defenders, deleteDefender }) => {
    return (
        <>
            {defenders.planDefender.length ?
                defenders.planDefender
                .sort((a, b) => a.attackingTime > b.attackingTime)
                .map(planDefender => (
                    <tr key={planDefender.planDefenderID}>
                        <td>
                            {planDefender.planAttacker.account.name} &nbsp;
                        </td>
                        <td className={planDefender.attackType === 1 ? "Real" : "Fake"}>
                            {planDefender.attackingTime}
                        </td>
                        <td>
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