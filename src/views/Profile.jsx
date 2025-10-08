import Context from '../contexts/Context'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const { getDeveloper, refreshDeveloper, clearDeveloper } = useContext(Context)

  useEffect(() => {
    const token = window.sessionStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    refreshDeveloper().catch(() => {
      clearDeveloper()
      navigate('/')
    })
  }, [refreshDeveloper, navigate, clearDeveloper])

  if (!getDeveloper) {
    return (
      <div className='py-5'>
        <h1>Cargando perfil...</h1>
      </div>
    )
  }

  return (
    <div className='py-5'>
      <h1>
        Bienvenido <span className='fw-bold'>{getDeveloper?.email}</span>
      </h1>
      <h3>
        {getDeveloper?.rol && getDeveloper?.lenguage
          ? `${getDeveloper.rol} en ${getDeveloper.lenguage}`
          : 'Tu perfil aún no registra rol ni lenguage.'}
      </h3>
    </div>
  )
}

export default Profile
