
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Alert, Col } from 'react-bootstrap';

import './App.css'
import NavHeader from './components/NavbarComponents';
import { NotFoundLayout, LoadingLayout } from './components/PageLayout';

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import MessageContext from './messageCtx.jsx';
import API from './API';
import { LoginForm } from './components/AuthComponents';
import Home from './components/Home';
import Employee from './components/Employee';
import Ticketing from './components/Ticketing';
import CounterDisplay from './components/CounterComponent';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState([])
  const [update, setUpdate] = useState(false); // unused, can be used to trigger an update

  //the error message
  const [message, setMessage] = useState('');
  // If an error occurs, the error message will be shown in a toast.
  const handleErrors = (err) => {
    let msg = '';
    if (err.error) msg = err.error;
    else msg = "Unknown Error";
    setMessage(msg);
  }

  useEffect(() => {
    const checkAuth = async () => {
        try {
          const user = await API.getUserInfo(); // we have the user info here 
          if (user) {
            user.role == "employee" ?
            setUser({
              id: user.id,
              username: user.username,
              counterId: user.counterId,
            }) :
            setUser({
              id: user.id,
              username: user.username,
            }); 

            setLoggedIn(true);
          }
        } catch { (err) => { return null; } }

      
    }
    checkAuth();
  }, [loggedIn]);

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({ msg: `Welcome, ${user.username}!`, type: 'success' });
    } catch (err) {
      setMessage({ msg: err, type: 'danger' });
    }
  };

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setMessage('');
  };

  //the react container uses the outlet feature

  return (
    <BrowserRouter>
     <MessageContext.Provider value={{ handleErrors}}>
      <Routes>
        <Route
          element={
            <>
              <NavHeader loggedIn={loggedIn} user={user} handleLogout={handleLogout} />
              <Container fluid className="mt-3 text-center">
                {message && (
                  <Row>
                    <Alert variant={message.type} onClose={() => setMessage('')} dismissible>
                      {message.msg}
                    </Alert>
                  </Row>
                )}
                <Outlet />
              </Container>
              
            </>
          }
        >
          <Route path="/" element={loggedIn? <Employee counterID={user.counterId} employeeId={user.id} /> :<Home />} ></Route>
          <Route path="/ticketing" element={loggedIn? <Col> This page is only for customers</Col> : <Ticketing /> } ></Route>
          <Route path="*" element={<NotFoundLayout  />} />
          <Route path="/login" element={loggedIn ? <Navigate replace to="/" /> : <LoginForm login={handleLogin} />}/>
          <Route path="/counterDisplay/:counterID" element={<CounterDisplay  />} />
        </Route>
      </Routes>
      </MessageContext.Provider>
    </BrowserRouter>
  );
}

export default App;