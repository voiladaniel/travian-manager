import React from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'

export const PlanSettingsModal = ({ show, handleClose, handleChange, submitHandler, data, isLoading, isLoadingSettings, handleChangeArrivalModalcheckbox }) => {
  return (
    show ?
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Plan settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isLoadingSettings ?
            <Form onSubmit={submitHandler}>
              <Form.Row>
                <Form.Group as={Col} controlId="timeBuffer">
                  <Form.Label>Time buffer (seconds)</Form.Label>
                  <Form.Control type="text" name="timeBuffer" value={data.timeBuffer} onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="safeTime">
                  <Form.Label>Attacker safe time (seconds)</Form.Label>
                  <Form.Control type="text" name="safeTime" value={data.safeTime} onChange={handleChange} />
                </Form.Group>
              </Form.Row> 
              <Form.Row>
                <Form.Group controlId="includeTTA">
                    <Form.Check type="checkbox" name="includeTTA" label="Include TTA?" checked={data.includeTTA} onChange={handleChangeArrivalModalcheckbox}/>
                </Form.Group>
                &nbsp;
                <Form.Group controlId="includeTTL">
                    <Form.Check type="checkbox" name="includeTTL" label="Include TTL?" checked={data.includeTTL} onChange={handleChangeArrivalModalcheckbox}/>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="fakeMessage">
                  <Form.Label>Fake attack message:</Form.Label>
                  <Form.Control type="text" name="fakeMessage" value={data.fakeMessage} onChange={handleChange}/>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="realMessage">
                  <Form.Label>Real attack message:</Form.Label>
                  <Form.Control type="text" name="realMessage" value={data.realMessage} onChange={handleChange}/>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="ttaMessage">
                  <Form.Label>TTA message:</Form.Label>
                  <Form.Control type="text" name="ttaMessage" value={data.ttaMessage} onChange={handleChange}/>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="ttlMessage">
                  <Form.Label>TTL message:</Form.Label>
                  <Form.Control type="text" name="ttlMessage" value={data.ttlMessage} onChange={handleChange} />
                </Form.Group>
              </Form.Row>


              <Form.Row>
                <Form.Group as={Col} controlId="message">
                  <Form.Label>Custom message</Form.Label>
                  <Form.Control as="textarea" rows={5} name="message" value={data.message} onChange={handleChange} />
                </Form.Group>
              </Form.Row>
              <hr />
              <Form.Row className="justifyCenter">
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                &nbsp;
                <Button variant="primary" type="submit" disabled={isLoading}>
                  Update
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
              Loading settings... <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            </div>
          }

        </Modal.Body>
      </Modal>
      : null
  )
}