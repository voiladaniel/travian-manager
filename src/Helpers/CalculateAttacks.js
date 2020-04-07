import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { config } from '../Helpers/config.js';

export const CalculateAttacks = ({ defenders, deleteDefender }) => {
    return (
        <>
            {defenders.defender.length ?
                defenders.defender.map(defender => (
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