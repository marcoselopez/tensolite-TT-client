import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../UserContext";
import UserList from "../UserList/UserList";
import './userApp.css'

const UserApp = () => {

  const {developers} = useContext(UserContext);

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <div>
          <p>Tabla de desarrolladores</p>
          <Link to='/agregar'>
            <button>
              + Agregar
            </button>
          </Link>
        </div>
        <div className="user-list-container">
        <UserList developers={developers} />
        </div>
      </div>
    </div>
  )
};

export default UserApp;
