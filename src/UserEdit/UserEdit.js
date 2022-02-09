import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { UserContext } from '../UserContext';
import './userEdit.css';

const UserEdit = () => { 

  const {setDevelopers, edit} = useContext(UserContext);

  const fillForm = (edit) => {
    setPosition(edit.puesto)
    setTechnology(edit.tecnologia)
    setName(edit.nombre)
    setProfession(edit.profesion)
  }

  useEffect(()=> {
      fillForm(edit)
    }, [])

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

  const [position, setPosition] = useState('')
  const [technology, setTechnology] = useState('')
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [textError, setTextError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePosition = (value) => {
    setPosition(value.value)
  };

  const handleTechnology = (value) => {
    setTechnology(value.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let body = {
      id: edit.id,
      nombre: name,
      profesion: profession,
      puesto: position,
      tecnologia: technology
    }

    if(name.trim().length <= 3 || profession.trim().length <= 3 ){
      setTextError(true)
    } else {
      setTextError(false) 
      fetch('http://localhost:8000/api/developers/edit', {
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

      fetch('http://localhost:8000/api/developers')
      .then(response => response.json())
      .then(data => setDevelopers(data[0])) 

    setName('')
    setPosition('')
    setTechnology('')
    setProfession('')
  }
}

  console.log(position)

  return (
    <div className="edit-dashboard-container">
        <div className="edit-dashboard">
          <div>
            <p>Editar desarrollador</p>
          </div>
          <form onSubmit={ handleSubmit }>
            <div>
              <div className="edit-input-container">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" name="nombre" value={name} onChange={(e)=>{setName(e.target.value)}} required />
                <label htmlFor="puesto">Puesto</label>
                <Select 
                  options={positions} 
                  onChange={handlePosition} 
                  value={{value: position, label: position}}
                  placeholder='Selecciona una opción'
                  name="puesto"
                />
              </div>
              <div className="edit-input-container">
                <label htmlFor="profesion">Profesión</label>
                <input type="text" name="profesion" value={profession} onChange={(e)=>{setProfession(e.target.value)}} required />
                <label htmlFor="tecnologia">Tecnología</label>
                <Select 
                  options={technologies} 
                  onChange={handleTechnology} 
                  value={{value: technology, label: technology}} 
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
                Editar
              </button>
            </div>
          </form>
        </div>
      </div>
  )
};

export default UserEdit;
