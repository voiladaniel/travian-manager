import React from 'react';
import { PlanCalculateAttacks } from './PlanCalculateAttacks.js'

export const PlanDefenderDiv = ({ item, isLoadingCustom, deleteDefender, editAttack }) => {
    return (
        <div className="row defenders-div-table">
            {item.planDefender.length ?
                !isLoadingCustom ?
                    <table className="defenders-table">
                        <thead>
                            <tr>
                                <th>

                                </th>
                                <th>
                                    Ora Plecare
                                </th>
                                <th>
                                    Ora Sosire
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                <PlanCalculateAttacks defenders={item} deleteDefender={deleteDefender} editAttack={editAttack}/>
                            }
                        </tbody>
                    </table>
                    : <h3>Loading data... </h3>
                : <span>No data!</span>}
        </div>
    )
}