/* eslint-disable react/prop-types */
import { Card, Button, Row, Col, Container, Modal } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';

import MessageContext from '../messageCtx.jsx';
import API from '../API.js';
import { LoadingLayout } from './PageLayout.jsx';

function Ticketing(props) {
  const { handleErrors } = useContext(MessageContext);
  const [services, setServices] = useState([]); // List of services with their information
  const [loading, setLoading] = useState(true);

  const [ticketVisible, setTicketVisible] = useState(null);
  const [infoVisible, setInfoVisible] = useState(null);

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
      .then((ticketId) => {
        console.log(ticketId);
        //maybe visualize the number of the ticket on the screen
        setTicketVisible(ticketId);
      })
  };

  const getInfo = (service) =>{
    setInfoVisible(service);
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
                  <Card.Body>
                    <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                      {service.type}
                    </Card.Title>
                    <Card.Text style={{ fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                      {service.description}
                    </Card.Text>
                    <div style={{ marginTop: '10px' }}>
                      <Button variant="primary" style={{ marginRight: '10px' }} onClick={() => handleGetTicket(service)}>Get Ticket</Button>
                      <Button variant="secondary" style={{ marginRight: '10px' }} onClick={() => getInfo(service)}>More Info</Button>
                      {/* Add more buttons if necessary
                      <Button variant="secondary" onClick={() => handleGetInfo(service)}>Get Info</Button>
                       */}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
         {infoVisible && (
            <InfoDisplay
            info={infoVisible}
              onClose={() => setInfoVisible(null)}
            />
          )} 
          {ticketVisible && (
            <TicketDisplay
              ticketId={ticketVisible}
              onClose={() => setTicketVisible(null)}
            />
          )}
        </Container>
      )}
    </>
  );
}

function TicketDisplay(props) {
  return (
    <Modal
      show={true}
      onHide={props.onClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Ticket Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="ticket-content">
          <h4>Ticket ID</h4>
          <p className="ticket-id">{props.ticketId}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function InfoDisplay(props) {
    return (
      <Modal
        show={true}
        onHide={props.onClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Info about {props.type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ticket-content">
            <h4>This section contains info about the service</h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }


export default Ticketing;