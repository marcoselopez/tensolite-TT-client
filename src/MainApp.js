import React, { useEffect, useState } from 'react';
import Router from './Routes/Routes';
import { UserContext } from './UserContext';

const MainApp = () => {

  const [edit, setEdit] = useState({});
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/developers')
      .then(response => response.json())
      .then(data => setDevelopers(data[0]))    
  }, [])

  return (
    <UserContext.Provider value={{edit, setEdit, developers, setDevelopers}}>
      <Router />
    </UserContext.Provider>
  )
};

export default MainApp;
