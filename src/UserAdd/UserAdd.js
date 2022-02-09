import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { UserContext } from '../UserContext';
import './userAdd.css'

const UserAdd = () => {

  const {setDevelopers} = useContext(UserContext);

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
    { value: 'SQL', label: 'SQL'}
  ]

  const initialState = '';

  const [position, setPosition] = useState(initialState);
  const [technology, setTechnology] = useState(initialState);
  const [name, setName] = useState(initialState);
  const [profession, setProfession] = useState(initialState);
  const [textError, setTextError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePosition = (value) => {
    setPosition(value)
  };

  const handleTechnology = (value) => {
    setTechnology(value)
  };

  const handleSubmit = async(e) => {
    e.preventDefault()

    let body = {
      nombre: name,
      profesion: profession,
      puesto: position.value,
      tecnologia: technology.value
    }

    if(name.trim().length <= 3 || profession.trim().length <= 3 ){
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

      setPosition(initialState);
      setProfession(initialState);
      setTechnology(initialState);
      setName(initialState);
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
                <input type="text" name="nombre" onChange={(e) => {setName(e.target.value)}} value={name} required />
                <label htmlFor="puesto">Puesto</label>
                <Select 
                  options={positions} 
                  onChange={handlePosition} 
                  value={position}
                  placeholder='Selecciona una opción'
                  name="puesto"
                />
              </div>
              <div className="add-input-container">
                <label htmlFor="profesion">Profesión</label>
                <input type="text" name="profesion" onChange={(e) => {setProfession(e.target.value)}} value={profession}  required />
                <label htmlFor="tecnologia">Tecnología</label>
                <Select 
                  options={technologies} 
                  onChange={handleTechnology} 
                  value={technology} 
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
