import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';

import MessageContext from '../messageCtx.jsx';
import API from '../API.js';
import { LoadingLayout } from './PageLayout.jsx';

function Home(props) {
  const { handleErrors } = useContext(MessageContext);
  const [services, setServices] = useState([]); // List of services with their information
  const [loading, setLoading] = useState(true);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    // Fetch services data from the API
    API.getAllServices()
      .then((services) => {
        setServices(services);
        setLoading(false);
      })
      .catch((err) => {
        handleErrors(err);
      });
  }, []); // Reload is done after every rendering of the component

  const handleGetTicket = (service) => {
    // Handle the action when Button 1 is clicked
    API.createNewTicket(service.type)
    .then((ticketId)=>{
      console.log(ticketId);
      //maybe visualize the number of the ticket on the screen
    })
  };

  const handleGetInfo = (service) => {
    // Handle the action when Button 2 is clicked
    console.log(`Button 2 clicked for service ${service.type}`);
  };

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
                  <Card.Body>
                    <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                      {service.type}
                    </Card.Title>
                    <Card.Text style={{ fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                      {service.description}
                    </Card.Text>
                    <div style={{ marginTop: '10px' }}>
                      <Button variant="primary" style={{ marginRight: '10px' }} onClick={() => handleGetTicket(service)}>Get Ticket</Button>
                      <Button variant="secondary" onClick={() => handleGetInfo(service)}>Get Info</Button>
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

export default Home;
