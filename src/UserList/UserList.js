import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './userList.css'

const UserList = () => {

  const { setEdit, developers, setDevelopers } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect( () => {
    fetch('http://localhost:8000/api/developers')
      .then(response => response.json())
      .then(data => setDevelopers(data[0]))
  }, [])
  
  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/developers/delete/${id}`, {
      method: 'POST',
      body: id
    })   

    fetch('http://localhost:8000/api/developers')
      .then(response => response.json())
      .then(data => setDevelopers(data[0])) 

  }

  const handleEdit = (dev) => {
    setEdit(dev)
    navigate('/editar')
  }



  return (
    <div className="user-list-container">
      <table cellSpacing="0">
        <thead class="fixed-header">
          <tr className="user-list-row">
            <th>Nombre</th>
            <th>Profesion</th>
            <th>Puesto</th>
            <th>Tecnologia</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {
            developers.map(dev=>(
              <tr key={dev.id} className="user-list-row">
                <td>{dev.nombre}</td>
                <td>{dev.profesion}</td>
                <td>{dev.puesto}</td>
                <td>{dev.tecnologia}</td>
                <td>
                <span
                  onClick={ () => {handleEdit(dev)} }
                  className="material-icons more-options">
                    edit
                </span>
                <span
                  onClick={ ()=>{handleDelete(dev.id)} }
                  className="material-icons more-options">
                    close
                </span>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  ) 
};

export default UserList;
