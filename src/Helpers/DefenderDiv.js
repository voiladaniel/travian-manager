import React from 'react';
import { CalculateAttacks } from '../Helpers/CalculateAttacks.js'

export const DefenderDiv = ({ item, isLoadingCustom, deleteDefender }) => {
    return (
        <div className="row defenders-div-table">
            {item.defender.length ?
                !isLoadingCustom ?
                    <table className="defenders-table">
                        <thead>
                            <tr>
                                <th>

                                </th>
                                <th>
                                    Ora sosire
                    </th>
                                <th>
                                    Ora Plecare
                    </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                <CalculateAttacks defenders={item} deleteDefender={deleteDefender} />
                            }
                        </tbody>
                    </table>
                    : <h3>Loading data... </h3>
                : <span>No data!</span>}
        </div>
    )
}