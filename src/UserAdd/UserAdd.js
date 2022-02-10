import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { UserContext } from '../UserContext';
import './userAdd.css'

const UserAdd = () => {

  const {setDevelopers} = useContext(UserContext);

  const [desarrollador, setDesarrollador] = useState({
    nombre: '',
    puesto: '',
    profesion: '',
    tecnologia: ''
  });

  const [textError, setTextError] = useState(false);
  const [success, setSuccess] = useState(false);

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
    { value: 'Vue', label: 'Vue' },
    { value: 'SQL', label: 'SQL'},
    { value: 'Laravel', label: 'Laravel' },
    { value: 'NodeJs', label: 'NodeJs' }
  ]

  const handlePosition = (value) => {
    setDesarrollador({...desarrollador, puesto: value.value})
  };

  const handleTechnology = (value) => {
    setDesarrollador({...desarrollador, tecnologia: value.value})
  };

  const handleSubmit = async(e) => {
    e.preventDefault()

    setSuccess(false)
    setTextError(false)

    let body = desarrollador;

    if(desarrollador.nombre.trim().length <= 3 || desarrollador.profesion.trim().length <= 3 ){
      setTextError(true)
    } else {
      setTextError(false)
      fetch('http://localhost:8000/api/developers/add', {
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
          response.text().then(res => console.log(res))
        } else {
          setSuccess(false)          
          response.text().then(res => console.log(res))
        }
      })

      fetch('http://localhost:8000/api/developers')
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
    <div className="add-dashboard-container">
      <div className="add-dashboard">
        <div>
          <p>Agregar nuevo desarrollador</p>
        </div>
      <form id="add-form" onSubmit={ handleSubmit }>
        <div>
          <div className="add-input-container">
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
          <div className="add-input-container">
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
        <div className="add-dashboard-button-container">
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
      {success ? <p className="success-text">Developer creado con éxito!</p> : null}
      {textError ? <p className="error-text">- Los campos Nombre y Profesión deben contener más de 3 caracteres</p> : null}
      </div>
    </div>
  )
};

export default UserAdd;
