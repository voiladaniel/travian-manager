import React from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'

export const DefenderModal = ({ show, handleClose, handleChange, submitHandler, name, defenders, defenderData, isLoading }) => {
  return (
    show ?
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new defender for: {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
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
              <Form.Group as={Col} controlId="attackArrivalTime">
                <Form.Label>Attack arrival time</Form.Label>
                <Form.Control type="text" value={defenderData.arrivalTime} onChange={handleChange} name="arrivalTime" required />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="xCoord">
                <Form.Label>X</Form.Label>
                <Form.Control type="text" value={defenderData.xCoord} />
              </Form.Group>
              <Form.Group as={Col} controlId="yCoord">
                <Form.Label>Y</Form.Label>
                <Form.Control type="text" value={defenderData.yCoord} />
              </Form.Group>
            </Form.Row>
            <hr />
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              Submit
                </Button>
            {isLoading &&
              <>
                <span>Loading...</span><img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              </>
            }
          </Form>
        </Modal.Body>
      </Modal>
      : null
  )
}