import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';

import MessageContext from '../messageCtx.jsx';
import API from '../API.js';
import { LoadingLayout } from './PageLayout.jsx';

function EmployeePage(props) {
  const { handleErrors } = useContext(MessageContext);
  const [services, setServices] = useState([]); // List of services with their information
  const [loading, setLoading] = useState(true);
  const [ticketID, setTicketID] = useState(null);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
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

  const handleNextCustomer = (service) => {
    // Handle the action when Button 1 is clicked
    
  };

  const handleFinishService = (ticketID) => {
    API.closeTicket(ticketID).then((res) => {
      console.log(res)
      // TODO: disable finish service button and enable call next customer button
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
            {services.map((service) => (
              <Col key={service.id}>
                <Card style={{ width: '18rem', height: '12rem', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                  <Card.Body>LoadingLayout
                    <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                      {service.type}
                    </Card.Title>
                    <Card.Text style={{ fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                      {service.description}
                    </Card.Text>
                    <div className="d-flex justify-content-around" style={{ marginTop: '10px' }}>
                      <Button variant="primary" style={{ marginRight: '10px'}} onClick={() => handleNextCustomer(service)}>Call Next Customer</Button>
                      <Button variant="secondary" style={{ marginRight: '10px' }} onClick={() => handleFinishService(ticketID)}>Finish Service</Button>
                      {/* Add more buttons if necessary */}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}

export default EmployeePage;
