/* eslint-disable react/prop-types */
import { Card, Container } from 'react-bootstrap';
import API from '../API.js';
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';

function CounterDisplay() {
  ///const customer = props.nextCustomer;
  const { counterID } = useParams();
  const [ticket, setTicket] = useState([]);
  //let ticket;
  
  useEffect(() => {
    API.getNextTicketToServe(counterID).then((res) => {
      console.log(res.id)
      setTicket(res.id);
    });
  }, []);
  

  console.log("ticket: " + ticket);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Container>
        <Card>
          <Card.Title> Serving customer number</Card.Title>
          <Card.Text className="font-weight-bold fs-1">{ticket !== undefined ? ticket : '---'}</Card.Text>
        </Card>
      </Container>
    </div>
  );
}

export default CounterDisplay;