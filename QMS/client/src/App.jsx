import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Alert } from 'react-bootstrap';
import './App.css'
import NavHeader from './components/NavbarComponents';
import NotFound from './components/NotFoundComponent';

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import API from './API';
import { LoginForm } from './components/AuthComponents';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState([])
  const [update, setUpdate] = useState(false); // unused, can be used to trigger an update


  useEffect(() => {
    const checkAuth = async () => {
      if (loggedIn) {
        try {
          const user = await API.getUserInfo(); // we have the user info here 
          if (user) {
            setUser({
              id: user.id,
              username: user.username,
            })

            setLoggedIn(true);
          };
        } catch { (err) => { return null; } }

      }
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
          <Route path="/" element={<Navigate to="/" />} ></Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={loggedIn ? <Navigate replace to="/" /> : <LoginForm login={handleLogin} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;