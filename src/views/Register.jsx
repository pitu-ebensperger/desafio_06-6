import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constans'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const initialForm = { email: 'docente@desafiolatam.com', password: '123456' }

const Register = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(initialForm)

  const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value })

  const handleForm = async (event) => {
    event.preventDefault()

    if (!user.email.trim() || !user.password.trim()) {
      return window.alert('Email y password son obligatorios.')
    }

    if (!emailRegex.test(user.email)) {
      return window.alert('El formato del email no es correcto!')
    }

    try {
      await axios.post(ENDPOINT.register, {
        email: user.email,
        password: user.password
      })
      window.alert('Usuario registrado con éxito 😀.')
      navigate('/login')
    } catch (error) {
      const message = error.response?.data?.message ?? 'No se pudo registrar al usuario'
      console.error(error)
      window.alert(`${message} 🙁.`)
    }
  }

  useEffect(() => {
    if (window.sessionStorage.getItem('token')) {
      navigate('/perfil')
    }
  }, [])

  return (
    <form onSubmit={handleForm} className='col-10 col-sm-6 col-md-3 m-auto mt-5'>
      <h1>Registrar nuevo usuario</h1>
      <hr />
      <div className='form-group mt-1 '>
        <label>Email address</label>
        <input
          value={user.email}
          onChange={handleUser}
          type='email'
          name='email'
          className='form-control'
          placeholder='Enter email'
        />
      </div>
      <div className='form-group mt-1 '>
        <label>Password</label>
        <input
          value={user.password}
          onChange={handleUser}
          type='password'
          name='password'
          className='form-control'
          placeholder='Password'
        />
      </div>
      <button type='submit' className='btn btn-light mt-3'>Registrarme</button>
    </form>
  )
}

export default Register
