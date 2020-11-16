import React from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'

export const ArrivalTimeModal = ({ show, handleClose, handleChange, handleChangeArrivalModalcheckbox, submitHandler, data, isLoading, editData }) => {
  return (
    show ?
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
          {
            editData ? <>Edit Attack</>
            : <>Attack details</>
          }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={submitHandler}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label className="highlight-attacker">Attacker name: {data.attckerName}</Form.Label>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label className="highlight-attacker">Target name: {data.targetName}</Form.Label>
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="attackType" hidden>
                  <Form.Check type="checkbox" name="attackType" label="Real?" checked={data.attackType} onChange={handleChangeArrivalModalcheckbox}/>
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col} controlId="arrivalTime">
                  <Form.Label>Planned time to arrive:</Form.Label>
                  <Form.Control type="text" name="arrivalTime" value={data.arrivalTime} onChange={handleChange} required/>
                </Form.Group>
              </Form.Row>
              <hr />
              <Form.Row className="justifyCenter">
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                &nbsp;
                <Button variant="primary" type="submit" disabled={isLoading}>
                {
                  editData ? <>Update</>
                  : <>Add</>
                }
                </Button>
              </Form.Row>
              {isLoading &&
                  <>
                    <span>Loading...</span><img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  </>
                }
            </Form>
        </Modal.Body>
      </Modal>
      : null
  )
}