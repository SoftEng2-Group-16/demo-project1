import {  useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import MessageContext from '../messageCtx.jsx';

import API from '../API.js';
import { LoadingLayout } from './PageLayout.jsx';

function Home(props){

    const { handleErrors } = useContext(MessageContext);
    const [services, setServices] = useState([]); //lista di arerei con relative informazioni
    const [loading, setLoading] = useState(true);
  
    
    useEffect(() => {
      
        API.getAllServices()
          .then((services) => {
            setServices(services);
            setLoading(false);
          })
          .catch((err) => { console.log(err); handleErrors(err); });
    
    }, []);//reload is done after every rendering of the component
  
  
    return (
      <>
        {loading ? <LoadingLayout />
          :
            <h1>something</h1>
  
         
        }
      </>
  
    );
  }
  

export default Home;