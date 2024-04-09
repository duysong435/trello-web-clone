import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '~/customHooks/useAuth'


function PrivateRoutes() {
  const token = useAuth()
  return token ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes