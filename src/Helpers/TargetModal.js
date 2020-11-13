import React from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export const TargetModal = ({ 
  show, handleClose, handleChange, submitHandler, targetData, isLoading, newTarget, deleteTarget }) => {
  return (
    show ?
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {!newTarget ? 
              <span className="highlight-attacker">Edit target: {targetData.name}</span> 
              : <span className="highlight-attacker">Add new target</span>
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={submitHandler}>
                <Form.Row>
                  <Form.Group as={Col} controlId="name">
                    <Form.Label>Target name</Form.Label>
                    <Form.Control type="text" name="name" value={targetData.name} required onChange={handleChange} />
                  </Form.Group>
                </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="xCoord">
                  <Form.Label>X</Form.Label>
                  <Form.Control type="text" name="xCoord" value={targetData.xCoord} onChange={handleChange} required/>
                </Form.Group>
                <Form.Group as={Col} controlId="yCoord">
                  <Form.Label>Y</Form.Label>
                  <Form.Control type="text" name="yCoord" value={targetData.yCoord} onChange={handleChange} required/>
                </Form.Group>
              </Form.Row>
              {!newTarget ?
                <>
                  <Form.Row className="justifyCenter">
                    <FontAwesomeIcon icon={faTrashAlt} className="trash" onClick={() => deleteTarget(targetData)} />
                  </Form.Row>
                  <Form.Row className="justifyCenter">
                    <span className="customCenterTrashAndcomment">The delete function will delete all the data for this target!</span>
                  </Form.Row>
                </>
                :
                null
              }
              <hr />
              <Form.Row className="justifyCenter">
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                &nbsp;
                <Button variant="primary" type="submit" disabled={isLoading}>
                  {newTarget ? <>Add</> : <>Update</>}
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