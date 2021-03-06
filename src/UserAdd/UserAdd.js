import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { UserContext } from '../UserContext';
import './userAdd.css'

const UserAdd = () => {

  let specials=/[*|\":<>[\]{}`\\()';@&$]/;

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

    if(desarrollador.nombre.trim().length <= 3 || desarrollador.nombre.trim().length > 30 || desarrollador.profesion.trim().length <= 3 || desarrollador.profesion.trim().length > 30 ){
      setTextError(true)
    } if (specials.test(desarrollador.nombre.trim()) || specials.test(desarrollador.profesion.trim())) {
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
            <input type="text" name="nombre" minLength='4' maxLength='25' onChange={(e) => {setDesarrollador({...desarrollador, nombre: e.target.value})}} value={desarrollador.nombre} required />
            <label htmlFor="puesto">Puesto</label>
            <Select 
              options={positions} 
              onChange={handlePosition} 
              value={{value: desarrollador.puesto, label: desarrollador.puesto}}
              placeholder='Selecciona una opci??n'
              name="puesto"
            />
          </div>
          <div className="add-input-container">
            <label htmlFor="profesion">Profesi??n</label>
            <input type="text" name="profesion" minLength='4' maxLength='25' onChange={(e) => {setDesarrollador({...desarrollador, profesion: e.target.value})}} value={desarrollador.profesion}  required />
            <label htmlFor="tecnologia">Tecnolog??a</label>
            <Select 
              options={technologies} 
              onChange={handleTechnology} 
              value={{value: desarrollador.tecnologia, label: desarrollador.tecnologia}} 
              placeholder='Selecciona una opci??n'
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
      {success ? <p className="success-text">- Developer creado con ??xito!</p> : null}
      {textError ? <p className="error-text">- Los campos Nombre y Profesi??n deben contener m??s de 3 y menos de 25 caracteres y no poseer signos especiales.</p> : null}
      </div>
    </div>
  )
};

export default UserAdd;
