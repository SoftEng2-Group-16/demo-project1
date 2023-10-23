import { React, useContext } from 'react';
import { Button, Spinner, Container, Toast, Row } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import MessageContext from '../messageCtx';



function NotFoundLayout() {
  return (
    <>
      <h2>This is not the route you are looking for!</h2>
      <Link to="/">
        <Button variant="primary">Go Home!</Button>
      </Link>
    </>
  );
}

/**
 * This layout shuld be rendered while we are waiting a response from the server.
 */
function LoadingLayout(props) {
  return (

    <Container fluid>
      <h3>Loading, please wait...</h3>
      <Spinner className='m-2' animation="border" role="status" />
    </Container>
  )
}

export { NotFoundLayout, LoadingLayout }; 