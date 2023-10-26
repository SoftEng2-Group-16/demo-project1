/* eslint-disable react/prop-types */
import { Card, Container } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';

function CounterDisplay(props) {
  const customer = props.nextCustomer;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Container>
        <Card>
          <Card.Title> Serving customer number</Card.Title>
          <Card.Text className="font-weight-bold fs-1">{customer ? customer : '---'}</Card.Text>
        </Card>
      </Container>
    </div>
  );
}

export default CounterDisplay;