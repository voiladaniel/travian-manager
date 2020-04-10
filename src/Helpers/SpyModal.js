import React, { useState } from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'

export const SpyModal = ({ show, handleClose, attackerData, handleChange, defenders, defenderData, isLoadingSpies, isLoadingDefenders, handleChangeSpyTroop }) => {

    return (
        show ?
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="highlight-attacker">Spy times for: {attackerData.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!isLoadingDefenders ?
                        <>
                            <Form.Row>
                                <Form.Group as={Col} controlId="defenderName">
                                    <Form.Label>Defender name </Form.Label>
                                    <Form.Control as="select" value={defenderData.name} onChange={handleChange} name="name" required>
                                        <option value="">Select...</option>
                                        {
                                            defenders.length ?
                                                defenders.map(defender => (
                                                    <option value={defender.accountID} key={defender.accountID}>{defender.name}</option>
                                                ))
                                                : null
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="spySpeed">
                                    <Form.Label>Troop speed </Form.Label>
                                    <Form.Control as="select" value={defenderData.spySpeed} name="spySpeed" onChange={handleChangeSpyTroop} >
                                        <option>9</option>
                                        <option>16</option>
                                        <option>19</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="tournamentSquare">
                                    <Form.Label>Torunament square </Form.Label>
                                    <Form.Control as="select" value={defenderData.tournamentSquare} name="tournamentSquare" onChange={handleChangeSpyTroop} >
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>15</option>
                                        <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                        <option>20</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <>*Please change the defender to recalculate</>
                            </Form.Row>
                        </>
                        :
                        <div className="loading-div">
                            Loading defenders... <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        </div>
                    }
                    {!isLoadingSpies ?
                        <Form>
                            {attackerData.defender.length ?
                                <div className="col-lg-12 col-md-12 text-center attacker-div-template">
                                    <div className="row defenders-div-table spies-div-padding">
                                        {attackerData.defender.length ?
                                            <table className="spies-table">
                                                <thead>
                                                    <tr>
                                                        <th>

                                                        </th>
                                                        <th>
                                                            Ora Plecare
                                                </th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        attackerData.defender.map(defender => (
                                                            <tr key={defender.defenderID} className="border-row">
                                                                <td>
                                                                    {defender.account.name}
                                                                </td>
                                                                <td className="Fake">
                                                                    {defender.attackingTime}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                            : <span>No data!</span>}
                                    </div>
                                </div>
                                :
                                null
                            }
                            <hr />
                            <Form.Row className="justifyCenter">
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Form.Row>
                        </Form>
                        :
                        <div className="loading-div">
                            Calculating data... <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        </div>
                    }
                </Modal.Body>
            </Modal>
            : null
    )
}