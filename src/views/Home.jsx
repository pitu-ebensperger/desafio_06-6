import Context from '../contexts/Context'
import { useContext, useEffect } from 'react'

const Home = () => {
  const { refreshDeveloper } = useContext(Context)

  useEffect(() => {
    refreshDeveloper().catch(() => {})
  }, [refreshDeveloper])

  return (
    <div className='py-5'>
      <h1>
        Bienvenido a <span className='fw-bold'>Soft Jobs</span>
      </h1>
      <h4>
        El lugar donde todos los Juniors Developer <br /> podrán obtener
        experiencia
      </h4>
    </div>
  )
}

export default Home
