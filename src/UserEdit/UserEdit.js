import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { UserContext } from '../UserContext';
import './userEdit.css';

const UserEdit = () => { 

  const {setDevelopers, edit, URL} = useContext(UserContext);

  const [desarrollador, setDesarrollador] = useState({
    id: null,
    nombre: '',
    puesto: '',
    profesion: '',
    tecnologia: ''
  });

  const [textError, setTextError] = useState(false);
  const [success, setSuccess] = useState(false);

  const fillForm = (edit) => {
    setDesarrollador({
      id: edit.id,
      nombre: edit.nombre,
      puesto: edit.puesto,
      profesion: edit.profesion,
      tecnologia: edit.tecnologia
    })
  }

  useEffect(()=> {
      fillForm(edit)
    }, [edit])

  const positions = [
    { value: 'Frontend', label: 'Frontend' },
    { value: 'Backend', label: 'Backend' },
    { value: 'Fullstack', label: 'Fullstack' }
  ]

  const technologies = [
    { value: 'React', label: 'React' },
    { value: 'PHP', label: 'PHP' },
    { value: 'Angular', label: 'Angular' },
    { value: 'Next', label: 'Next' },
    { value: 'Vue', label: 'Vue' }
  ]

  const handlePosition = (value) => {
    setDesarrollador({...desarrollador, puesto: value.value})
  };

  const handleTechnology = (value) => {
    setDesarrollador({...desarrollador, tecnologia: value.value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let body = desarrollador;

    if(desarrollador.nombre.trim().length <= 3 || desarrollador.profesion.trim().length <= 3){
      setTextError(true)
    } else {
      setTextError(false) 
      fetch(`${URL}/edit`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-type':'application/json;charset=UTF-8'
        }
      })
      .then(response => {
        const status = response.status
        if(status === 200){
          setSuccess(true)
          response.json().then(res => console.log(res))
        } else {
          setSuccess(false)          
          response.text().then(res => console.log(res))
        }
      })

      fetch(URL)
      .then(response => response.json())
      .then(data => setDevelopers(data[0])) 

      setDesarrollador({
        nombre: '',
        puesto: '',
        profesion: '',
        tecnologia: '',
      })
  }
}

  return (
    <div className="edit-dashboard-container">
      <div className="edit-dashboard">
        <div>
          <p>Editar desarrollador</p>
        </div>
      <form id="edit-form" onSubmit={ handleSubmit }>
        <div>
          <div className="edit-input-container">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" name="nombre" onChange={(e) => {setDesarrollador({...desarrollador, nombre: e.target.value})}} value={desarrollador.nombre} required />
            <label htmlFor="puesto">Puesto</label>
            <Select 
              options={positions} 
              onChange={handlePosition} 
              value={{value: desarrollador.puesto, label: desarrollador.puesto}}
              placeholder='Selecciona una opción'
              name="puesto"
            />
          </div>
          <div className="edit-input-container">
            <label htmlFor="profesion">Profesión</label>
            <input type="text" name="profesion" onChange={(e) => {setDesarrollador({...desarrollador, profesion: e.target.value})}} value={desarrollador.profesion}  required />
            <label htmlFor="tecnologia">Tecnología</label>
            <Select 
              options={technologies} 
              onChange={handleTechnology} 
              value={{value: desarrollador.tecnologia, label: desarrollador.tecnologia}} 
              placeholder='Selecciona una opción'
              name="tecnologia"
            />
          </div>
        </div>
        <div className="edit-dashboard-button-container">
          <Link to="/">
            <button>
              Volver
            </button>
          </Link>
            <button>
              Agregar
            </button>
          </div>
        </form>
        {success ? <p className="success-text">Desarrollador editado con éxito!</p> : null}
        {textError ? <p className="error-text">- Los campos Nombre y Profesión deben contener más de 3 caracteres</p> : null}
      </div>
    </div>
  )
};

export default UserEdit;
