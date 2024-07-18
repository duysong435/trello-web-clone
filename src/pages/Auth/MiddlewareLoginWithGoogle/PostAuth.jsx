import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signInWithGoogle } from '~/redux/authSlice'
const PostAuth = () => {
  const [isNewUser, setIsNewUser] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/auth/checkNewUser`,
          {
            withCredentials: true,
          },
        )
        // console.log(response);

        setIsNewUser(response.data)
      } catch (error) {
        console.error('Error checking user status', error)
      }
    }
    checkUserStatus()
  }, [])

  useEffect(() => {
    // console.log(isNewUser);
    if (isNewUser === true) {
      navigate('/auth') // Chuyển hướng người dùng mới
    } else if (isNewUser === false) {
      dispatch(signInWithGoogle())

      // navigate('/'); // Chuyển hướng người dùng đã tồn tại
    }
  }, [isNewUser, navigate])

  return null
}

export default PostAuth
