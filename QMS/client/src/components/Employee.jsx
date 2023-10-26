import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';

import MessageContext from '../messageCtx.jsx';
import API from '../API.js';
import { LoadingLayout } from './PageLayout.jsx';

function EmployeePage(props) {
  const { handleErrors } = useContext(MessageContext);
  //const navigate = useNavigate();
  const [services, setServices] = useState([]); // List of services with their information
  const [loading, setLoading] = useState(true);
  const [ticketID, setTicketID] = useState(null);
  const [counterID, setCounterID] = useState(-1);
  const [buttonsVisible, setButtonsVisible] = useState(true);

  useEffect(() => {
    setCounterID(props.counterID);
    // Fetch services data from the API
    API.getAllServices()
      .then((services) => {
        setServices(services);
        setLoading(false);
        setTicketID(2);
      })
      .catch((err) => {
        handleErrors(err);
      });
  }, []); // Reload is done after every rendering of the component

  const handleNextCustomer = (counterID) => {
    // get next customer
    API.getNextTicketToServe(counterID).then((res) => {
      setButtonsVisible(false);
      // assign counterId to the ticket and employeeID
      API.assignTicket(ticketID, props.employeeId, counterID).then((res) => {
        console.log(res)
      }).catch((err) => {
        handleErrors(err);
      });
    })
    .catch((err) => {
      handleErrors(err);
    });

    // call the counter display with the customer ticket
    // navigate(`/counterDisplay/${counterID}`)
    
  };

  const handleFinishService = (ticketID) => {
    API.closeTicket(ticketID).then((res) => {
      setButtonsVisible(true);
    }).catch((err) => {
      handleErrors(err);
    });
  }

  return (
    <>
      {loading ? (
        <LoadingLayout />
      ) : (
        <Container>
          <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Counter n: {props.counterID}</Card.Title>
                    <Card.Text>
                      <Button variant="primary" disabled={!buttonsVisible} style={{ marginRight: '10px' }} onClick={() => handleNextCustomer(counterID)}>Call Next Customer</Button>
                      <Button variant="danger" disabled={buttonsVisible} style={{ marginRight: '10px' }} onClick={() => handleFinishService(ticketID)}>Finish Service</Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default EmployeePage;
