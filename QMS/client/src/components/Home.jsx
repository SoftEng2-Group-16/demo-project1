/* eslint-disable react/prop-types */
import { Card, Button, Row, Col, Container, Modal } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import CardGroup from 'react-bootstrap/CardGroup';

import MessageContext from '../messageCtx.jsx';
import API from '../API.js';
import { LoadingLayout } from './PageLayout.jsx';

function Home(props) {
  const { handleErrors } = useContext(MessageContext);
  const [tickets, setTickets] = useState([]); // List of services with their information
  const [last, setLast] = useState([]); // List of services with their information
  const [loading, setLoading] = useState(true);
  const counters = [0,1,2];


  useEffect(() => {
    // Fetch services data from the API
    API.getServicingTickets()
      .then((tickets) => {
        setTickets(tickets);
        setLoading(false);
      })
      .catch((err) => {
        handleErrors(err);
      });

      API.getServicingTickets()
      .then((tickets) => {
        setTickets(tickets);
        setLoading(false);
      })
      .catch((err) => {
        handleErrors(err);
      });
  }, []); // Reload is done after every rendering of the component

  return (
    <>
      {loading ? (
        <LoadingLayout />
      ) : (
        <Container>
          {false && 
<div style={{display: 'flex', justifyContent: 'center'}}>
          <CardGroup style={{ width: '60rem', height: '14rem', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'center' }}>
      <Card>

        <Card.Body>
          <Card.Title style={{ fontSize: '1.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>Serving now ticket</Card.Title>
          <Card.Text style={{ fontSize: '4rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
            "n"
          </Card.Text>
        </Card.Body>        
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title style={{ fontSize: '1.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
            At Counter</Card.Title>
          <Card.Text style={{ fontSize: '4rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
            "n"
          </Card.Text>
        </Card.Body>

      </Card>
    </CardGroup>
   </div>

          }
          
   <div style={{display: 'flex', justifyContent: 'center'}}>
          <Row>
            {tickets.map((ticket) => (
              <Col key={ticket.id}>
                <Card style={{ width: '17rem', height: '18rem', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                  <Card.Body>
                    <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                      Counter {ticket.counterId}
                    </Card.Title>
                    <Card.Text style={{ fontSize: '1.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                      We are serving number
                    </Card.Text>
                    <Card.Text style={{ fontSize: '3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                      {ticket.id}
                    </Card.Text>
                    <Card.Text style={{ fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                      Type: {ticket.serviceType}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
</div>
          
        </Container>
      )}
    </>
  );
}


export default Home;
