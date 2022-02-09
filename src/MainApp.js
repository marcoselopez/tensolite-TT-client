import React, { useEffect, useState } from 'react';
import Router from './Routes/Routes';
import { UserContext } from './UserContext';

const MainApp = () => {

  const [edit, setEdit] = useState({});
  const [developers, setDevelopers] = useState([]);
  const URL = 'http://localhost:8000/api/developers';

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(data => setDevelopers(data[0]))    
  }, [])

  return (
    <UserContext.Provider value={{edit, setEdit, developers, setDevelopers, URL}}>
      <Router />
    </UserContext.Provider>
  )
};

export default MainApp;
