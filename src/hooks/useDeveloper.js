import axios from 'axios'
import { useCallback, useState } from 'react'
import { ENDPOINT } from '../config/constans'

const useDeveloper = () => {
  const [user, setUser] = useState(null)

  const clearDeveloper = useCallback(() => setUser(null), [])

  const refreshDeveloper = useCallback(async () => {
    const token = window.sessionStorage.getItem('token')
    if (!token) {
      clearDeveloper()
      return null
    }

    try {
      const { data } = await axios.get(ENDPOINT.users, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(data)
      return data
    } catch (error) {
      window.sessionStorage.removeItem('token')
      clearDeveloper()
      throw error
    }
  }, [clearDeveloper])

  const setDeveloper = useCallback(
    (developer) => setUser(developer),
    [setUser]
  )

  return { getDeveloper: user, setDeveloper, clearDeveloper, refreshDeveloper }
}

export default useDeveloper
