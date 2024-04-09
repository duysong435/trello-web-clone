
import { useSelector } from 'react-redux'

export const useAuth = () => {
  const auth = useSelector(state => state.auth.data)
  if (!!auth) {
    return true
  } else {
    return false
  }
}

