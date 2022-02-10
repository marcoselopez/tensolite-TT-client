import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './userList.css'

const UserList = () => {

  const { setEdit, developers, setDevelopers, URL } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect( () => {
    fetch(URL)
      .then(response => response.json())
      .then(data => setDevelopers(data[0]))
  }, [URL, setDevelopers])
  
  const handleDelete = (id) => {
    fetch(`${URL}/delete/${id}`, {
      method: 'POST',
      body: id
    })   

    fetch(URL)
      .then(response => response.json())
      .then(data => setDevelopers(data[0])) 
  }

  const handleEdit = (dev) => {
    setEdit(dev)
    navigate('/editar')
  }

  return (    
      <table className="users-table" cellSpacing='0'>
        <thead className="fixed-header">
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
  ) 
};

export default UserList;
