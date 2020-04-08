import React from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'

export const DefenderModal = ({ show, handleClose, handleChange, submitHandler, name, defenders, defenderData, isLoading, isLoadingDefenders, newDefender }) => {
  return (
    show ?
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="highlight-attacker">Add new defender{!newDefender ? <> for: {name} </> : null} </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isLoadingDefenders ?
            <Form onSubmit={submitHandler}>
              {newDefender ?
                <Form.Row>
                  <Form.Group as={Col} controlId="defenderName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="realName" value={defenderData.realName} required onChange={handleChange} />
                  </Form.Group>
                </Form.Row>
                :
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
              }
              {!newDefender ?
                <Form.Row>
                  <Form.Group as={Col} controlId="attackArrivalTime">
                    <Form.Label>Attack arrival time</Form.Label>
                    <Form.Control type="text" value={defenderData.arrivalTime} onChange={handleChange} name="arrivalTime" required />
                  </Form.Group>
                </Form.Row>
                :
                null
              }
              <Form.Row>
                <Form.Group as={Col} controlId="xCoord">
                  <Form.Label>X</Form.Label>
                  <Form.Control type="text" name="xCoord" value={defenderData.xCoord} onChange={newDefender ? handleChange : () => { }} />
                </Form.Group>
                <Form.Group as={Col} controlId="yCoord">
                  <Form.Label>Y</Form.Label>
                  <Form.Control type="text" name="yCoord" value={defenderData.yCoord} onChange={newDefender ? handleChange : () => { }} />
                </Form.Group>
              </Form.Row>
              <hr />
              <Form.Row className="justifyCenter">
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                &nbsp;
                <Button variant="primary" type="submit" disabled={isLoading}>
                  Add
                </Button>

              </Form.Row>
              {isLoading &&
                <>
                  <span>Loading...</span><img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </>
              }
            </Form>
            :
            <div className="loading-div">
              Loading defenders... <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            </div>
          }
        </Modal.Body>
      </Modal>
      : null
  )
}