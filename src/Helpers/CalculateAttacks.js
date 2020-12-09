import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export const CalculateAttacks = ({ defenders, deleteDefender }) => {
    if(defenders.defender.length){
        var test = defenders.defender.sort((a, b) => {
                if(a.attackingTime < b.attackingTime) { return -1; }
                if(a.attackingTime > b.attackingTime) { return 1; }
                return 0;
          });
    }
    return (
        <>
            {defenders.defender.length ?
                defenders.defender
                .sort((a, b) => {
                    if(a.attackingTime < b.attackingTime) { return -1; }
                    if(a.attackingTime > b.attackingTime) { return 1; }
                    return 0;
                })
                .map(defender => (
                    <tr key={defender.defenderID}>
                        <td>
                            {defender.account.name}
                        </td>
                        <td>
                            {defender.arrivingTime}
                        </td>
                        <td className={defender.attackType === 1 ? "Real" : "Fake"}>
                            {defender.attackingTime}
                        </td>
                        <td>
                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteDefender(defender)} />
                        </td>
                    </tr>
                ))
                : null}
        </>
    );
}